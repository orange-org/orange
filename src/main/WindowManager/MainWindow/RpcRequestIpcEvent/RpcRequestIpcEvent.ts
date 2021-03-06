import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { FeatureFlags } from "_f/FeatureFlags";
import { btcdRpcConfigurations } from "_m/common/BtcdRpcConfigurations";
import { MainRpcClient } from "_m/WindowManager/MainWindow/RpcRequestIpcEvent/MainRpcClient/MainRpcClient";
import { BcoreRpcConfigurations } from "_m/WindowManager/MainWindow/RpcRequestIpcEvent/BcoreRpcConfigurations/BcoreRpcConfigurations";
import { windowManager } from "_m/WindowManager/WindowManager";
import { SendableMessageToMain } from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";
import { PromiseType } from "_t/typeHelpers";
import { BitcoinConf } from "./BcoreRpcConfigurations/BitcoinConf";

export class RpcRequestIpcEvent {
  static handle = async (
    data: Extract<SendableMessageToMain, { type: "rpc-request" }>,
  ) => {
    let response!: RpcResponse;
    let rpcConfigurations: PromiseType<ReturnType<
      typeof BcoreRpcConfigurations.fromDisk
    >>;

    try {
      const chain = await BitcoinConf.getChain();

      if (
        data.payload.connectionConfigurations !== undefined &&
        FeatureFlags.useBcore
      ) {
        const { connectionConfigurations } = data.payload;

        if (connectionConfigurations === null) {
          const defaultRpcConfigurations = await BcoreRpcConfigurations.getDefault(
            chain,
          );

          rpcConfigurations = defaultRpcConfigurations;
        } else if ("cookiePath" in connectionConfigurations) {
          const cookieCredentials = await BcoreRpcConfigurations.fromCookie(
            chain,
            connectionConfigurations.cookiePath,
          );

          rpcConfigurations = {
            ...connectionConfigurations,
            ...cookieCredentials,
          };
        } else {
          rpcConfigurations = connectionConfigurations;
        }
      } else if (FeatureFlags.useBcore) {
        rpcConfigurations = await BcoreRpcConfigurations.fromDisk(chain);
      } else {
        rpcConfigurations = btcdRpcConfigurations;
      }

      response = await MainRpcClient.call(data.payload, rpcConfigurations);
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
          errorResponse.error.message =
            errorDefinition.message || error.message;
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

    windowManager.sendMessageToMainWindow({
      nonce: __NONCE__,
      type: "rpc-request",
      payload: response,
      messageId: data.messageId,
    });
  };
}
