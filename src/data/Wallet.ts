import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bitcoinjs from "bitcoinjs-lib";
import createHash from "create-hash";
import { BlockchainService } from "./BlockchainService";

export type WalletStats = {
  balance: number;
  pendingBalance: number;
  nextUnusedAddress: string;
  nextUnusedChangeAddress: string;
  addresses: string[];
  changeAddresses: string[];
  addressesWithUtxo: string[];
};

export class Wallet {
  constructor(
    private blockchainService: BlockchainService,
    private gapLimit = 20,
  ) {}

  generateMnemonic = () => bip39.generateMnemonic();

  getId = (mnemonic: string) =>
    createHash("sha256")
      .update(mnemonic)
      .digest()
      .toString("hex");

  getMasterPublicKey = async (mnemonic: string) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = bip32.fromSeed(seed);
    const path = "m/84'/0'/0'";
    const child = root.derivePath(path).neutered();
    const xpub = child.toBase58();

    return xpub;
  };

  private fetchAddressCollectionStats = async (node: bip32.BIP32Interface) => {
    let gap = 0;
    let addressIndex = 0;
    let balance = 0;
    let pendingBalance = 0;
    let addresses: string[] = [];
    let addressesWithUtxo: string[] = [];
    let nextUnusedAddress = "";
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

      balance += chain_stats.funded_txo_sum - chain_stats.spent_txo_sum;
      pendingBalance +=
        mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum;
      addresses.push(address!);

      if (balance > 0) {
        addressesWithUtxo.push(address!);
      }

      if (!isUsedAddress && nextUnusedAddress.length === 0) {
        nextUnusedAddress = address!;
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
      nextUnusedAddress,
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
    const nextUnusedAddress = addressesData.nextUnusedAddress;
    const nextUnusedChangeAddress = changeAddressesData.nextUnusedAddress;
    const addresses = addressesData.addresses;
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

  fetchUtxos = async (addressesWithUtxo: string[]) => {
    const totalUtxos = [];

    for (const addressWithUtxo of addressesWithUtxo) {
      totalUtxos.push(
        ...(await this.blockchainService.fetchAddressUtxos(addressWithUtxo)),
      );
    }

    return totalUtxos;
  };
}
