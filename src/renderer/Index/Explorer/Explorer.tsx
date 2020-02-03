import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useCommonStyles } from "_r/commonStyles";
import { useRpcResponses, useInterval } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { Block } from "./Block";
import { BlockDetails } from "./BlockDetails";
import { useExplorerStyles } from "./ExplorerStyles";
import { range } from "_r/utils/smallUtils";

export const Explorer_: React.FC = () => {
  const cn = useExplorerStyles();
  const ccn = useCommonStyles();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const [blockIndexesToRender, setBlockIndexesToRender] = useState(0);

  /**
   * Use interval here to increment the number of blocks to render because
   * if we try to render all the blocks in one go, the computer chokes and
   * gives a poor experience. The interval below phases out the work over
   * 25 * 200 milliseconds.
   */
  useInterval(intervalId => {
    if (blockIndexesToRender < 25) {
      setBlockIndexesToRender(blockIndexesToRender + 1);
    } else {
      clearInterval(intervalId);
    }
  }, 100);

  useEffect(() => {
    dispatch(thunks.requestBlockchainInfo(__NONCE__));
  }, []);

  const { blockchainInfo } = useRpcResponses();
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
    <div className={clsx(cn.explorer, ccn.topLevelComponent)}>
      <div className={clsx(cn.scrollableBlocksContainer)}>
        <div className={cn.blocksContainer}>
          {range(blockIndexesToRender).map(i => (
            <Block key={i} blockHeight={blockCount - i} />
          ))}
        </div>

        <div className={cn.moat} />
      </div>
      <Switch>
        <Route path={`${match.path}/:blockSearchQuery`}>
          <BlockDetails />
        </Route>
      </Switch>
    </div>
  );
};

export const Explorer = Explorer_;
