import { respondToRenderer } from "_m/respondToRenderer";
import { readConfigurations } from "_m/writeConfigurations/readConfigurations";
import {
  GetSavedRpcConfigurationsMtR,
  SendableMessageToMain,
} from "_t/IpcMessages";

export const handleGetSavedRpcConfigurations = async (
  data: Extract<
    SendableMessageToMain,
    { type: "get-saved-rpc-configurations" }
  >,
) => {
  const configurations = await readConfigurations();
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

  respondToRenderer({
    nonce: __NONCE__,
    type: "get-saved-rpc-configurations",
    messageId: data.messageId,
    payload,
  });
};
