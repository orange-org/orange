import { MessageToMain } from "typings/types";

export const callMain = <T>(payload: Omit<MessageToMain<T>, "source">) => {
  const messageToMain: MessageToMain<any> = {
    source: "@orange/renderer",
    ...payload,
  };

  window.postMessage(messageToMain, "*");
};
