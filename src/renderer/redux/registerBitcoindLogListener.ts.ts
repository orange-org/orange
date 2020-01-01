import { MessageToRenderer } from "typings/types";
import {
  setSystemPreference,
  receiveBitcoindLine,
} from "renderer/redux/actions";
import { store } from "renderer/redux/store";

function isMessageToRenderer(data: any): data is MessageToRenderer<any> {
  return data.source === "@orange/main";
}

function isSystemPreference(
  data: MessageToRenderer<any>,
): data is MessageToRenderer<{ [name: string]: string }> {
  return data.type === "system-preference";
}

function isBitcoindLine(
  data: MessageToRenderer<any>,
): data is MessageToRenderer<string> {
  return data.type === "bitcoind-line";
}

export function registerBitcoindLogListener() {
  window.addEventListener("message", event => {
    const { data } = event;

    if (isMessageToRenderer(data)) {
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
