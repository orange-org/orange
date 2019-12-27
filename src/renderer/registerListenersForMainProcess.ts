import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { store } from "./store";

export function registerListenersForMainProcess() {
  window.addEventListener("message", event => {
    const { data } = event;

    if (data.scope === "orange") {
      if (data.nonce !== __NONCE__) {
        debugger;
      }

      if (data.type === "system-preference") {
        store.dispatch(setSystemPreference(data.message));
      } else if (data.type === "bitcoind-line") {
        store.dispatch(receiveBitcoindLine(data.message));
      }
    }
  });
}
