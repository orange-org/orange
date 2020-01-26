import { useState, useEffect } from "react";
import { ERROR_CODES, RPC_SERVER_ERROR_CODES } from "_c/constants";
import { usePolling } from "_r/hooks";
import * as actions from "_r/redux/actions";
import { useDispatch } from "react-redux";

export const useRpcServerStatus = () => {
  const dispatch = useDispatch();
  const [initMessage, setInitMessage] = useState("");
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  usePolling(async () => {
    try {
      /**
       * Requesting uptime is a lightweight call to help us probe the current
       * status of the RPC server.
       *
       * On start, we're interested in checking if the server is still warming
       * up. On shutdown, we're interested to see if the server has shutdown.
       *
       * Occasionally, on start, the server would not be ready and would
       * respond with `econnrefused`. To handle this edge case, we set
       * `isShuttingDown` to `false` when request uptime succeeds or when we
       * receive error code `warmingUp`.
       */
      await dispatch(actions.requestUptime(__NONCE__));

      setIsWarmingUp(false);
      setIsShuttingDown(false);
    } catch (error) {
      if (error.code === RPC_SERVER_ERROR_CODES.warmingUp) {
        setIsShuttingDown(false);
        setIsWarmingUp(true);
        setInitMessage(error.message);
      } else if (error.code === ERROR_CODES.econnrefused) {
        setIsShuttingDown(true);
      } else {
        throw error;
      }
    }
  }, 500);

  return {
    isWarmingUp,
    isShuttingDown,
    initMessage,
  };
};

export const useGlobalErrorHandling = () => {
  useEffect(() => {
    const unhandledRejectionEventHandler = (_event: PromiseRejectionEvent) => {
      // @todo: create a UI for this.
      console.log("Promise error");
      // console.error(
      //   "Unhandled rejection (promise: ",
      //   event.promise,
      //   ", reason: ",
      //   event.reason,
      //   ").",
      // );
    };

    window.addEventListener(
      "unhandledrejection",
      unhandledRejectionEventHandler,
    );

    return () =>
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionEventHandler,
      );
  }, []);
};
