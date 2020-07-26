/* eslint-disable no-await-in-loop */
import { delay } from "bluebird";

export class Poll {
  private shouldKeepPolling = true;

  constructor(private cb: (...args: any[]) => void, private timeout: number) {}

  stop = () => {
    this.shouldKeepPolling = false;
  };

  start = async () => {
    while (this.shouldKeepPolling) {
      await Promise.all([this.cb(), delay(this.timeout)]);
    }
  };
}
