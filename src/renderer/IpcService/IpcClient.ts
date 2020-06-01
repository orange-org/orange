import {
  MessageToMain,
  MessageToRenderer,
  SendableMessageToMain,
} from "_t/IpcMessages";
import { Utils } from "_r/utils/Utils";

type SendToMainReturnType<TMessageToMain extends MessageToMain> = Extract<
  MessageToRenderer,
  Extract<MessageToRenderer, { type: TMessageToMain["type"] }>
>;

export class IpcClient {
  static send = <TMessageToMain extends MessageToMain>(
    message: TMessageToMain,
  ): Promise<SendToMainReturnType<TMessageToMain>> => {
    const messageToMain = {
      ...message,
      source: "@orange/renderer",
      messageId: Utils.generateUuid(),
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
}
