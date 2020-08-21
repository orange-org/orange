import { Dispatch } from "redux";
import { Wallet } from "./Wallet";
import { WalletActions } from "./WalletActions";
import { esplora } from "./Esplora";

export class WalletThunks {
  static setId = (mnemonic: string) => (dispatch: Dispatch) => {
    dispatch(WalletActions.setWalletId(Wallet.getId(mnemonic)));
  };

  static setMasterPublicKey = (mnemonic: string) => async (
    dispatch: Dispatch,
  ) => {
    dispatch(
      WalletActions.setWalletMasterPublicKey(
        await Wallet.getMasterPublicKey(mnemonic),
      ),
    );
  };

  static loadWalletInitialState = (pubkey: string) => async (
    dispatch: Dispatch,
  ) => {
    const initialState = await Wallet.fetchInitialState(pubkey, esplora);

    console.log("initialState", initialState);
  };
}
