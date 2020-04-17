import { NODE_ERROR, RPC_ERROR, BITCOIN_CORE_RPC_ERROR } from "_c/constants";
import { setBitcoinCoreConnectionIssue } from "../actions";
import { initialState, State } from "./reducer";

const keyErrorMap = {
  isCookieAvailable: RPC_ERROR.couldNotOpenCookieFile,
  isServerReachable: NODE_ERROR.ECONNREFUSED,
  isAuthenticated: RPC_ERROR.unauthorized,
  isServerWarmingUp: BITCOIN_CORE_RPC_ERROR.warmingUp,
};

export const reduceSetBitcoinCoreConnectionIssue = (
  state: State,
  action: ReturnType<typeof setBitcoinCoreConnectionIssue>,
): State => {
  return {
    ...state,
    bitcoinCoreConnectionIssue: Object.keys(
      state.bitcoinCoreConnectionIssue,
    ).reduce(
      (bitcoinCoreConnectionIssue, key_) => {
        const key = key_ as keyof typeof bitcoinCoreConnectionIssue;

        if (keyErrorMap[key] === action.payload?.code) {
          // eslint-disable-next-line no-param-reassign
          bitcoinCoreConnectionIssue[key] = false;
        }

        return bitcoinCoreConnectionIssue;
      },
      { ...initialState.bitcoinCoreConnectionIssue },
    ),
  };
};
