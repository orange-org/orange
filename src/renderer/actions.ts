export const SET_SYSTEM_PREFERENCE = "SET_SYSTEM_PREFERENCE";
export const RECEIVE_BITCOIND_LINE = "RECEIVE_BITCOIND_LINE";

export function setSystemPreference(payload: { [name: string]: string }) {
  return { type: SET_SYSTEM_PREFERENCE, payload };
}

export function receiveBitcoindLine(payload: string) {
  return { type: RECEIVE_BITCOIND_LINE, payload };
}
