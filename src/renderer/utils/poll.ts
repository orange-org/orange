/* eslint-disable no-await-in-loop */
import { delay } from "bluebird";

export const poll = (cb: any, timeout: number) => {
  let keepPolling = true;
  let pause_ = false;

  function pause() {
    pause_ = true;
  }

  function resume() {
    pause_ = false;
  }

  function stop() {
    keepPolling = false;
  }

  async function start() {
    while (keepPolling) {
      if (!pause_) {
        await Promise.all([cb(), delay(timeout)]);
      }
    }
  }

  return {
    start,
    stop,
    pause,
    resume,
  };
};
