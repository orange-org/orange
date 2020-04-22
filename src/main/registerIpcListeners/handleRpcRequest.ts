import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { respondToRenderer } from "_m/callRenderer";
import { getRpcConfigurationsFromDisk } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcConfigurationsFromDisk";
import { getRpcCredentialsFromCookieFile } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcCredentialsFromCookieFile";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";
import { SendableMessageToMain } from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";

export const handleRpcRequest = async (
  data: Extract<SendableMessageToMain, { type: "rpc-request" }>,
) => {
  let response!: RpcResponse;

  try {
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
      let rpcConfigurations = await getRpcConfigurationsFromDisk();
      response = await mainRpcClient(data.message, rpcConfigurations);

      /**
       * If we get 401 or 403 from Bitcoin Core, it could be because we
       * used the cached credentials from the cookie file. Let's try
       * again without cached credentials
       */
      if (response.error?.code === RPC_ERROR.unauthorized) {
        rpcConfigurations = await getRpcConfigurationsFromDisk(false);
        response = await mainRpcClient(data.message, rpcConfigurations);
      }
    }
  } catch (error) {
    const errorResponse = {
      result: null,
      error: { message: "", code: 0 },
      method: data.message.method,
    };

    const errorDefinitions = [
      {
        condition:
          error.code === RPC_ERROR.couldNotOpenBitcoinConf ||
          error.code === RPC_ERROR.couldNotOpenCookieFile,
      },

      {
        message: "Server is unreachable",
        condition: error.code === NODE_ERROR.ECONNREFUSED,
      },

      {
        message: "Server is warming up",
        condition: error.code === BITCOIN_CORE_RPC_ERROR.warmingUp,
      },

      {
        condition: error.code === RPC_ERROR.unauthorized,
      },
    ];

    let couldHandleError = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const errorDefinition of errorDefinitions) {
      if (errorDefinition.condition) {
        errorResponse.error.code = error.code;
        errorResponse.error.message = errorDefinition.message || error.message;
        response = errorResponse as RpcResponse;
        couldHandleError = true;

        break;
      }
    }

    if (!couldHandleError) {
      throw error;
    }
  }

  respondToRenderer({
    nonce: __NONCE__,
    type: "rpc-request",
    message: response,
    messageId: data.messageId,
  });
};
