import { State } from "_r/redux/reducers/reducer";
import { DeepPartial } from "redux";
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

export type SetDataInReduxStoreMtR = Message<
  "set-data-in-redux-store",
  DeepPartial<State["mainProcessData"]>
>;

export type RpcRequestMtM = Message<"rpc-request", RpcRequest>;
export type RpcResponseMtR = Message<RpcRequestMtM["type"], RpcResponse>;

export type ShowErrorMtM = Message<"show-error", string>;
export type ShowErrorMtR = Message<ShowErrorMtM["type"], string>;

export type ShowCookieOpenDialogMtM = MessageWithoutPayload<
  "show-cookie-open-dialog"
>;
export type ShowCookieOpenDialogMtR = Message<
  ShowCookieOpenDialogMtM["type"],
  string | null
>;

export type MessageToMain =
  | RpcRequestMtM
  | ShowErrorMtM
  | ShowCookieOpenDialogMtM;
export type MessageToRenderer =
  | RpcResponseMtR
  | ShowErrorMtR
  | SetDataInReduxStoreMtR
  | ShowCookieOpenDialogMtR;

export type SendableMessageToRenderer = {
  source: MtR;
  messageId: string;
} & MessageToRenderer;

export type SendableMessageToMain = {
  source: MtM;
  messageId: string;
} & MessageToMain;
