import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as thunks from "_r/redux/thunks";
import { useTheme } from "@material-ui/core";
import {
  useAtomicCss,
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
} from "_r/useAtomicCss";
import { Block } from "./Block";

const BLOCK_HORIZONTAL_MARGIN = 5;
const BLOCK_SCROLLABLE_CONTAINER = BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH - 5;

export const BLOCK_AVAILABLE_WIDTH =
  BLOCK_SCROLLABLE_CONTAINER - BLOCK_HORIZONTAL_MARGIN * 2;

export const ListOfBlocks: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const a = useAtomicCss();
  const { blockHeightAsId } = useParams();

  console.log("=\nFILE: BlockList.tsx\nLINE: 24\n=");

  useEffect(() => {
    dispatch(
      thunks.populateBlockList(__NONCE__, parseInt(blockHeightAsId!, 10)),
    );
  }, [blockHeightAsId, dispatch]);

  const explorerBlockList = useSelector(s => s.explorerBlockList);

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
      data-testid="scrollable-blocks-container"
    >
      <div className={a("marginY10", "marginX05")}>
        {explorerBlockList?.map(block => (
          <Block key={block.hash} data={block} />
        ))}
      </div>
      <div />
    </div>
  );
};
