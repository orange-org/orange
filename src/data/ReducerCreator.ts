import { createReducer } from "typesafe-actions";
import { WalletActions } from "src/data/WalletActions";
import { StateConfig } from "src/typings/typeHelpers";

export type State = StateConfig<{
  walletId: string;
  walletMasterPublicKey: string;
  walletBalance: number;
  walletPendingBalance: number;
  walletAddresses: string[];
  walletChangeAddresses: string[];
}> &
  Readonly<{
    walletNextFreeAddress: number;
  }>;

class ReducerCreator {
  private static initialState: State = {
    walletId: null,
    walletMasterPublicKey: null,
    walletNextFreeAddress: 0,
    walletAddresses: null,
    walletChangeAddresses: null,
    walletBalance: null,
    walletPendingBalance: null,
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
      )
      .handleAction(WalletActions.setWalletAddresses, (state, action) => ({
        ...state,
        walletAddresses: action.payload,
      }))
      .handleAction(
        WalletActions.setWalletChangeAddresses,
        (state, action) => ({
          ...state,
          walletChangeAddresses: action.payload,
        }),
      )
      .handleAction(WalletActions.setWalletBalance, (state, action) => ({
        ...state,
        walletBalance: action.payload,
      }))
      .handleAction(WalletActions.setWalletPendingBalance, (state, action) => ({
        ...state,
        walletPendingBalance: action.payload,
      }));
}

export const reducer = ReducerCreator.create();
