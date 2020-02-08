import React, { useEffect } from "react";
import * as thunks from "_r/redux/thunks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { rpcService } from "_r/rpcClient/rpcService";

export const RedirectToHighestBlock: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const request = async () => {
      const blockchainInfo = await rpcService.requestBlockchainInfo(__NONCE__);

      history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
      // history.push(`/explorer/1665243`);
    };

    request();
  });

  return null;
};
