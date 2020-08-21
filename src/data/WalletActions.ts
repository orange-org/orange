import { createAction } from "typesafe-actions";

export class WalletActions {
  static setWalletMasterPublicKey = createAction(
    "SET_WALLET_MASTER_PUBLIC_KEY",
  )<string>();

  static setWalletId = createAction("SET_WALLET_ID")<string>();

  static setWalletAddresses = createAction("SET_WALLET_ADDRESSES")<string[]>();

  static setWalletChangeAddresses = createAction("SET_WALLET_CHANGE_ADDRESSES")<
    string[]
  >();

  static setWalletBalance = createAction("SET_WALLET_BALANCE")<number>();

  static setWalletPendingBalance = createAction("SET_WALLET_PENDING_BALANCE")<
    number
  >();
}
