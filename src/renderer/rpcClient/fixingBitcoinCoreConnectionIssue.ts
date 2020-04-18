import { store } from "_r/redux/reducers/store";
import { setBitcoinCoreConnectionIssue } from "_r/redux/actions";
import { poll } from "_r/utils/poll";
import { makeRpcRequest } from "./makeRpcRequest";

/**
 * This function resolves only when Bitcoin Core gives a non-error response.
 *
 * It also sets Redux store states that prompt the user to fix Bitcoin Core
 * connection issue.
 */
export const fixingBitcoinCoreConnectionIssue = () => {
  return new Promise(resolve => {
    const stopPolling = poll(async () => {
      const response = await makeRpcRequest(__NONCE__, { method: "uptime" });

      if (response.result) {
        stopPolling();
        resolve();
        store.dispatch(setBitcoinCoreConnectionIssue(null));
        return;
      }

      store.dispatch(setBitcoinCoreConnectionIssue(response.error));
    }, 1000);
  });
};
