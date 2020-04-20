import { useSelector } from "react-redux";
import * as selectors from "_r/redux/selectors";

export const useConnectionStatus = () => {
  const bitcoinCoreConnectionIssue = useSelector(
    selectors.determineBitcoinConnectionIssue,
  );

  const isUnauthorized = bitcoinCoreConnectionIssue === "isUnauthorized";
  const isServerWarmingUp = bitcoinCoreConnectionIssue === "isServerWarmingUp";
  const isConnected = !bitcoinCoreConnectionIssue;

  return { isUnauthorized, isServerWarmingUp, isConnected };
};
