import { Dispatch } from "redux";
import { Wallet } from "./Wallet";
import { WalletActions } from "./WalletActions";
import { esplora } from "./Esplora";

export const wallet = new Wallet(esplora);

export class WalletThunks {
  static setMasterPublicKey = (mnemonic: string) => async (
    dispatch: Dispatch,
  ) => {
    dispatch(
      WalletActions.setWalletMasterPublicKey(
        await wallet.getMasterPublicKey(mnemonic),
      ),
    );
  };

  static loadAddressData = (pubkey: string) => async (dispatch: Dispatch) => {
    const walletStats = await wallet.fetchWalletStats(pubkey);

    dispatch(WalletActions.setWalletStats(walletStats));
  };
}
