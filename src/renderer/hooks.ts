import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RpcResponsesState } from "_r/redux/reducers/rpcResponses";

/**
 * `usePolling` is a React Hook that uses `setInterval` to execute a
 * callback repeatedly. It was built for making interval RPC server
 * calls to `bitcoind`. It's usage is simple (you can find it in the codebase).
 * But to understand the code below. See this:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
type Callback = () => unknown;
export const usePolling = (callback: Callback, timeout: number) => {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }

    tick();
    const intervalId = setInterval(tick, timeout);

    return () => clearInterval(intervalId);
  }, []);
};

/**
 * Doing
 *
 * ```typescript
 * const warnings = useRpcResponses(r => r.networkinfo?.warnings)
 * ```
 *
 * is more convenient than doing
 *
 * ```typescript
 * const warnings = useSelector(s => s.rpcResponses.networkinfo?.warnings)
 * ```
 *
 * That's what the below code is for.
 *
 * It also makes it possible to do:
 *
 * ```typescript
 * const allRpcResponses = useRpcResponses()
 * ```
 */
export function useRpcResponses<TSelected>(
  selector: (r: RpcResponsesState) => TSelected,
): TSelected;
export function useRpcResponses(): RpcResponsesState;
export function useRpcResponses(selector?: any) {
  return useSelector(s =>
    selector ? selector(s.rpcResponses) : s.rpcResponses,
  );
}
