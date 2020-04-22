import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { rpcService } from "_r/rpcClient/rpcService";

export const RedirectToHighestBlock: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const request = async () => {
      console.log("=\nFILE: RedirectToHighestBlock.tsx\nLINE: 10\n=");
      const blockchainInfo = await rpcService.requestBlockchainInfo(__NONCE__);
      console.log("=\nFILE: RedirectToHighestBlock.tsx\nLINE: 12\n=");

      history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
      // history.push(`/settings`);
    };

    request();
  });

  return null;
};
