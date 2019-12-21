// import { RootState } from "./types";

export function shouldShowSplashScreen(state: any) {
  return state.bitcoindOutput.initMessage !== "Done loading";
}
