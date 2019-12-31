import { MessageFromMain, RpcResponse } from "typings/types";
import {
  setSystemPreference,
  receiveBitcoindLine,
  receiveBitcoindRpcResponse,
} from "renderer/actions";
import { store } from "renderer/store";

function isMessageFromMain(data: any): data is MessageFromMain<any> {
  return data.source === "@orange/main";
}

function isSystemPreference(
  data: MessageFromMain<any>,
): data is MessageFromMain<{ [name: string]: string }> {
  return data.type === "system-preference";
}

function isBitcoindLine(
  data: MessageFromMain<any>,
): data is MessageFromMain<string> {
  return data.type === "bitcoind-line";
}

function isBitcoindRpcResponse(
  data: MessageFromMain<any>,
): data is MessageFromMain<RpcResponse> {
  return data.type === "bitcoind-rpc-response";
}

export function registerListenersForMainProcess() {
  window.addEventListener("message", event => {
    const { data } = event;

    if (isMessageFromMain(data)) {
      if (data.nonce !== "__NONCE__") {
        debugger;
      }

      if (isSystemPreference(data)) {
        store.dispatch(setSystemPreference(data.message));
      } else if (isBitcoindLine(data)) {
        store.dispatch(receiveBitcoindLine(data.message));
      } else if (isBitcoindRpcResponse(data)) {
        store.dispatch(receiveBitcoindRpcResponse(data.message));
      }
    }
  });
}
