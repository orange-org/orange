import { ipcRenderer } from "electron";
import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { store } from "./store";

export function registerIpcListeners() {
  ipcRenderer.on("system-preference", (event, message) => {
    store.dispatch(setSystemPreference(message));
  });

  ipcRenderer.on("bitcoind-line", (event, line) => {
    store.dispatch(receiveBitcoindLine(line));
  });
}
