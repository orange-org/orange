import { Dispatch } from "redux";
import { Wallet } from "./Wallet";
import { WalletActions } from "./WalletActions";

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
}
