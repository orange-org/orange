import { RpcRequest } from "./bitcoindRpcRequests";
import { RpcResponse } from "./bitcoindRpcResponses";

type CreateMtR<T, M> = {
  nonce: NONCE;
  source: "@orange/main";
  type: T;
  message: M;
};

export type BitcoindLogLinesMtR = CreateMtR<"bitcoind-log-lines", string[]>;

export type RpcResponseMtR = CreateMtR<"rpc-response", RpcResponse>;

export type MessageToRenderer = BitcoindLogLinesMtR | RpcResponseMtR;

export type CreateMtM<T, M> = {
  nonce: NONCE;
  source: "@orange/renderer";
  type: T;
  message: M;
};

export type OpenDebugFileMtM = CreateMtM<"open-debug-file", string>;

export type RpcRequestMtM = CreateMtM<"rpc-request", RpcRequest>;

export type MessageToMain = OpenDebugFileMtM | RpcRequestMtM;
