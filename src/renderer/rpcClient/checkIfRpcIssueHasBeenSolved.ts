import { setHasRpcIssue } from "_r/redux/actions";
import { store } from "_r/redux/reducers/store";

/**
 * This function resolves only when Bitcoin Core gives a non-error response.
 *
 * It also sets Redux store states that prompt the user to fix Bitcoin Core
 * connection issue.
 */
export const checkIfRpcIssueHasBeenSolved = () => {
  store.dispatch(setHasRpcIssue(true));

  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      if (!store.getState().hasRpcIssue) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);
  });
};