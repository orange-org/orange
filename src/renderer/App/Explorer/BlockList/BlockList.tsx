import { Link, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import * as actions from "_r/redux/actions";
import * as thunks from "_r/redux/thunks";
import {
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
  useAtomicCss,
} from "_r/useAtomicCss";
import { poll } from "_r/utils/poll";
import { pluralize } from "_r/utils/smallUtils";
import { testIds } from "_tu/testIds";
import { dummyBlockList } from "../common/dummyBlockData";
import { Block, useChainLinkStyles } from "./Block/Block";
import { Mempool } from "./Mempool/Mempool";

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

  const isLoading =
    !explorerBlockList ||
    explorerBlockList.every(
      block => block.height !== Number(blockHeightAsId),
    ) ||
    !totalHeight;

  const Typography = useLoadingAwareTypography(isLoading);

  const getDepthTopLink = () => {
    let content: JSX.Element;

    if (isLoading) {
      content = <>This is still loading</>;
    } else {
      const depthTop = totalHeight! - explorerBlockList![0].height;

      if (depthTop > 0) {
        content = (
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
        );
      } else {
        content = <>Top of the block chain</>;
      }
    }

    return (
      <Typography
        className={a("colorTextPrimary70%Opaque")}
        data-testid={testIds.depthTopLink}
      >
        {content}
      </Typography>
    );
  };

  const getDepthBottomLink = () => {
    let content: JSX.Element;

    if (isLoading) {
      content = <>This is still loading</>;
    } else {
      const depthBottom = explorerBlockList![explorerBlockList!.length - 1]
        .height;

      if (depthBottom > 0) {
        content = (
          <>
            There {pluralize(depthBottom, "is", "are")}{" "}
            <span className={a("fontWeight500")}>
              {depthBottom.toLocaleString()}
            </span>{" "}
            lower {pluralize(depthBottom, "block", "blocks")}
          </>
        );
      } else {
        content = <>Genesis of the block chain</>;
      }
    }

    return (
      <>
        <Typography
          data-testid={testIds.depthBottomLink}
          className={a("colorTextPrimary70%Opaque")}
        >
          {content}
        </Typography>

        <Typography className={a("colorTextPrimary70%Opaque")}>
          <Link
            data-testid={testIds.depthBottomLinkSearchButton}
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

  const blockList = explorerBlockList || dummyBlockList;

  return (
    <>
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
        <div className={a("marginX05", "marginY05")}>
          <Mempool />

          <div className={a("marginTop05")}>{getDepthTopLink()}</div>

          <div className={a("marginTop02")} />

          {blockList.map(block => (
            <Block
              isBlockListLoading={isLoading}
              key={block.hash}
              data={block}
            />
          ))}

          <div className={chainLinkStyles.class}>
            <div className={a("marginTop02")}>{getDepthBottomLink()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
