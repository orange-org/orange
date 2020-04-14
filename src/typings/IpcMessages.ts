import { RpcRequest } from "./bitcoindRpcRequests";
import { RpcResponse } from "./bitcoindRpcResponses";

type Message<S, T, M> = {
  nonce: NONCE;
  source: S;
  type: T;
  message: M;
};

// type MessageNoPayload<S, T> = {
//   nonce: NONCE;
//   source: S;
//   type: T;
//   message?: null;
// };

type MtR = "@orange/main";
type MtM = "@orange/renderer";

export type RpcResponseMtR = Message<MtR, "rpc-response", RpcResponse>;

export type MessageToRenderer = RpcResponseMtR;

export type RpcRequestMtM = Message<MtM, "rpc-request", RpcRequest>;

export type showErrorMtM = Message<MtM, "show-error", string>;

export type MessageToMain = RpcRequestMtM | showErrorMtM;
