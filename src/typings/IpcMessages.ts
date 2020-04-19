import { State } from "_r/redux/reducers/reducer";
import { DeepPartial } from "redux";
import { RpcRequest } from "./RpcRequests";
import { RpcResponse } from "./RpcResponses";

export type Message<S, T, M> = {
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

export type MtR = "@orange/main";
export type MtM = "@orange/renderer";

export type RpcResponseMtR = Message<MtR, "rpc-response", RpcResponse>;

export type SetDataInReduxStoreMtR = Message<
  MtR,
  "set-data-in-redux-store",
  DeepPartial<State["mainProcessData"]>
>;

export type MessageToRenderer = RpcResponseMtR | SetDataInReduxStoreMtR;

export type RpcRequestMtM = Message<MtM, "rpc-request", RpcRequest>;

export type showErrorMtM = Message<MtM, "show-error", string>;

export type MessageToMain = RpcRequestMtM | showErrorMtM;
