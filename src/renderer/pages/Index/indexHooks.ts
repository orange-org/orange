import { useState, useEffect } from "react";
import { ERROR_CODES, RPC_SERVER_ERROR_CODES } from "_c/constants";
import { usePolling } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { useDispatch } from "react-redux";

export const useRpcServerStatus = () => {
  const dispatch = useDispatch();
  const [initMessage, setInitMessage] = useState("");
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [serverWasOnceReady, setServerWasOnceReady] = useState(false);

  usePolling(async () => {
    try {
      /**
       * Requesting uptime is a lightweight call to help us probe the current
       * status of the RPC server.
       *
       * On start, we're interested in checking if the server is still warming
       * up. On shutdown, we're interested to see if the server has shutdown.
       */
      await dispatch(thunks.requestUptime(__NONCE__));

      setIsWarmingUp(false);
      setServerWasOnceReady(true);
    } catch (error) {
      if (error.code === RPC_SERVER_ERROR_CODES.warmingUp) {
        setIsWarmingUp(true);
        setInitMessage(error.message);
      } else if (error.code === ERROR_CODES.econnrefused) {
        /**
         * Sometimes we receive `econnrefused` when we're starting. It seems
         * that Electron might sometimes be ready to make calls to `bitcoind`
         * before `bitcoind` has even started warming-up. In that case, we
         * assume that `bitcoind` will start warming up soon and set
         * `isWarmingUp` to `true`.
         */
        if (serverWasOnceReady) {
          setIsShuttingDown(true);
        } else {
          setIsWarmingUp(true);
        }
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
