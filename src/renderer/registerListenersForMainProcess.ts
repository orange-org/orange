import { MessageFromMain } from "typings/types";
import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { store } from "./store";

function isMessageFromMain(data: any): data is MessageFromMain<any> {
  return data.source === "@orange/main";
}

function isSystemPreference(
  data: any,
): data is MessageFromMain<{ [name: string]: string }> {
  return data.type === "system-preference";
}

function isBitcoindLine(data: any): data is MessageFromMain<string> {
  return data.type === "bitcoind-line";
}

export function registerListenersForMainProcess() {
  window.addEventListener("message", event => {
    const { data } = event;

    if (isMessageFromMain(data)) {
      if (data.nonce !== __NONCE__) {
        debugger;
      }

      if (isSystemPreference(data)) {
        store.dispatch(setSystemPreference(data.message));
      } else if (isBitcoindLine(data)) {
        store.dispatch(receiveBitcoindLine(data.message));
      }
    }
  });
}
