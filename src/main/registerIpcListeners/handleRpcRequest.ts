import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { respondToRenderer } from "_m/respondToRenderer";
import { getRpcConfigurationsFromDisk } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcConfigurationsFromDisk";
import { getRpcCredentialsFromCookie } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcCredentialsFromCookie";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";
import { SendableMessageToMain } from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";
import { getDefaultRpcConfigurations } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getDefaultRpcConfigurations";
import { featureFlags } from "src/featureFlags/featureFlags";
import { PromiseType } from "_t/typeHelpers";
import { getBtcdRpcConfigurations } from "_m/mainRpcClient/getBtcdRpcConfigurations";

export const handleRpcRequest = async (
  data: Extract<SendableMessageToMain, { type: "rpc-request" }>,
) => {
  let response!: RpcResponse;
  let rpcConfigurations: PromiseType<ReturnType<
    typeof getRpcConfigurationsFromDisk
  >>;

  try {
    if (
      data.payload.connectionConfigurations !== undefined &&
      featureFlags.useBcore
    ) {
      const { connectionConfigurations } = data.payload;

      if (connectionConfigurations === null) {
        const defaultRpcConfigurations = await getDefaultRpcConfigurations();

        rpcConfigurations = defaultRpcConfigurations;
      } else if ("cookiePath" in connectionConfigurations) {
        const cookieCredentials = await getRpcCredentialsFromCookie(
          connectionConfigurations.cookiePath,
        );

        rpcConfigurations = {
          ...connectionConfigurations,
          ...cookieCredentials,
        };
      } else {
        rpcConfigurations = connectionConfigurations;
      }
    } else if (featureFlags.useBcore) {
      rpcConfigurations = await getRpcConfigurationsFromDisk();
    } else {
      rpcConfigurations = getBtcdRpcConfigurations();
    }

    response = await mainRpcClient(data.payload, rpcConfigurations);
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
