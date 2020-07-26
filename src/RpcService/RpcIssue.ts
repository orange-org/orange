import {
  BITCOIN_CORE_RPC_ERROR,
  NODE_ERROR,
  RPC_ERROR,
} from "_r/common/constants";
import { RpcError } from "_r/typings/RpcResponses";
import { Actions } from "_r/redux/Actions";
import { store } from "_r/redux/StoreCreator";

export type TRpcIssue =
  | "cookieUnavailable"
  | "serverUnreachable"
  | "serverWarmingUp"
  | "unauthorized";

export class RpcIssue {
  static isRpcIssue = (rpcError: RpcError) =>
    RpcIssue.determineRpcIssue(rpcError) !== null;

  static determineRpcIssue = (rpcError: RpcError) => {
    const possibleErrors: [TRpcIssue, RpcError["code"]][] = [
      ["cookieUnavailable", RPC_ERROR.couldNotOpenCookieFile],
      ["serverUnreachable", RPC_ERROR.couldNotOpenBitcoinConf],
      ["serverUnreachable", NODE_ERROR.ECONNREFUSED],
      ["serverUnreachable", NODE_ERROR.ENOTFOUND],
      ["serverWarmingUp", BITCOIN_CORE_RPC_ERROR.warmingUp],
      ["unauthorized", RPC_ERROR.unauthorized],
    ];

    return (
      possibleErrors.find(
        ([, errorCode]) => errorCode === rpcError.code,
      )?.[0] || null
    );
  };

  /**
   * This function resolves only when Bitcoin Core gives a non-error response.
   *
   * It also sets Redux store states that prompt the user to fix Bitcoin Core
   * connection issue.
   */
  static checkIfIssueHasBeenFixed = () => {
    store.dispatch(Actions.setHasRpcIssue(true));

    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (!store.getState().hasRpcIssue) {
          clearInterval(intervalId);
          resolve();
        }
      }, 1000);
    });
  };
}
