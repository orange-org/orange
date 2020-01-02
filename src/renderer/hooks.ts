import { useEffect } from "react";

export function usePolling(callback: () => unknown, interval: number) {
  useEffect(() => {
    callback();

    const intervalId = setInterval(callback, interval);

    return () => clearInterval(intervalId);
  }, []);
}
