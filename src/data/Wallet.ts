import * as bip32 from "bip32";
import * as bip39 from "bip39";
import * as bitcoinjs from "bitcoinjs-lib";
import coinSelectAccumulative, { Target } from "coinselect/accumulative";
import { BlockchainService, Tx, Utxo } from "./BlockchainService";

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
  addressesWithTxs: AddressMetadata[];
};

export type UtxoWithMetadata = Utxo & {
  address: string;
  derivationPath: string;
};

export type AddressCollectionStats = Omit<
  WalletStats,
  "nextUnusedChangeAddress" | "changeAddresses"
>;

export type TxWithBalance = Tx & { balance: number };

export type TxsWithBalance = TxWithBalance[];

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
    const addressesWithTxs: AddressMetadata[] = [];
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

      if (chain_stats.tx_count || mempool_stats.tx_count) {
        addressesWithTxs.push(addressMetadata);
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
      addressesWithTxs,
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
    const addressesWithTxs = addressesData.addressesWithTxs.concat(
      changeAddressesData.addressesWithTxs,
    );

    return {
      balance,
      pendingBalance,
      nextUnusedAddress,
      nextUnusedChangeAddress,
      addresses,
      changeAddresses,
      addressesWithUtxo,
      addressesWithTxs,
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

  fetchTxs = async (
    addressesWithTxs: AddressMetadata[],
  ): Promise<{
    confirmed: TxsWithBalance;
    mempool: TxsWithBalance;
  }> => {
    const confirmedTxs: TxsWithBalance = [];
    const mempoolTxs: TxsWithBalance = [];
    const seenTxs: { [txId: string]: true } = {};

    /**
     * For each address with transactions, we want to get all of its
     * transactions and put them in a convenient data structure that
     * can be used by the Wallet app.
     */
    for (const addressWithTxs of addressesWithTxs) {
      const addressTxs = await this.blockchainService.fetchAddressTxs(
        addressWithTxs.address,
      );

      /**
       * Now that we have a list of transactions belonging to the address,
       * we want to iterate over them to perform certain operations, like
       * categorize them based on whether they are confirmed or pending
       * and also add up the balance that credits or debits our addresses
       * in this transaction.
       */
      for (const tx of addressTxs) {
        let balance = 0;

        /**
         * We iterate over the outputs in this transaction looking for where
         * our address is affected. If our address is used as an output
         * in this transaction, we add the value of the output to our transaction
         * balance
         */
        for (const output of tx.vout) {
          if (output.scriptpubkey_address === addressWithTxs.address) {
            balance += output.value;
          }
        }

        /**
         * We iterate over the inputs in this transaction looking for where
         * our address is affected. If our address is used as an input in this
         * transaction, we subtract the value of the input from our transaction
         * balance
         */
        for (const input of tx.vin) {
          if (input.prevout.scriptpubkey_address === addressWithTxs.address) {
            balance -= input.prevout.value;
          }
        }

        /**
         * Now that we have the balance, the other couple things that we need
         * to do is categorize the transaction based on whether it's a
         * mempool or a confirmed transaction. And augment the transaction
         * object with a balance property.
         *
         * There's one thing to watch out for, though. Because we
         * retrieve transactions based on addresses, we might have a situation
         * where two or more of our addresses appear in one transaction, which
         * means we could encounter the same transaction multiple times in this
         * loop. When that happens, we don't want to list the same transaction
         * more than once. But we do want to update the transaction balance.
         * That's why we keep track of seen transactions.
         */

        /**
         * First, let's determine the appropriate bucket for the transaction.
         */
        const txBucket = tx.status.confirmed ? confirmedTxs : mempoolTxs;

        /**
         * If we've seen the transaction before, we'll just mutate its balance
         * property without making any further changes.
         *
         * If we hadn't seen the transaction before, we'll add it to the right
         * bucket with an extra `balance` property then we'll flag it as "seen".
         */
        if (seenTxs[tx.txid]) {
          const seenTx = txBucket.find(
            bucketedTx => bucketedTx.txid === tx.txid,
          )!;
          seenTx.balance += balance;
        } else {
          txBucket.push({ ...tx, balance });
          seenTxs[tx.txid] = true;
        }
      }
    }

    return {
      confirmed: confirmedTxs,
      mempool: mempoolTxs,
    };
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
