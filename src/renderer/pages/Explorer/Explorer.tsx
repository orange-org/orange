import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
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
  const history = useHistory();

  useEffect(() => {
    dispatch(thunks.requestBlockchainInfo(__NONCE__));
  }, []);

  const { blockchainInfo } = rpcResponses;
  const blockCount = blockchainInfo?.blocks;
  const bestBlockHash = blockchainInfo?.bestblockhash;

  useEffect(() => {
    if (bestBlockHash) {
      history.push(`${match.path}/${bestBlockHash}`);
    }
  }, [!!bestBlockHash]);

  if (!blockCount || blockCount < 100 || !bestBlockHash) {
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
      <Switch>
        <Route path={`${match.path}/:blockSearchQuery`}>
          <BlockDetails />
        </Route>
      </Switch>
    </div>
  );
});