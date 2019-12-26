import { ipcRenderer } from "electron";

ipcRenderer.on("message-from-main", (_event, { type, message }) => {
  window.postMessage({ type, message }, "*");
});
