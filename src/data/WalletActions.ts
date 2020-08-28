import { createAction } from "typesafe-actions";
import { WalletStats } from "./Wallet";
import { Txs } from "./BlockchainService";

export class WalletActions {
  static setWalletMasterPublicKey = createAction(
    "SET_WALLET_MASTER_PUBLIC_KEY",
  )<string>();

  static setWalletStats = createAction("SET_WALLET_STATS")<WalletStats>();

  static setWalletTxs = createAction("SET_WALLET_TXS")<{
    confirmed: Txs;
    mempool: Txs;
  }>();
}
