import { createAction } from "typesafe-actions";

import { RpcResponse } from "typings/bitcoindRpcResponses";
import { Json } from "typings/types";

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<
  Json
>();

export const receiveBitcoindLine = createAction("RECEIVE_BITCOIND_LINE")<
  string
>();

export const receiveBitcoindRpcResponse = createAction(
  "RECEIVE_BITCOIND_RPC_RESPONSE",
)<RpcResponse>();
