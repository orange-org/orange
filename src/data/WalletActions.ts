import { createAction } from "typesafe-actions";
import { TxsWithBalance, WalletStats } from "./Wallet";

export class WalletActions {
  static setWalletMasterPublicKey = createAction(
    "SET_WALLET_MASTER_PUBLIC_KEY",
  )<string>();

  static setWalletStats = createAction("SET_WALLET_STATS")<WalletStats>();

  static setWalletTxs = createAction("SET_WALLET_TXS")<{
    confirmed: TxsWithBalance;
    mempool: TxsWithBalance;
  }>();
}
