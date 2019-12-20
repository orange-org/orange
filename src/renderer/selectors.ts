import { State } from "./types";

export function shouldShowSplashScreen(state: State) {
  return state !== null;
}
