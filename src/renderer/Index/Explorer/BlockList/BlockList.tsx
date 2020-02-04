import range from "lodash.range";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval, useRpcResponses } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { Block } from "./Block";
import { useParams, useHistory } from "react-router-dom";
import { rpcClient } from "_r/rpcClient/rpcClient";
import * as actions from "_r/redux/actions";
import { last } from "_r/utils/smallUtils";

export const ListOfBlocks: React.FC = () => {
  const dispatch = useDispatch();
  const { blockHeight } = useParams();
  const selectedExplorerBlock = useSelector(s => s.misc.selectedExplorerBlock);
  const explorerBlockList = useSelector(s => s.misc.explorerBlockList);
  const maxHeight = useSelector(s => s.rpcResponses.blockchainInfo?.blocks);
  const history = useHistory();
  const [allBlocksLoaded, setAllBlocksLoaded] = useState(false);

  useEffect(() => {
    const request = async () => {
      /**
       * We are trying to determine which range of blocks to display. This is
       * driven by the `blockHash` routing parameter. When this component
       * renders for the first time, the `blockHash` routing parameter is
       * missing. In that case, we want to set `blockHash` to the
       * `bestBlockHash` in the blockchain. But the best block hash could also
       * be missing. When it is missing, we request it and set it in the store
       * which triggers a re-render. In the re-render, it should be available
       * and it would be used to request the block.
       *
       * If we start with `blockHash` being available, such as when the user
       * navigates to this page knowing what `blockHash` they are looking for,
       * we simply grab that block and set it as selected.
       */
      if (blockHeight === "top") {
        if (!maxHeight) {
          dispatch(thunks.requestBlockchainInfo(__NONCE__));
        } else {
          const highestBlock = await dispatch(
            thunks.requestBlockByHeight(__NONCE__, maxHeight),
          );

          history.push(highestBlock.height.toString());
        }
      } else if (blockHeight !== selectedExplorerBlock?.height) {
        dispatch(
          thunks.setSelectedExplorerBlock(
            __NONCE__,
            parseInt(blockHeight!, 10),
          ),
        );
      }
    };

    request();
  }, [blockHeight, maxHeight]);

  /**
   * Use interval here to increment the number of blocks to render because
   * if we try to render all the blocks in one go, the computer chokes and
   * gives a poor experience. The interval below phases out the work.
   */
  const minHeight = 0;
  useInterval(intervalId => {
    if (selectedExplorerBlock && maxHeight) {
      let newBlockHeight: number;

      if (!explorerBlockList) {
        const start = selectedExplorerBlock.height + 10;
        const end = selectedExplorerBlock.height - 10;
        const startExcess = Math.min(maxHeight - start, 0);
        const endExcess = Math.min(minHeight + end, 0);

        newBlockHeight = start + startExcess - endExcess;
      } else {
        newBlockHeight = last(explorerBlockList).height - 1;
      }

      dispatch(thunks.addBlockToExplorerBlockList(__NONCE__, newBlockHeight));

      if (explorerBlockList && explorerBlockList.length >= 21) {
        setAllBlocksLoaded(true);
        clearInterval(intervalId);
      }
    }
  }, 100);

  useEffect(() => {
    dispatch(thunks.requestBlockchainInfo(__NONCE__));
  }, []);

  if (!explorerBlockList) {
    return null;
  }

  return (
    <>
      {explorerBlockList.map(i => {
        return <Block isReady={allBlocksLoaded} key={i.hash} data={i} />;
      })}
    </>
  );
};
