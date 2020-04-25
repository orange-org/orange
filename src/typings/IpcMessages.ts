import { State } from "_r/redux/reducers/reducer";
import { DeepPartial } from "redux";
import { RpcRequest } from "./RpcRequests";
import { RpcResponse } from "./RpcResponses";
import { NullableProperties } from "./typeHelpers";

export type Message<T, P> = {
  nonce: NONCE;
  type: T;
  payload: P;
};

export type MessageWithoutPayload<T> = Omit<Message<T, undefined>, "payload">;

export type MtR = "@orange/main";
export type MtM = "@orange/renderer";

export type RpcRequestMtM = Message<"rpc-request", RpcRequest>;
export type RpcResponseMtR = Message<RpcRequestMtM["type"], RpcResponse>;

export type ShowErrorMtM = Message<"show-error", string>;
export type ShowErrorMtR = Message<ShowErrorMtM["type"], string>;

export type GetCookieFileFromOpenDialogMtM = MessageWithoutPayload<
  "get-cookie-file-from-open-dialog"
>;
export type GetCookieFileFromOpenDialogMtR = Message<
  GetCookieFileFromOpenDialogMtM["type"],
  string | null
>;

export type GetSavedRpcConfigurationsMtM = MessageWithoutPayload<
  "get-saved-rpc-configurations"
>;

export type RpcConfigurations = (
  | { cookieFile: string }
  | {
      username: string;
      password: string;
    }
) & {
  serverUrl: string;
};

export type GetSavedRpcConfigurationsMtR = Message<
  GetSavedRpcConfigurationsMtM["type"],
  RpcConfigurations | null
>;

export type SaveRpcConfigurationsMtM = Message<
  "save-rpc-configurations",
  RpcConfigurations | null
>;

export type SaveRpcConfigurationsMtR = Message<
  SaveRpcConfigurationsMtM["type"],
  null
>;

export type MessageToMain =
  | RpcRequestMtM
  | ShowErrorMtM
  | GetCookieFileFromOpenDialogMtM
  | GetSavedRpcConfigurationsMtM
  | SaveRpcConfigurationsMtM;
export type MessageToRenderer =
  | RpcResponseMtR
  | ShowErrorMtR
  | GetCookieFileFromOpenDialogMtR
  | GetSavedRpcConfigurationsMtR
  | SaveRpcConfigurationsMtR;

export type SendableMessageToRenderer = {
  source: MtR;
  messageId: string;
} & MessageToRenderer;

export type SendableMessageToMain = {
  source: MtM;
  messageId: string;
} & MessageToMain;
