import { State } from "./types";

export function shouldShowSplashScreen(state: State) {
  return state.bitcoindOutput.initMessage !== "Done loading";
}

export function getSystemPreferences(state: State) {
  return state.systemPreferences;
}
