import {
  MessageToMain,
  MessageToRenderer,
  SendableMessageToMain,
} from "_t/IpcMessages";
import { generateUuid } from "_r/utils/smallUtils";

type CallMainReturnType<TMessageToMain extends MessageToMain> = Extract<
  MessageToRenderer,
  Extract<MessageToRenderer, { type: TMessageToMain["type"] }>
>;

export const callMain = <TMessageToMain extends MessageToMain>(
  message: TMessageToMain,
): Promise<CallMainReturnType<TMessageToMain>> => {
  const messageToMain = {
    ...message,
    source: "@orange/renderer",
    messageId: generateUuid(),
  } as SendableMessageToMain;

  return new Promise(resolve => {
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (
        response?.source === "@orange/main" &&
        response?.messageId === messageToMain.messageId
      ) {
        window.removeEventListener("message", windowMessageEventHandler);
        resolve(response);
      }
    };
    window.addEventListener("message", windowMessageEventHandler);
    window.postMessage(messageToMain, "*");
  });
};
