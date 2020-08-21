import { createAction } from "typesafe-actions";
import { AddressData } from "./BlockchainService";

export class WalletActions {
  static setWalletMasterPublicKey = createAction(
    "SET_WALLET_MASTER_PUBLIC_KEY",
  )<string>();

  static setWalletId = createAction("SET_WALLET_ID")<string>();

  static setWalletAddresses = createAction("SET_WALLET_ADDRESSES")<
    AddressData[]
  >();

  static setWalletChangeAddresses = createAction("SET_WALLET_CHANGE_ADDRESSES")<
    AddressData[]
  >();
}
