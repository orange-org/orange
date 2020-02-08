import { rpcClient } from "./rpcClient";

class RpcService {
  requestBlockchainInfo = (nonce: NONCE) =>
    rpcClient(nonce, {
      method: "getblockchaininfo",
    });

  requestBlock = (nonce: NONCE, blockHash: string) =>
    rpcClient(nonce, { method: "getblock", params: [blockHash] });

  requestBlockHash = (nonce: NONCE, blockHeight: number) =>
    rpcClient(nonce, { method: "getblockhash", params: [blockHeight] });

  requestBlockByHeight = async (
    nonce: NONCE,
    blockHeight: number,
    verbosity: 0 | 1 | 2 = 1,
  ) =>
    rpcClient(nonce, {
      method: "getblock",
      params: [await this.requestBlockHash(nonce, blockHeight), verbosity],
    });
}

export const rpcService = new RpcService();
