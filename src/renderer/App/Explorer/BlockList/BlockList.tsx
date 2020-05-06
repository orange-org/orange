import { Link, Typography, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Backdrop } from "_r/App/components/Backdrop/Backdrop";
import * as actions from "_r/redux/actions";
import * as thunks from "_r/redux/thunks";
import {
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
  useAtomicCss,
} from "_r/useAtomicCss";
import { poll } from "_r/utils/poll";
import { pluralize } from "_r/utils/smallUtils";
import { testIds } from "_tu/testIds";
import { Block, useChainLinkStyles } from "./Block";

const BLOCK_HORIZONTAL_MARGIN = 5;
const BLOCK_SCROLLABLE_CONTAINER = BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH - 5;

export const BLOCK_AVAILABLE_WIDTH =
  BLOCK_SCROLLABLE_CONTAINER - BLOCK_HORIZONTAL_MARGIN * 2;

export const BlockList: React.FC = () => {
  const chainLinkStyles = useChainLinkStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const a = useAtomicCss();
  const { blockHeightAsId } = useParams();
  const totalHeight = useSelector(state => state.blockchainInfo?.blocks);
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

  const openBackdrop =
    !explorerBlockList ||
    explorerBlockList.every(block => block.height !== Number(blockHeightAsId));

  const getDepthTopLink = () => {
    if (!totalHeight || !explorerBlockList) {
      return null;
    }

    const depthTop = totalHeight - explorerBlockList[0].height;

    return (
      <Typography className={a("colorPrimary70%Opaque")}>
        {depthTop > 0 ? (
          <>
            There {pluralize(depthTop, "is", "are")}{" "}
            <Link
              component={ReactRouterLink}
              className={a("fontWeight500")}
              to={`/explorer/${totalHeight}`}
            >
              {depthTop.toLocaleString()} higher
            </Link>{" "}
            {pluralize(depthTop, "block", "blocks")}
          </>
        ) : (
          <>Top of the block chain</>
        )}
      </Typography>
    );
  };

  const getDepthBottomLink = () => {
    if (!totalHeight || !explorerBlockList) {
      return null;
    }

    const depthBottom =
      explorerBlockList[explorerBlockList.length - 1].height - 1;

    return (
      <>
        <Typography className={a("colorPrimary70%Opaque")}>
          {depthBottom > 0 ? (
            <>
              There {pluralize(depthBottom, "is", "are")}{" "}
              <span className={a("fontWeight500")}>
                {depthBottom.toLocaleString()}
              </span>{" "}
              lower {pluralize(depthBottom, "block", "blocks")}
            </>
          ) : (
            <>Genesis of the block chain</>
          )}
        </Typography>

        <Typography className={a("colorPrimary70%Opaque")}>
          <Link
            onClick={() => dispatch(actions.requestSearchBoxFocus(true))}
            className={a("fontWeight500")}
          >
            Search
          </Link>{" "}
          for a block
        </Typography>
      </>
    );
  };

  return (
    <>
      <Backdrop open={openBackdrop} />
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
          {getDepthTopLink()}

          <div className={a("marginTop02")} />

          {explorerBlockList?.map(block => (
            <Block key={block.hash} data={block} />
          ))}

          <div className={chainLinkStyles.class}>
            <div className={a("marginTop02")}>{getDepthBottomLink()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
