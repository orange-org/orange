import { RpcRequest } from "./bitcoindRpcRequests";
import { RpcResponse } from "./bitcoindRpcResponses";
import { WithoutProperty } from "./typeHelpers";

type MessageWithMetaData<S, T, M> = {
  nonce: NONCE;
  source: S;
  type: T;
  message: M;
};

type ExcludeMessageIfNull<M, T> = M extends null
  ? WithoutProperty<T, "message">
  : T;

type CreateMtR<T, M> = ExcludeMessageIfNull<
  M,
  MessageWithMetaData<"@orange/main", T, M>
>;

type CreateMtM<T, M> = ExcludeMessageIfNull<
  M,
  MessageWithMetaData<"@orange/renderer", T, M>
>;

export type BitcoindLogLinesMtR = CreateMtR<"bitcoind-log-lines", string[]>;

export type RpcServerIsDownMtR = CreateMtR<"rpc-server-is-down", null>;

export type RpcResponseMtR = CreateMtR<"rpc-response", RpcResponse>;

export type MessageToRenderer =
  | BitcoindLogLinesMtR
  | RpcResponseMtR
  | RpcServerIsDownMtR;

export type OpenDebugFileMtM = CreateMtM<"open-debug-file", null>;

export type RpcRequestMtM = CreateMtM<"rpc-request", RpcRequest>;

export type MessageToMain = OpenDebugFileMtM | RpcRequestMtM;
