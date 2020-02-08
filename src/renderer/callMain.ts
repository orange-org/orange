/**
 * This file is used by `rpcClient`, which is mocked during tests. And there
 * is no need to test this function in isolation since it is declarative
 * and strongly typed.
 */
/* istanbul ignore file */
import { MessageToMain } from "_t/IpcMessages";

export const callMain = (payload: Omit<MessageToMain, "source">) => {
  const messageToMain = {
    ...payload,
    source: "@orange/renderer",
  } as MessageToMain;

  window.postMessage(messageToMain, "*");
};
