import { useEffect, useRef } from "react";

type Callback = () => void;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => null;
  }, [delay]);
};
