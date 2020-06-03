import http from "http";
import { RPC_ERROR } from "_c/constants";
import { RpcRequest } from "_t/RpcRequests";
import { RawRpcResponse } from "_t/RpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { ErrorWithCode } from "_c/ErrorWithCode";

type RequestParams = {
  url: string;
  options: http.RequestOptions;
  body: any;
};

export class MainRpcClient {
  private static httpRequest = (
    requestParams: RequestParams,
  ): Promise<http.IncomingMessage & { data: string }> => {
    const { url, options, body } = requestParams;

    return new Promise((resolve, reject) => {
      const nodeRequest = http.request(url, options, response => {
        response.setEncoding("utf8");

        let data = "";

        response.on("data", dataChunk => {
          data += dataChunk;
        });

        response.on("end", () => {
          resolve(Object.assign(response, { data }));
        });
      });

      nodeRequest.write(JSON.stringify(body));

      nodeRequest.on("error", reject);

      nodeRequest.end();
    });
  };

  static call = async <TRpcRequest extends RpcRequest>(
    rpcRequest: TRpcRequest,
    rpcConfigurations: {
      username: string;
      password: string;
      serverUrl: string;
    },
  ): Promise<ExtractedRpcResponse<TRpcRequest>> => {
    const { method, params = [] } = rpcRequest;
    const { username, password, serverUrl } = rpcConfigurations;

    const options = {
      method: "POST",
      auth: `${username}:${password}`,
      headers: { "content-type": "text/plain" },
    };
    const body = { jsonrpc: "1.0", id: "N/A", method, params };

    const response = await MainRpcClient.httpRequest({
      url: serverUrl,
      options,
      body,
    });

    if (response.statusCode === 401 || response.statusCode === 403) {
      throw new ErrorWithCode(
        "RPC server unauthorized request",
        RPC_ERROR.unauthorized,
      );
    }

    const { result, error }: RawRpcResponse = JSON.parse(response.data);

    return { result, error, method } as ExtractedRpcResponse<TRpcRequest>;
  };
}
