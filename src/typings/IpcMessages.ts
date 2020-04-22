import { State } from "_r/redux/reducers/reducer";
import { DeepPartial } from "redux";
import { RpcRequest } from "./RpcRequests";
import { RpcResponse } from "./RpcResponses";

export type Message<T, M> = {
  nonce: NONCE;
  type: T;
  message: M;
};

export type MtR = "@orange/main";
export type MtM = "@orange/renderer";

export type SetDataInReduxStoreMtR = Message<
  "set-data-in-redux-store",
  DeepPartial<State["mainProcessData"]>
>;

export type RpcRequestMtM = Message<"rpc-request", RpcRequest>;
export type RpcResponseMtR = Message<RpcRequestMtM["type"], RpcResponse>;

export type showErrorMtM = Message<"show-error", string>;
export type showErrorMtR = Message<showErrorMtM["type"], string>;

export type MessageToMain = RpcRequestMtM | showErrorMtM;
export type MessageToRenderer =
  | RpcResponseMtR
  | showErrorMtR
  | SetDataInReduxStoreMtR;

export type SendableMessageToRenderer = {
  source: MtR;
  messageId: string;
} & MessageToRenderer;

export type SendableMessageToMain = {
  source: MtM;
  messageId: string;
} & MessageToMain;
