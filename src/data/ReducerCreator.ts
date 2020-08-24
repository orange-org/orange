import { createReducer } from "typesafe-actions";
import { WalletActions } from "src/data/WalletActions";
import { StateConfig } from "src/typings/typeHelpers";
import { AddressStats } from "./BlockchainService";
import { WalletStats } from "./Wallet";

export type State = StateConfig<{
  walletMasterPublicKey: string;
  walletStats: WalletStats;
}> &
  Readonly<{
    walletNextFreeAddress: number;
  }>;

class ReducerCreator {
  private static initialState: State = {
    walletMasterPublicKey: null,
    walletNextFreeAddress: 0,
    walletStats: null,
  };

  static create = () =>
    createReducer(ReducerCreator.initialState)
      .handleAction(
        WalletActions.setWalletMasterPublicKey,
        (state, action) => ({
          ...state,
          walletMasterPublicKey: action.payload,
        }),
      )
      .handleAction(WalletActions.setWalletStats, (state, action) => ({
        ...state,
        walletStats: action.payload,
      }));
}

export const reducer = ReducerCreator.create();
