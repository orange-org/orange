import { commandLineArgs } from "_m/common/CommandLineArgs";
import { HttpRequest } from "_m/WindowManager/RpcRequestIpcEvent/HttpRequest/HttpRequest";
import { RpcRequest } from "_t/RpcRequests";
import { RawRpcResponse } from "_t/RpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { BackendService } from "_m/BackendServicesManager/BackendService/BackendService";
import { RpcServerConfigurations } from "_m/BackendServicesManager/RpcServerConfigurations";

export class Core extends BackendService {
  getArgs = () => {
    const args = [
      `--rpcuser=${RpcServerConfigurations.username}`,
      `--rpcpassword=${RpcServerConfigurations.password}`,
      `--rpcbind=${RpcServerConfigurations.hostname}`,
      `--rpcport=${RpcServerConfigurations.port}`,
      `--zmqpubrawblock=tcp://${RpcServerConfigurations.hostname}:28332`,
      `--zmqpubrawtx=tcp://${RpcServerConfigurations.hostname}:28333`,
      "--server=1",
      "--txindex",
    ];

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      args.push("--testnet");
    }

    if (commandLineArgs["core.datadir"]) {
      args.push(`--datadir=${commandLineArgs["core.datadir"]}`);
    } else {
      args.push(`--datadir=${this.getDatadir()}`);
    }

    return args;
  };

  call = async <TRpcRequest extends RpcRequest>(
    rpcRequest: TRpcRequest,
  ): Promise<ExtractedRpcResponse<TRpcRequest>> => {
    const { method, params = [], walletName } = rpcRequest;
    const { username, password, serverUrl } = RpcServerConfigurations;
    const finalServerUrl = walletName
      ? `${serverUrl}/wallet/${encodeURIComponent(walletName)}`
      : serverUrl;

    const options = {
      method: "POST",
      auth: `${username}:${password}`,
      headers: { "content-type": "text/plain" },
    };
    const body = { jsonrpc: "1.0", id: "N/A", method, params };

    const response = await HttpRequest.make({
      url: finalServerUrl,
      options,
      body,
    });

    const { result, error }: RawRpcResponse =
      response.data.length > 0
        ? JSON.parse(response.data)
        : { result: "", error: null };

    return { result, error, method } as ExtractedRpcResponse<TRpcRequest>;
  };
}
