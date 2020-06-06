import { windowManager } from "_m/WindowManager/WindowManager";
import { Settings } from "_m/Settings/Settings";
import {
  GetSavedRpcConfigurationsMtR,
  SendableMessageToMain,
} from "_t/IpcMessages";

export class GetSavedRpcConfigurationsIpcEvent {
  static handle = async (
    data: Extract<
      SendableMessageToMain,
      { type: "get-saved-rpc-configurations" }
    >,
  ) => {
    const configurations = await Settings.read();
    let payload: GetSavedRpcConfigurationsMtR["payload"];

    if (!configurations.rpc) {
      payload = null;
    } else if ("cookiePath" in configurations.rpc) {
      payload = {
        cookiePath: configurations.rpc.cookiePath,
        serverUrl: configurations.rpc.serverUrl,
      };
    } else {
      payload = {
        username: configurations.rpc.username,
        password: configurations.rpc.password,
        serverUrl: configurations.rpc.serverUrl,
      };
    }

    windowManager.sendMessageToMainWindow({
      nonce: __NONCE__,
      type: "get-saved-rpc-configurations",
      messageId: data.messageId,
      payload,
    });
  };
}
