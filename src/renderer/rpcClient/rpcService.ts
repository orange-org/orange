import { rpcClient } from "./rpcClient";

type Verbosity = 0 | 1 | 2;

class RpcService {
  requestBlockchainInfo = (nonce: NONCE) =>
    rpcClient(nonce, {
      method: "getblockchaininfo",
    });

  requestBlock = (
    nonce: NONCE,
    blockHash: string,
    /* istanbul ignore next */
    verbosity: Verbosity = 1,
  ) => rpcClient(nonce, { method: "getblock", params: [blockHash, verbosity] });

  requestBlockHash = (nonce: NONCE, blockHeight: number) =>
    rpcClient(nonce, { method: "getblockhash", params: [blockHeight] });

  requestBlockByHeight = async (
    nonce: NONCE,
    blockHeight: number,
    verbosity: Verbosity = 1,
  ) => {
    const blockHash = await this.requestBlockHash(nonce, blockHeight);
    const block = await this.requestBlock(nonce, blockHash, verbosity);

    return block;
  };

  requestRawTransaction = async (
    nonce: NONCE,
    transactionId: string,
    verbose: boolean = true,
  ) =>
    rpcClient(nonce, {
      method: "getrawtransaction",
      params: [transactionId, verbose],
    });

  requestUptime = async (nonce: NONCE) =>
    rpcClient(nonce, {
      method: "uptime",
    });
}

export const rpcService = new RpcService();
