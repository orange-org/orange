import { rpcClient } from "./rpcClient";

type Verbosity = 0 | 1 | 2;

class RpcService {
  requestBlockchainInfo = (nonce: NONCE) =>
    rpcClient(nonce, {
      method: "getblockchaininfo",
    });

  requestBlock = (nonce: NONCE, blockHash: string, verbosity: Verbosity = 1) =>
    rpcClient(nonce, { method: "getblock", params: [blockHash, verbosity] });

  requestBlockHash = (nonce: NONCE, blockHeight: number) =>
    rpcClient(nonce, { method: "getblockhash", params: [blockHeight] });

  requestBlockByHeight = async (
    nonce: NONCE,
    blockHeight: number,
    verbosity: Verbosity = 1,
  ) =>
    this.requestBlock(
      nonce,
      await this.requestBlockHash(nonce, blockHeight),
      verbosity,
    );
}

export const rpcService = new RpcService();
