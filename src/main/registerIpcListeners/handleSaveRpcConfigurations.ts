/* eslint-disable no-param-reassign */
import { writeConfigurations } from "_m/writeConfigurations/writeConfigurations";
import { SendableMessageToMain } from "_t/IpcMessages";
import { respondToRenderer } from "_m/respondToRenderer";

export const handleSaveRpcConfigurations = async (
  data: Extract<SendableMessageToMain, { type: "save-rpc-configurations" }>,
) => {
  const { payload: rpcConfigurations } = data;

  await writeConfigurations(currentConfigurations => {
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

  respondToRenderer({
    nonce: __NONCE__,
    type: "save-rpc-configurations",
    payload: null,
    messageId: data.messageId,
  });
};
