import { RpcRequest } from "./bitcoindRpcRequests";
import { RpcResponse } from "./bitcoindRpcResponses";

type Message<S, T, M> = {
  nonce: NONCE;
  source: S;
  type: T;
  message: M;
};

type MessageNoPayload<S, T> = {
  nonce: NONCE;
  source: S;
  type: T;
  message?: null;
};

type MtR = "@orange/main";
type MtM = "@orange/renderer";

export type BitcoindLogLinesMtR = Message<MtR, "bitcoind-log-lines", string[]>;

export type RpcServerIsDownMtR = MessageNoPayload<MtR, "rpc-server-is-down">;

export type RpcResponseMtR = Message<MtR, "rpc-response", RpcResponse>;

export type MessageToRenderer =
  | BitcoindLogLinesMtR
  | RpcResponseMtR
  | RpcServerIsDownMtR;

export type OpenDebugFileMtM = MessageNoPayload<MtM, "open-debug-file">;

export type RpcRequestMtM = Message<MtM, "rpc-request", RpcRequest>;

export type MessageToMain = OpenDebugFileMtM | RpcRequestMtM;
