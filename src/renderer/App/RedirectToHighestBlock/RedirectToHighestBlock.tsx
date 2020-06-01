import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RpcService } from "_r/RpcService/RpcService";

export const RedirectToHighestBlock: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const request = async () => {
      const blockchainInfo = await RpcService.requestBlockchainInfo(__NONCE__);

      history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
    };

    request();
  });

  return null;
};
