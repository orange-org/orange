import { RpcClient } from "./RpcClient";

type Verbosity = 0 | 1 | 2;

export class RpcService {
  static requestBlockchainInfo = (nonce: NONCE, cacheDuration?: number) =>
    RpcClient.send(
      nonce,
      {
        method: "getblockchaininfo",
      },
      cacheDuration,
    );

  static requestMempoolInfo = (nonce: NONCE, cacheDuration?: number) =>
    RpcClient.send(
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
  ) =>
    RpcClient.send(nonce, {
      method: "getblock",
      params: [blockHash, verbosity],
    });

  static requestBlockHash = (nonce: NONCE, blockHeight: number) =>
    RpcClient.send(nonce, { method: "getblockhash", params: [blockHeight] });

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
    RpcClient.send(nonce, {
      method: "getrawtransaction",
      params: [transactionId, verbose],
    });

  static requestPeerInfo = async (nonce: NONCE, cacheDuration?: number) =>
    RpcClient.send(
      nonce,
      {
        method: "getpeerinfo",
      },
      cacheDuration,
    );

  static listWallets = (nonce: NONCE) =>
    RpcClient.send(nonce, { method: "listwallets" });

  static listWalletDir = (nonce: NONCE) =>
    RpcClient.send(nonce, { method: "listwalletdir" });

  static createWallet = async (
    nonce: NONCE,
    walletName: string,
    disablePrivateKeys: boolean,
    blank: boolean,
    passphrase: string,
    avoidReuse: boolean,
  ) =>
    RpcClient.send(nonce, {
      method: "createwallet",
      params: [walletName, disablePrivateKeys, blank, passphrase, avoidReuse],
    });

  static setHdSeed = (
    nonce: NONCE,
    walletName: string,
    newKeyPool: boolean,
    seed: string,
  ) =>
    RpcClient.send(nonce, {
      method: "sethdseed",
      params: [newKeyPool, seed],
      walletName,
    });

  static listTransactions = (
    nonce: NONCE,
    walletName: string,
    count: number = 1000,
    skip: number = 0,
    includeWatchOnly: boolean = false,
  ) =>
    RpcClient.send(nonce, {
      method: "listtransactions",
      params: ["*", count, skip, includeWatchOnly],
      walletName,
    });
}
