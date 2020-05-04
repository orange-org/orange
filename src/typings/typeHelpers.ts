import { State } from "_r/redux/reducers/reducer";
import { RpcRequest } from "./RpcRequests";
import { RpcResponse } from "./RpcResponses";

export type NullableProperties<TypeWithKeys> = {
  [Key in keyof TypeWithKeys]: TypeWithKeys[Key] | null;
};

export type KeysOfUnion<T> = T extends any ? keyof T : never;

export type NonNullableProperties<T> = {
  [Key in keyof T]: NonNullable<T[Key]>;
};

export type ValuesOf<T extends any[]> = T[number];

export type AllKeys<T> = T extends T ? keyof T : never;

export type ObjectValues<T> = T[keyof T];

export type ExtractedRpcResponse<
  T extends RpcRequest | Omit<RpcRequest, "requestId">
> = Extract<RpcResponse, { method: T["method"] }>;

export type WithoutProperty<T, K> = {
  [L in Exclude<keyof T, K>]: T[L];
};

export type StateConfig<T> = Readonly<NullableProperties<T>>;

export type Json = { [name: string]: string };

export type GetState = () => State;

/**
 * Null
 *
 * `undefined` or `null`
 */
export type Null = undefined | null;

// https://github.com/piotrwitek/utility-types/blob/ba66c895c7e52263268d179c142088f3e245a033/src/mapped-types.ts#L371
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
