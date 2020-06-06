import { CORE_RPC_ERROR, NODE_ERROR } from "_c/constants";
import { MainRpcClient } from "_m/WindowManager/MainWindow/RpcRequestIpcEvent/MainRpcClient/MainRpcClient";
import { windowManager } from "_m/WindowManager/WindowManager";
import { SendableMessageToMain } from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";
import { RpcServerConfigurations } from "_m/common/RpcServerConfigurations";

export class RpcRequestIpcEvent {
  static handle = async (
    data: Extract<SendableMessageToMain, { type: "rpc-request" }>,
  ) => {
    let response!: RpcResponse;

    try {
      response = await MainRpcClient.call(
        data.payload,
        RpcServerConfigurations,
      );
    } catch (error) {
      const errorResponse = {
        result: null,
        error: { message: "", code: 0 },
        method: data.payload.method,
      };

      const errorDefinitions = [
        {
          message: "Server is unreachable",
          condition:
            error.code === NODE_ERROR.ECONNREFUSED ||
            error.code === NODE_ERROR.ENOTFOUND,
        },

        {
          message: "Server is warming up",
          condition: error.code === CORE_RPC_ERROR.warmingUp,
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
