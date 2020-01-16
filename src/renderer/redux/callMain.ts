import { MessageToMain } from "_t/IpcMessages";
import { OmitDistributed } from "_t/typeHelpers";

export const callMain = (payload: OmitDistributed<MessageToMain, "source">) => {
  const messageToMain: MessageToMain = {
    ...payload,
    source: "@orange/renderer",
  };

  window.postMessage(messageToMain, "*");
};
