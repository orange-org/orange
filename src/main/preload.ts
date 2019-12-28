import { ipcRenderer } from "electron";

ipcRenderer.on("message-from-main", (_event, data) => {
  window.postMessage(data, "*");
});

window.addEventListener("message", event => {
  ipcRenderer.send(event.data);
});
