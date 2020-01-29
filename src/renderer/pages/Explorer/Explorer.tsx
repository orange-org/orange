import clsx from "clsx";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePolling, useRpcResponses } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { Block } from "./Block";
import { useExplorerStyles } from "./ExplorerStyles";

const range = [...Array(25).keys()];

export const Explorer: React.FC = memo(() => {
  const cn = useExplorerStyles();
  const rpcResponses = useRpcResponses();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.requestBlockchainInfo(__NONCE__));
  }, []);

  const { blockchainInfo } = rpcResponses;
  const blockCount = blockchainInfo?.blocks;

  if (!blockCount || blockCount < 100) {
    return null;
  }

  return (
    <div className={cn.root}>
      <div className={clsx(cn.blocksContainer)}>
        <div className={cn.blocksInnerContainer}>
          {range.map(i => (
            <Block key={i} blockHeight={blockCount - i} />
          ))}
        </div>
      </div>
    </div>
  );
});
