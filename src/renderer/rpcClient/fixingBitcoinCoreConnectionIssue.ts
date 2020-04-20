import { setHasBitcoinCoreConnectionIssue } from "_r/redux/actions";
import { store } from "_r/redux/reducers/store";

/**
 * This function resolves only when Bitcoin Core gives a non-error response.
 *
 * It also sets Redux store states that prompt the user to fix Bitcoin Core
 * connection issue.
 */
export const fixingBitcoinCoreConnectionIssue = () => {
  store.dispatch(setHasBitcoinCoreConnectionIssue(true));

  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      if (!store.getState().hasBitcoinCoreConnectionIssue) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);

    //   const stopPolling = poll(async () => {
    //     const response = await makeRpcRequest(__NONCE__, { method: "uptime" });
    //     const { newRpcConfigurationsSaved } = store.getState();

    //     if (response.result && newRpcConfigurationsSaved) {
    //       stopPolling();
    //       resolve();
    //       store.dispatch(setBitcoinCoreConnectionIssue(null));
    //       store.dispatch(setNewRpcConfigurationsSaved(null));
    //       return;
    //     }

    //     store.dispatch(setBitcoinCoreConnectionIssue(response.error));
    //   }, 1000);
  });
};
