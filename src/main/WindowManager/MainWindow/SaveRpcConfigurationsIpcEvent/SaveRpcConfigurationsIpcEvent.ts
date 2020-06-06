/* eslint-disable no-param-reassign */
import { Settings } from "_m/Settings/Settings";
import { SendableMessageToMain } from "_t/IpcMessages";
import { windowManager } from "_m/WindowManager/WindowManager";

export class SaveRpcConfigurationsIpcEvent {
  static handle = async (
    data: Extract<SendableMessageToMain, { type: "save-rpc-configurations" }>,
  ) => {
    const { payload: rpcConfigurations } = data;

    await Settings.write(currentConfigurations => {
      if (!rpcConfigurations) {
        currentConfigurations.rpc = null;
      } else if ("cookiePath" in rpcConfigurations) {
        currentConfigurations.rpc = {
          cookiePath: rpcConfigurations.cookiePath,
          serverUrl: rpcConfigurations.serverUrl,
        };
      } else {
        currentConfigurations.rpc = {
          username: rpcConfigurations.username,
          password: rpcConfigurations.password,
          serverUrl: rpcConfigurations.serverUrl,
        };
      }

      return currentConfigurations;
    });

    windowManager.sendMessageToMainWindow({
      nonce: __NONCE__,
      type: "save-rpc-configurations",
      payload: null,
      messageId: data.messageId,
    });
  };
}
