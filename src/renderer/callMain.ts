import { MessageToMain } from "_t/IpcMessages";

export const callMain = (payload: Omit<MessageToMain, "source">) => {
  const messageToMain = {
    ...payload,
    source: "@orange/renderer",
  } as MessageToMain;

  window.postMessage(messageToMain, "*");
};
