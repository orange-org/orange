import { createAction } from "typesafe-actions";
import { WalletStats } from "./Wallet";

export class WalletActions {
  static setWalletMasterPublicKey = createAction(
    "SET_WALLET_MASTER_PUBLIC_KEY",
  )<string>();

  static setWalletStats = createAction("SET_WALLET_STATS")<WalletStats>();
}
