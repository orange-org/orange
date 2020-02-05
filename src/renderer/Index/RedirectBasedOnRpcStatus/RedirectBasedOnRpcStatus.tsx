import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const RedirectBasedOnRpcStatus: React.FC<{
  isReady: boolean;
  isShuttingDown: boolean;
}> = props => {
  const history = useHistory();

  useEffect(() => {
    if (props.isReady) {
      setTimeout(() => {
        history.push("/explorer/top");
      }, 2000);
    } else if (props.isShuttingDown) {
      history.push("/");
    }
  }, [props.isReady, props.isShuttingDown]);

  return null;
};
