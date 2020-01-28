import clsx from "clsx";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRpcResponses, usePolling } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { Block } from "./ExplorerComponents";
import { useExplorerStyles } from "./ExplorerStyles";

export const Explorer: React.FC = () => {
  const cn = useExplorerStyles();
  const rpcResponses = useRpcResponses();
  const isSyncingHeaders = useSelector(s => s.isSyncingHeaders);
  const dispatch = useDispatch();

  usePolling(() => {
    dispatch(thunks.requestHeaderSyncParameters(__NONCE__));
  }, 1000);

  const headerCount = rpcResponses.blockchainInfo?.headers;

  return (
    <div className={cn.root}>
      {(isSyncingHeaders && (
        <div className={clsx(cn.blocksContainer, cn.overflowHidden)}>
          <div className={cn.blocksInnerContainer}>
            {headerCount! > 0 &&
              [...Array(100).keys()].map(i => (
                <Block
                  key={i}
                  blockNumber={(headerCount! - i).toLocaleString()}
                  variant="outlined"
                >
                  Header only
                </Block>
              ))}
          </div>
        </div>
      )) || (
        <div className={clsx(cn.blocksContainer)}>
          <div className={cn.blocksInnerContainer}>
            {[...Array(100).keys()].reverse().map(i => (
              <Block key={i} blockNumber={i} variant="outlined">
                Block
              </Block>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
