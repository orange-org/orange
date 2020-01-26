import { DeepReadonly } from "utility-types";
import { State } from "_r/redux/reducers/store";
import { RpcRequest } from "./bitcoindRpcRequests";
import { RpcResponse } from "./bitcoindRpcResponses";

export type NullableKeys<TypeWithKeys> = {
  [Key in keyof TypeWithKeys]: TypeWithKeys[Key] | null;
};

export type ValuesOf<T extends any[]> = T[number];

export type AllKeys<T> = T extends T ? keyof T : never;

export type OmitDistributed<T, K extends AllKeys<T>> = T extends T
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type ExtractedRpcResponse<
  T extends RpcRequest | Omit<RpcRequest, "requestId">
> = Extract<RpcResponse, { method: T["method"] }>;

export type WithoutProperty<T, K> = {
  [L in Exclude<keyof T, K>]: T[L];
};

export type StateConfig<T> = DeepReadonly<NullableKeys<T>>;

export type Json = { [name: string]: string };

export type GetState = () => State;

/**
 * Nullable
 *
 * `undefined` or `null`
 */
export type Nullable = undefined | null;
