import { isEqual } from "lodash";
import { UnsentRpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponse } from "_t/bitcoindRpcResponses";
import { RpcClientReturnType } from "../rpcClient";

class RpcClientMockResponses {
  queuedResponses: {
    request: UnsentRpcRequest;
    response: RpcResponse["result"];
  }[] = [];

  forRequest = <TRpcRequest extends UnsentRpcRequest>(request: TRpcRequest) => {
    return {
      queueResponse: (response: RpcClientReturnType<TRpcRequest>) => {
        this.queuedResponses.push({
          request,
          response,
        });
      },
    };
  };

  popResponseFor = (request: UnsentRpcRequest) => {
    const responseIndex = this.queuedResponses.findIndex(queuedResponse =>
      isEqual(queuedResponse.request, request),
    );

    if (responseIndex === -1) {
      return null;
    }

    const queuedResponse = this.queuedResponses.splice(responseIndex, 1);

    return queuedResponse[0].response;
  };

  close = () => {
    if (this.queuedResponses.length > 0) {
      throw new Error(
        `Found unused queued responses: ${JSON.stringify(
          this.queuedResponses,
          null,
          2,
        )}`,
      );
    }
  };
}

export const rpcClientMockResponses = new RpcClientMockResponses();
