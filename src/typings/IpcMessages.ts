import { ErrorCode } from "_c/constants";
import { RpcRequest } from "./RpcRequests";
import { RpcResponse } from "./RpcResponses";

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
export type ErrorMtR = Message<MtR, "error", ErrorCode>;

export type MessageToRenderer = RpcResponseMtR | ErrorMtR;

export type RpcRequestMtM = Message<MtM, "rpc-request", RpcRequest>;

export type showErrorMtM = Message<MtM, "show-error", string>;

export type MessageToMain = RpcRequestMtM | showErrorMtM;
