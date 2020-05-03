/* eslint-disable no-await-in-loop */
import { delay } from "bluebird";

export const poll = (cb: any, timeout: number) => {
  let keepPolling = true;
  let pause_ = false;

  /* istanbul ignore next: no current use-case */
  function pause() {
    pause_ = true;
  }

  /* istanbul ignore next: no current use-case */
  function resume() {
    pause_ = false;
  }

  function stop() {
    keepPolling = false;
  }

  async function start() {
    while (keepPolling) {
      /* istanbul ignore else: no current use-case */
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
