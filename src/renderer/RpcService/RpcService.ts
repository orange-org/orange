import { RpcClient } from "./RpcClient";

type Verbosity = 0 | 1 | 2;

export class RpcService {
  static requestBlockchainInfo = (nonce: NONCE, cacheDuration?: number) =>
    RpcClient(
      nonce,
      {
        method: "getblockchaininfo",
      },
      cacheDuration,
    );

  static requestMempoolInfo = (nonce: NONCE, cacheDuration?: number) =>
    RpcClient(
      nonce,
      {
        method: "getmempoolinfo",
      },
      cacheDuration,
    );

  static requestBlock = (
    nonce: NONCE,
    blockHash: string,
    /* istanbul ignore next */
    verbosity: Verbosity = 1,
  ) => RpcClient(nonce, { method: "getblock", params: [blockHash, verbosity] });

  static requestBlockHash = (nonce: NONCE, blockHeight: number) =>
    RpcClient(nonce, { method: "getblockhash", params: [blockHeight] });

  static requestBlockByHeight = async (
    nonce: NONCE,
    blockHeight: number,
    verbosity: Verbosity = 1,
  ) => {
    const blockHash = await RpcService.requestBlockHash(nonce, blockHeight);
    const block = await RpcService.requestBlock(nonce, blockHash, verbosity);

    return block;
  };

  static requestRawTransaction = async (
    nonce: NONCE,
    transactionId: string,
    verbose = 1,
  ) =>
    RpcClient(nonce, {
      method: "getrawtransaction",
      params: [transactionId, verbose],
    });
}
