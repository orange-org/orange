import { Constants } from "_c/constants";
import { RpcServerConfigurations } from "_m/common/RpcServerConfigurations";
import { MainRpcClient } from "_m/WindowManager/RpcRequestIpcEvent/MainRpcClient/MainRpcClient";
import {
  SendableMessageToMain,
  SendableMessageToRenderer,
} from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";

export class RpcRequestIpcEvent {
  static handle = async (
    data: Extract<SendableMessageToMain, { type: "rpcRequest" }>,
  ): Promise<Omit<SendableMessageToRenderer, "source">> => {
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
            error.code === Constants.nodeError.ECONNREFUSED ||
            error.code === Constants.nodeError.ENOTFOUND,
        },

        {
          message: "Server is warming up",
          condition: error.code === Constants.coreRpcError.warmingUp,
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

    return {
      nonce: __NONCE__,
      type: "rpcRequest",
      payload: response,
      messageId: data.messageId,
    };
  };
}
