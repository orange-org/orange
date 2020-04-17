import { State } from "./reducers/reducer";

export const hasBitcoinCoreConnectionIssue = (s: State) => {
  return Object.keys(s.bitcoinCoreConnectionIssue).some(
    // @ts-ignore
    key => s.bitcoinCoreConnectionIssue[key] === false,
  );
};
