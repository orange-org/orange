import React, { useEffect } from "react";
import * as thunks from "_r/redux/thunks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const RedirectToHighestBlock: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const request = async () => {
      const blockchainInfo = await dispatch(
        thunks.requestBlockchainInfo(__NONCE__),
      );

      history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
      // history.push(`/explorer/1665243`);
    };

    request();
  });

  return null;
};
