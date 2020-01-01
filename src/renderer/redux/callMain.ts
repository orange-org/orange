// import { MessageFromRenderer } from "typings/types";
import { generateUuid } from "renderer/generateUuid";

export const callMain = (
  callType: string,
  callPayload: { method: string; nonce: __NONCE__ },
) => {
  return new Promise((resolve, reject) => {
    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (response.id === requestId) {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      }

      window.removeEventListener("message", windowMessageEventHandler);
    };
    window.addEventListener("message", windowMessageEventHandler);

    const { nonce, ...message } = callPayload;
    const messageFromRenderer = {
      type: callType,
      source: "@orange/renderer",
      nonce,
      message,
    };

    window.postMessage(messageFromRenderer, "*");
  });
};
