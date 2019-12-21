import { createAction } from "typesafe-actions";

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<{
  [name: string]: string;
}>();

export const receiveBitcoindLine = createAction("RECEIVE_BITCOIND_LINE")<
  string
>();
