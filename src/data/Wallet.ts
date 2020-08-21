import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bs58 from "bs58check";
import * as bitcoinjs from "bitcoinjs-lib";
import createHash from "create-hash";
import { Constants } from "src/common/constants";
import { BlockchainService, AddressData } from "./BlockchainService";

export class Wallet {
  static generateMnemonic = () => bip39.generateMnemonic();

  static getId = (mnemonic: string) =>
    createHash("sha256")
      .update(mnemonic)
      .digest()
      .toString("hex");

  static getMasterPublicKey = async (mnemonic: string) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = bip32.fromSeed(seed);
    const path = "m/84'/0'/0'";
    const child = root.derivePath(path).neutered();
    const xpub = child.toBase58();

    return xpub;
  };

  private static fetchAllAddressData = async (
    node: bip32.BIP32Interface,
    blockchainService: BlockchainService,
  ) => {
    const allAddressData: AddressData[] = [];

    let gap = 0;
    let addressIndex = 0;
    let balance = 0;
    let pendingBalance = 0;
    while (gap < Constants.gapLimit) {
      const childNode = node.derive(addressIndex);
      const { address } = bitcoinjs.payments.p2wpkh({
        pubkey: childNode.publicKey,
      });

      const addressData = await blockchainService.fetchAddressData(address!);

      if (addressData.chain_stats.tx_count === 0) {
        gap++;
      } else {
        gap = 0;
      }

      const { chain_stats, mempool_stats } = addressData;
      balance += chain_stats.funded_txo_sum - chain_stats.spent_txo_sum;
      pendingBalance +=
        mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum;

      allAddressData.push(addressData);
      addressIndex++;
    }

    return allAddressData;
  };

  static fetchAddressesSummary = async (
    masterPublicKey: string,
    blockchainService: BlockchainService,
  ) => {
    const hdNode = bip32.fromBase58(masterPublicKey);
    const [addresses, changeAddresses] = await Promise.all([
      Wallet.fetchAllAddressData(hdNode.derive(0), blockchainService),
      Wallet.fetchAllAddressData(hdNode.derive(1), blockchainService),
    ]);

    return {
      addresses,
      changeAddresses,
    };
  };
}
