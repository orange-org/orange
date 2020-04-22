import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { rpcService } from "_r/rpcClient/rpcService";

export const RedirectToHighestBlock: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const request = async () => {
      // const blockchainInfo = await rpcService.requestBlockchainInfo(__NONCE__);

      // history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
      history.push(`/settings`);
    };

    request();
  });

  return null;
};
