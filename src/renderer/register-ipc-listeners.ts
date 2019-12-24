import { ipcRenderer } from "electron";
import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { store } from "./store";

export function registerIpcListeners() {
  ipcRenderer.on("system-preference", (_event, message) => {
    store.dispatch(setSystemPreference(message));
  });

  ipcRenderer.on("bitcoind-line", (_event, line) => {
    store.dispatch(receiveBitcoindLine(line));
  });
}
