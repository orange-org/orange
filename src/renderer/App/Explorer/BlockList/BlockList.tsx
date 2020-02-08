import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as thunks from "_r/redux/thunks";
import { Block } from "./Block";
import { useBlockListStyles } from "./BlockListStyles";

export const ListOfBlocks: React.FC = () => {
  const dispatch = useDispatch();

  const { blockHeight: selectedBlockHeight } = useParams();

  useEffect(() => {
    dispatch(
      thunks.populateBlockList(__NONCE__, parseInt(selectedBlockHeight!, 10)),
    );
  }, [selectedBlockHeight]);

  const explorerBlockList = useSelector(s => s.misc.explorerBlockList);

  const cn = useBlockListStyles();

  return (
    <div
      className={cn.scrollableBlocksContainer}
      data-testid="scrollable-blocks-container"
    >
      <div className={cn.blocksContainer}>
        {explorerBlockList?.map(i => {
          return <Block isReady={false} key={i.hash} data={i} />;
        })}
      </div>
      <div />
    </div>
  );
};
