export const SET_SYSTEM_PREFERENCE = "SET_SYSTEM_PREFERENCE";

export function setSystemPreference(payload: { [name: string]: string }) {
  return { type: SET_SYSTEM_PREFERENCE, payload };
}
