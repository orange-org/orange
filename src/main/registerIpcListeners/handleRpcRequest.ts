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
    if (data.payload.connectionConfigurations) {
      const { connectionConfigurations } = data.payload;

      let username: string;
      let password: string;
      if ("cookieFile" in connectionConfigurations) {
        const rpcConfigurations = await getRpcCredentialsFromCookieFile(
          connectionConfigurations.cookieFile,
        );

        username = rpcConfigurations.username;
        password = rpcConfigurations.password;
      } else {
        username = connectionConfigurations.username;
        password = connectionConfigurations.password;
      }

      response = await mainRpcClient(data.payload, {
        username,
        password,
        serverUrl: connectionConfigurations.serverUrl,
      });
    } else {
      const rpcConfigurations = await getRpcConfigurationsFromDisk();
      response = await mainRpcClient(data.payload, rpcConfigurations);
    }
  } catch (error) {
    const errorResponse = {
      result: null,
      error: { message: "", code: 0 },
      method: data.payload.method,
    };

    const errorDefinitions = [
      {
        condition:
          error.code === RPC_ERROR.couldNotOpenBitcoinConf ||
          error.code === RPC_ERROR.couldNotOpenCookieFile,
      },

      {
        message: "Server is unreachable",
        condition:
          error.code === NODE_ERROR.ECONNREFUSED ||
          error.code === NODE_ERROR.ENOTFOUND,
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
    payload: response,
    messageId: data.messageId,
  });
};
