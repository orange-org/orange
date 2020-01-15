import { receiveBitcoindLogLines } from "_r/redux/actions";
import { store } from "_r/redux/store";
import { BitcoindLogLinesMtR, MessageToRenderer } from "_t/IpcMessages";

function isMessageToRenderer(data: any): data is MessageToRenderer {
  return data.source === "@orange/main";
}

function isBitcoindLine(data: MessageToRenderer): data is BitcoindLogLinesMtR {
  return data.type === "bitcoind-log-lines";
}

export function registerBitcoindLogListener() {
  window.addEventListener("message", event => {
    const { data } = event;

    if (isMessageToRenderer(data)) {
      if (data.nonce !== __NONCE__) {
        debugger;
      }

      if (isBitcoindLine(data)) {
        store.dispatch(receiveBitcoindLogLines(data.message));
      }
    }
  });
}
