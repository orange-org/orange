import { Typography, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as thunks from "_r/redux/thunks";
import {
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
  useAtomicCss,
} from "_r/useAtomicCss";
import { poll } from "_r/utils/poll";
import { testIds } from "_tu/testIds";
import { Block } from "./Block";

const BLOCK_HORIZONTAL_MARGIN = 5;
const BLOCK_SCROLLABLE_CONTAINER = BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH - 5;

export const BLOCK_AVAILABLE_WIDTH =
  BLOCK_SCROLLABLE_CONTAINER - BLOCK_HORIZONTAL_MARGIN * 2;

export const BlockList: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const a = useAtomicCss();
  const { blockHeightAsId } = useParams();
  const totalNumberOfBlocks = useSelector(
    state => state.blockchainInfo?.blocks,
  );
  const explorerBlockList = useSelector(s => s.explorerBlockList);

  useEffect(() => {
    const pollHandler = poll(() => {
      dispatch(thunks.requestBlockchainInfo(__NONCE__, 4000));
    }, 5000);

    pollHandler.start();

    return pollHandler.stop;
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      thunks.populateBlockList(__NONCE__, parseInt(blockHeightAsId!, 10)),
    );
  }, [blockHeightAsId, dispatch]);

  return (
    <div
      style={{
        gridTemplateColumns: `${theme.spacing(
          BLOCK_SCROLLABLE_CONTAINER,
        )}px auto`,
      }}
      className={a(
        "displayGrid",
        "overflowYScroll",
        "overflowXHidden",
        "scrollbarWidth0",
      )}
      data-testid={testIds.scrollableBlockContainer}
    >
      <div className={a("marginY10", "marginX05")}>
        <Typography>2,000 higher blocks</Typography>

        {explorerBlockList?.map(block => (
          <Block key={block.hash} data={block} />
        ))}
      </div>
      <div />
    </div>
  );
};
