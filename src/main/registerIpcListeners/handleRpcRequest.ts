import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { respondToRenderer } from "_m/respondToRenderer";
import { getRpcConfigurationsFromDisk } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcConfigurationsFromDisk";
import { getRpcCredentialsFromCookie } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcCredentialsFromCookie";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";
import { SendableMessageToMain } from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";
import { getDefaultRpcConfigurations } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getDefaultRpcConfigurations";

export const handleRpcRequest = async (
  data: Extract<SendableMessageToMain, { type: "rpc-request" }>,
) => {
  let response!: RpcResponse;

  try {
    if (data.payload.connectionConfigurations !== undefined) {
      const { connectionConfigurations: rpcConfigurations } = data.payload;

      let username: string;
      let password: string;
      let serverUrl: string;
      if (rpcConfigurations === null) {
        const defaultRpcConfigurations = await getDefaultRpcConfigurations();

        username = defaultRpcConfigurations.username;
        password = defaultRpcConfigurations.password;
        serverUrl = defaultRpcConfigurations.serverUrl;
      } else if ("cookiePath" in rpcConfigurations) {
        const cookieCredentials = await getRpcCredentialsFromCookie(
          rpcConfigurations.cookiePath,
        );

        username = cookieCredentials.username;
        password = cookieCredentials.password;
        serverUrl = rpcConfigurations.serverUrl;
      } else {
        username = rpcConfigurations.username;
        password = rpcConfigurations.password;
        serverUrl = rpcConfigurations.serverUrl;
      }

      response = await mainRpcClient(data.payload, {
        username,
        password,
        serverUrl,
      });
    } else {
      // const rpcConfigurations = await getRpcConfigurationsFromDisk();
      response = await mainRpcClient(data.payload, {
        username: "111",
        password: "111",
        serverUrl: "https://127.0.0.1:18334",
      });
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

    /* istanbul ignore if */
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
