import { createSelector } from "reselect";
import { State } from "./reducers/reducer";

export const determineBitcoinConnectionIssue = createSelector(
  (s: State) => s.bitcoinCoreConnectionIssues,
  bitcoinCoreConnectionIssue => {
    const possibleIssues: ReadonlyArray<keyof State["bitcoinCoreConnectionIssues"]> = [
      "isCookieUnavailable",
      "isServerUnreachable",
      "isServerWarmingUp",
      "isUnauthorized",
    ];

    return (
      possibleIssues.find(
        possibleIssue => bitcoinCoreConnectionIssue[possibleIssue],
      ) || null
    );
  },
);

export const hasBitcoinCoreConnectionIssue = createSelector(
  determineBitcoinConnectionIssue,
  bitcoinCoreConnectionIssue => bitcoinCoreConnectionIssue !== null,
);
