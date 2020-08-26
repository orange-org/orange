import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bitcoinjs from "bitcoinjs-lib";
import coinSelectAccumulative, { Target } from "coinselect/accumulative";
import { BlockchainService, Utxos, Utxo } from "./BlockchainService";

export type AddressMetadata = {
  address: string;
  derivationPath: string;
  publicKey: Buffer;
};

export type WalletStats = {
  balance: number;
  pendingBalance: number;
  nextUnusedAddress: AddressMetadata;
  nextUnusedChangeAddress: AddressMetadata;
  addresses: AddressMetadata[];
  changeAddresses: AddressMetadata[];
  addressesWithUtxo: AddressMetadata[];
};

export type UtxoWithMetadata = Utxo & {
  address: string;
  derivationPath: string;
};

export type AddressCollectionStats = Omit<
  WalletStats,
  "nextUnusedChangeAddress" | "changeAddresses"
>;

export class Wallet {
  constructor(
    private blockchainService: BlockchainService,
    private gapLimit = 20,
    private derivationPath = "m/84'/0'/0'",
  ) {}

  generateMnemonic = () => bip39.generateMnemonic();

  private createHdRoot = async (mnemonic: string) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdRoot = bip32.fromSeed(seed);

    return hdRoot;
  };

  getMasterPublicKey = async (mnemonic: string) => {
    const hdRoot = await this.createHdRoot(mnemonic);
    const derivedNode = hdRoot.derivePath(this.derivationPath).neutered();
    const masterPublicKey = derivedNode.toBase58();

    return masterPublicKey;
  };

  private fetchAddressCollectionStats = async (
    node: bip32.BIP32Interface,
  ): Promise<AddressCollectionStats> => {
    let gap = 0;
    let addressIndex = 0;
    let balance = 0;
    let pendingBalance = 0;
    const addresses: AddressMetadata[] = [];
    const addressesWithUtxo: AddressMetadata[] = [];
    let nextUnusedAddress: AddressMetadata | null = null;
    while (gap < this.gapLimit) {
      const childNode = node.derive(addressIndex);
      const { address } = bitcoinjs.payments.p2wpkh({
        pubkey: childNode.publicKey,
      });

      const addressStats = await this.blockchainService.fetchAddressStats(
        address!,
      );

      const { chain_stats, mempool_stats } = addressStats;

      const isUsedAddress =
        chain_stats.funded_txo_count > 0 ||
        chain_stats.spent_txo_count > 0 ||
        mempool_stats.funded_txo_count > 0 ||
        mempool_stats.spent_txo_count > 0;
      const addressBalance =
        chain_stats.funded_txo_sum - chain_stats.spent_txo_sum;

      balance += addressBalance;
      pendingBalance +=
        mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum;

      const addressMetadata = {
        address: address!,
        derivationPath: `${node.index}/${addressIndex}`,
        publicKey: childNode.publicKey,
      };

      addresses.push(addressMetadata);

      if (addressBalance > 0) {
        addressesWithUtxo.push(addressMetadata);
      }

      if (!isUsedAddress && !nextUnusedAddress) {
        nextUnusedAddress = addressMetadata;
      }

      if (!isUsedAddress) {
        gap++;
      } else {
        gap = 0;
      }

      addressIndex++;
    }

    return {
      balance,
      pendingBalance,
      addresses,
      addressesWithUtxo,
      nextUnusedAddress: nextUnusedAddress!,
    };
  };

  fetchWalletStats = async (masterPublicKey: string): Promise<WalletStats> => {
    const hdNode = bip32.fromBase58(masterPublicKey);
    const [addressesData, changeAddressesData] = await Promise.all([
      this.fetchAddressCollectionStats(hdNode.derive(0)),
      this.fetchAddressCollectionStats(hdNode.derive(1)),
    ]);

    const balance = addressesData.balance + changeAddressesData.balance;
    const pendingBalance =
      addressesData.pendingBalance + changeAddressesData.pendingBalance;
    const { nextUnusedAddress } = addressesData;
    const nextUnusedChangeAddress = changeAddressesData.nextUnusedAddress;
    const { addresses } = addressesData;
    const changeAddresses = changeAddressesData.addresses;
    const addressesWithUtxo = addressesData.addressesWithUtxo.concat(
      changeAddressesData.addressesWithUtxo,
    );

    return {
      balance,
      pendingBalance,
      nextUnusedAddress,
      nextUnusedChangeAddress,
      addresses,
      changeAddresses,
      addressesWithUtxo,
    };
  };

  fetchUtxos = async (
    addressesWithUtxo: AddressMetadata[],
  ): Promise<UtxoWithMetadata[]> => {
    const totalUtxos = [];

    for (const addressWithUtxo of addressesWithUtxo) {
      const utxos = await this.blockchainService.fetchAddressUtxos(
        addressWithUtxo.address,
      );

      for (const utxo of utxos) {
        totalUtxos.push({
          ...utxo,
          address: addressWithUtxo.address,
          derivationPath: addressWithUtxo.derivationPath,
        });
      }
    }

    return totalUtxos;
  };

  private findPublicKeyForAddress = (
    address: string,
    addressesMetadata: AddressMetadata[],
  ) =>
    addressesMetadata.find(
      addressMetadata => address === addressMetadata.address,
    )?.publicKey;

  createTransaction = async (
    addressesWithUtxo: AddressMetadata[],
    targetAddress: Target,
    feeRate: number,
    changeAddress: string,
    mnemonic: string,
  ) => {
    const utxos = await this.fetchUtxos(addressesWithUtxo);
    const { inputs, outputs, fee } = coinSelectAccumulative(
      utxos,
      [targetAddress],
      feeRate,
    );
    const hdRoot = await this.createHdRoot(mnemonic);

    if (!inputs || !outputs) {
      throw new Error("Not enough balance. Try sending a smaller amount.");
    }

    const psbt = new bitcoinjs.Psbt();

    for (const input of inputs) {
      const inputPublicKey = this.findPublicKeyForAddress(
        input.address,
        addressesWithUtxo,
      );

      if (!inputPublicKey) {
        throw new Error("Could not find public key for input");
      }

      const p2wpkh = bitcoinjs.payments.p2wpkh({ pubkey: inputPublicKey });

      psbt.addInput({
        hash: input.txid,
        index: input.vout,
        sequence: 2147483648,
        bip32Derivation: [
          {
            masterFingerprint: hdRoot.fingerprint,
            path: `${this.derivationPath}/${input.derivationPath}`,
            pubkey: inputPublicKey,
          },
        ],
        witnessUtxo: {
          script: p2wpkh.output!,
          value: input.value,
        },
      });
    }

    for (const output of outputs) {
      if (!output.address) {
        output.address = changeAddress;
      }

      psbt.addOutput({
        address: output.address,
        value: output.value,
      });
    }

    const transaction = psbt
      .signAllInputsHD(hdRoot)
      .finalizeAllInputs()
      .extractTransaction();

    return { transaction, inputs, outputs, fee };
  };

  static isValidMasterPublicKey = (masterPublicKey: string) => {
    try {
      bip32.fromBase58(masterPublicKey);
    } catch (e) {
      return false;
    }

    return true;
  };
}
