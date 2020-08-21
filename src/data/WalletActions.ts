import { createAction } from "typesafe-actions";

export class WalletActions {
  static setWalletMasterPublicKey = createAction(
    "SET_WALLET_MASTER_PUBLIC_KEY",
  )<string>();

  static setWalletId = createAction("SET_WALLET_ID")<string>();
}
