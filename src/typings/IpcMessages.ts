import { RpcRequest } from "./RpcRequests";
import { RpcResponse } from "./RpcResponses";

export type Message<T, P> = {
  nonce: NONCE;
  type: T;
  payload: P;
};

export type MessageWithoutPayload<T> = Omit<Message<T, undefined>, "payload">;

export type MtR = "@orange/main";
export type MtM = "@orange/renderer";

export type RpcRequestMtM = Message<"rpcRequest", RpcRequest>;
export type RpcResponseMtR = Message<RpcRequestMtM["type"], RpcResponse>;

export type ShowErrorMtM = Message<"showError", string>;
export type ShowErrorMtR = Message<ShowErrorMtM["type"], string>;

export type SetIsReadyMtM = Message<"setIsReady", undefined>;

export type RpcConfigurations = {
  username: string;
  password: string;
  serverUrl: string;
};

export type MessageToMain = RpcRequestMtM | ShowErrorMtM | SetIsReadyMtM;
export type MessageToRenderer = RpcResponseMtR | ShowErrorMtR;

export type SendableMessageToRenderer = {
  source: MtR;
  messageId: string;
} & MessageToRenderer;

export type SendableMessageToMain = {
  source: MtM;
  messageId: string;
} & MessageToMain;
