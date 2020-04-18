/* eslint-disable no-await-in-loop */
import { delay } from "bluebird";

export const poll = (cb: any, timeout: number) => {
  let keepPolling = true;

  async function startPolling() {
    while (keepPolling) {
      await Promise.all([cb(), delay(timeout)]);
    }
  }

  startPolling();

  return function stopPolling() {
    keepPolling = false;
  };
};
