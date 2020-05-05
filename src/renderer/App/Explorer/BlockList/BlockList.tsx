import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as thunks from "_r/redux/thunks";
import { useTheme } from "@material-ui/core";
import {
  useAtomicCss,
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
} from "_r/useAtomicCss";
import { testIds } from "_tu/testIds";
import { TimeoutId } from "_t/typeHelpers";
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
  const explorerBlockList = useSelector(s => s.explorerBlockList);
  const selectedBlock = useSelector(s => s.selectedExplorerBlock);

  useEffect(() => {
    let timeoutId: TimeoutId;

    if (
      explorerBlockList?.length &&
      explorerBlockList.length === 20 &&
      selectedBlock
    ) {
      timeoutId = setTimeout(() => {
        const selectedBlockElement = document.getElementById(
          `blockListBlock-${selectedBlock.height}`,
        );

        selectedBlockElement?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explorerBlockList?.[0]?.hash, selectedBlock?.hash]);

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
      data-testid={testIds.scrollableBlockContainer}
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
