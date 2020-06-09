import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RpcService } from "_r/RpcService/RpcService";
import { FeatureFlags } from "_f/FeatureFlags";

export const RedirectFromRoot: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    if (FeatureFlags.enableExplorer) {
      const request = async () => {
        const blockchainInfo = await RpcService.requestBlockchainInfo(
          __NONCE__,
        );

        history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
      };

      request();
    } else {
      history.push("/wallet");
    }
  });

  return null;
};
