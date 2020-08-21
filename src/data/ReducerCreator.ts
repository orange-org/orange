import { createReducer } from "typesafe-actions";
import { WalletActions } from "src/data/WalletActions";
import { StateConfig } from "src/typings/typeHelpers";

export type State = StateConfig<{
  walletId: string;
  walletMasterPublicKey: string;
}> &
  Readonly<{
    walletNextFreeAddress: number;
  }>;

class ReducerCreator {
  private static initialState: State = {
    walletId: null,
    walletMasterPublicKey: null,
    walletNextFreeAddress: 0,
  };

  static create = () =>
    createReducer(ReducerCreator.initialState)
      .handleAction(WalletActions.setWalletId, (state, action) => ({
        ...state,
        walletId: action.payload,
      }))
      .handleAction(
        WalletActions.setWalletMasterPublicKey,
        (state, action) => ({
          ...state,
          walletMasterPublicKey: action.payload,
        }),
      );
}

export const reducer = ReducerCreator.create();
