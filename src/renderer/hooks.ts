import { useEffect } from "react";

export function useShortPolling(callback: () => unknown, interval: number) {
  useEffect(() => {
    callback();

    const intervalId = setInterval(callback, interval);

    return () => clearInterval(intervalId);
  }, []);
}
