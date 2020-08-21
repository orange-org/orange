import { createReducer } from "typesafe-actions";
import { WalletActions } from "src/data/WalletActions";
import { StateConfig } from "src/typings/typeHelpers";
import { AddressData } from "./BlockchainService";

export type State = StateConfig<{
  walletId: string;
  walletMasterPublicKey: string;
  walletAddresses: AddressData[];
  walletChangeAddresses: AddressData[];
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
      );
}

export const reducer = ReducerCreator.create();
