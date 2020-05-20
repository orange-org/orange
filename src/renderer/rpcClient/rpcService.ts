import { rpcClient } from "./rpcClient";

type Verbosity = 0 | 1 | 2;

class RpcService {
  listWallets = (nonce: NONCE) => rpcClient(nonce, { method: "listwallets" });

  requestBlockchainInfo = (nonce: NONCE, cacheDuration?: number) =>
    rpcClient(
      nonce,
      {
        method: "getblockchaininfo",
      },
      cacheDuration,
    );

  requestMempoolInfo = (nonce: NONCE, cacheDuration?: number) =>
    rpcClient(
      nonce,
      {
        method: "getmempoolinfo",
      },
      cacheDuration,
    );

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

  createWallet = async (
    nonce: NONCE,
    walletName: string,
    disablePrivateKeys: boolean,
    blank: boolean,
    passphrase: string,
    avoidReuse: boolean,
  ) =>
    rpcClient(nonce, {
      method: "createwallet",
      params: [walletName, disablePrivateKeys, blank, passphrase, avoidReuse],
    });

  setHdSeed = (
    nonce: NONCE,
    walletName: string,
    newKeyPool: boolean,
    seed: string,
  ) =>
    rpcClient(nonce, {
      method: "sethdseed",
      params: [newKeyPool, seed],
      walletName,
    });
}

export const rpcService = new RpcService();
