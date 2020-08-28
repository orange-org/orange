import { Dispatch } from "redux";
import { Wallet } from "./Wallet";
import { WalletActions } from "./WalletActions";
import { esplora } from "./Esplora";

export const wallet = new Wallet(esplora);

export class WalletThunks {
  static setMasterPublicKey = (masterPublicKey: string) => async (
    dispatch: Dispatch,
  ) => {
    dispatch(WalletActions.setWalletMasterPublicKey(masterPublicKey));
  };

  static loadAddressData = (pubkey: string) => async (dispatch: Dispatch) => {
    const walletStats = await wallet.fetchWalletStats(pubkey);

    dispatch(WalletActions.setWalletStats(walletStats));
  };

  static loadWallet = (masterPublicKey: string) => async (
    dispatch: Dispatch,
  ) => {
    const walletStats = await wallet.fetchWalletStats(masterPublicKey);

    dispatch(WalletActions.setWalletStats(walletStats));

    const txs = await wallet.fetchTxs(walletStats.addressesWithTxs);

    dispatch(WalletActions.setWalletTxs(txs));
  };
}
