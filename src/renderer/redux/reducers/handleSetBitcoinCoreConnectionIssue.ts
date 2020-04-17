import { ERROR_CODES } from "_c/constants";
import { setBitcoinCoreConnectionIssue } from "../actions";
import { State, initialState } from "./reducer";

const keyErrorMap = {
  isCookieAvailable: ERROR_CODES.couldNotOpenCookieFile,
  isServerReachable: ERROR_CODES.rpcRequestError,
  isAuthenticated: ERROR_CODES.rpcUnauthorized,
};

export const handleSetBitcoinCoreConnectionIssue = (
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
