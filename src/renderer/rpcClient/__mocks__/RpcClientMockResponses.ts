import { isEqual } from "lodash";
import { RpcResponse } from "_t/RpcResponses";
import { RpcRequest } from "_t/RpcRequests";

type SimplifiedRpcResponse =
  | RpcResponse["result"]
  | { error: { code: number; message: string } };

class RpcClientMockResponses {
  queuedResponses: {
    request: RpcRequest;
    response: SimplifiedRpcResponse;
  }[] = [];

  forRequest = (request: RpcRequest) => {
    return {
      queueResponse: (response: SimplifiedRpcResponse) => {
        this.queuedResponses.push({
          request,
          response,
        });
      },
    };
  };

  popResponseFor = (request: RpcRequest) => {
    const responseIndex = this.queuedResponses.findIndex(queuedResponse =>
      isEqual(queuedResponse.request, request),
    );

    if (responseIndex === -1) {
      return null;
    }

    const queuedResponse = this.queuedResponses.splice(responseIndex, 1);

    return queuedResponse[0].response;
  };

  verify = () => {
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
