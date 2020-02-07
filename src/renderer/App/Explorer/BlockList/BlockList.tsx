import * as actions from "_r/redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useInterval } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { last } from "_r/utils/smallUtils";
import { Block } from "./Block";
import { useBlockListStyles } from "./BlockListStyles";

export const ListOfBlocks: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.requestBlockchainInfo(__NONCE__));
  }, []);

  const { blockHeight } = useParams();
  const maxHeight = useSelector(s => s.rpcResponses.blockchainInfo?.blocks);
  const history = useHistory();
  const selectedExplorerBlock = useSelector(s => s.misc.selectedExplorerBlock);

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
        if (maxHeight) {
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

  const explorerBlockList = useSelector(s => s.misc.explorerBlockList);
  const [allBlocksLoaded, setAllBlocksLoaded] = useState(false);

  /**
   * Use interval here to increment the number of blocks to render because
   * if we try to render all the blocks in one go, the computer chokes and
   * gives a poor experience. The interval below phases out the work.
   */
  useInterval(intervalId => {
    if (explorerBlockList && explorerBlockList.length >= 21) {
      setAllBlocksLoaded(true);
      clearInterval(intervalId);
    } else if (selectedExplorerBlock) {
      const nextBlockHeight = explorerBlockList
        ? last(explorerBlockList).height - 1
        : selectedExplorerBlock.height;

      dispatch(thunks.addBlockToExplorerBlockList(__NONCE__, nextBlockHeight));
    }
  }, 100);

  const cn = useBlockListStyles();

  return (
    <div
      className={cn.scrollableBlocksContainer}
      data-testid="scrollable-blocks-container"
    >
      <div className={cn.blocksContainer}>
        {explorerBlockList?.map(i => {
          return <Block isReady={allBlocksLoaded} key={i.hash} data={i} />;
        })}
      </div>
      <div />
    </div>
  );
};
