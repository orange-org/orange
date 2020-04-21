import { RPC_ERROR } from "_c/constants";
import { callRenderer } from "_m/callRenderer";
import { getRpcConfigurationsFromDisk } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcConfigurationsFromDisk";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";
import { Message } from "_t/IpcMessages";
import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";
import { getRpcCredentialsFromCookieFile } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcCredentialsFromCookieFile";

export const handleRpcRequest = async (
  data: Message<"@orange/renderer", "rpc-request", RpcRequest>,
) => {
  let response!: RpcResponse;

  if (data.message.connectionConfigurations) {
    const { connectionConfigurations } = data.message;

    let username: string;
    let password: string;
    if ("cookieFile" in connectionConfigurations) {
      const f = await getRpcCredentialsFromCookieFile(
        connectionConfigurations.cookieFile,
      );

      username = f.username;
      password = f.password;
    } else {
      username = connectionConfigurations.username;
      password = connectionConfigurations.password;
    }

    response = await mainRpcClient(data.message, {
      username,
      password,
      serverUrl: connectionConfigurations.serverUrl,
    });
  } else {
    try {
      const rpcConfigurations = await getRpcConfigurationsFromDisk();
      response = await mainRpcClient(data.message, rpcConfigurations);
    } catch (error) {
      /**
       * If we get 401 or 403 from Bitcoin Core, it could be because we
       * used the cached credentials from the cookie file. Let's try
       * again without cached credentials
       */
      if (error.code === RPC_ERROR.unauthorized) {
        const rpcConfigurations = await getRpcConfigurationsFromDisk(false);
        response = await mainRpcClient(data.message, rpcConfigurations);
      }
    }
  }

  callRenderer({
    nonce: __NONCE__,
    type: "rpc-response",
    message: response,
  });
};
