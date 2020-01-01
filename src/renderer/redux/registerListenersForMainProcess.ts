import { MessageToRenderer } from "typings/types";
import {
  setSystemPreference,
  receiveBitcoindLine,
  receiveBitcoindRpcResponse,
} from "renderer/redux/actions";
import { store } from "renderer/redux/store";
import { RpcResponse } from "typings/bitcoindRpcResponses";

function isMessageFromMain(data: any): data is MessageToRenderer<any> {
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

function isBitcoindRpcResponse(
  data: MessageToRenderer<any>,
): data is MessageToRenderer<RpcResponse> {
  return data.type === "rpc-response";
}

// export function registerListenersForMainProcess() {
//   window.addEventListener("message", event => {
//     const { data } = event;

//     if (isMessageFromMain(data)) {
//       if (data.nonce !== __NONCE__) {
//         debugger;
//       }

//       if (isSystemPreference(data)) {
//         store.dispatch(setSystemPreference(data.message));
//       } else if (isBitcoindLine(data)) {
//         store.dispatch(receiveBitcoindLine(data.message));
//       } else if (isBitcoindRpcResponse(data)) {
//         store.dispatch(receiveBitcoindRpcResponse(data.message));
//       }
//     }
//   });
// }
