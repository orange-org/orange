import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useRpcResponses } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { Block } from "./Block";
import { BlockDetails } from "./BlockDetails";
import { useExplorerStyles } from "./ExplorerStyles";

const range = [...Array(25).keys()];

export const Explorer: React.FC = memo(() => {
  const cn = useExplorerStyles();
  const rpcResponses = useRpcResponses();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [displayedBlock, setDisplayedBlock] = useState<TBlock | null>(null);
  // const { blockNeedle } = useParams() as any;

  useEffect(() => {
    dispatch(thunks.requestBlockchainInfo(__NONCE__));
  }, []);

  const { blockchainInfo } = rpcResponses;
  const blockCount = blockchainInfo?.blocks;

  if (!blockCount || blockCount < 100) {
    return null;
  }

  // console.log("blockNeedle", blockNeedle);

  return (
    <div className={cn.root}>
      <div className={clsx(cn.blocksContainer)}>
        <div className={cn.blocksInnerContainer}>
          {range.map(i => (
            <Block
              key={i}
              blockHeight={blockCount - i}
              setDisplayedBlock={setDisplayedBlock}
            />
          ))}
        </div>
      </div>
      <Switch>
        <Route path={`${match.path}/:blockNeedle`}>
          <BlockDetails displayedBlock={displayedBlock} />
        </Route>
      </Switch>
    </div>
  );
});
