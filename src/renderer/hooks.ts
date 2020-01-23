import { useEffect, useRef } from "react";

// `usePolling` is a React Hook that uses `setInterval` to execute a
// callback repeatedly. It was built for making interval RPC server
// calls to `bitcoind`. It's usage is simple (you can find it in the codebase).
// But to understand the code below. See this:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
type Callback = () => unknown;
export function usePolling(callback: Callback, timeout: number) {
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
}
