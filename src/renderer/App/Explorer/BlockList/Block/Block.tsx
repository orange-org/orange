import { Box, Card, CardProps, makeStyles } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import { useAtomicCss } from "_r/useAtomicCss";
import {
  fromNow,
  humanFileSize,
  isDummyBlockData,
  secondsTimestampToFormattedDate,
} from "_r/utils/smallUtils";
import { Block as TBlock } from "_t/RpcResponses";
import { TimeoutId } from "_t/typeHelpers";
import { testIds } from "_tu/testIds";
import { MetaDataItem } from "../common/MetaDataItem";
import { MetaDataItemsContainer } from "../common/MetaDataItemsContainer";

export const useChainLinkStyles = makeStyles(theme => ({
  class: {
    "&::before": {
      width: "20px",
      marginBottom: "-4px", // This is to compensate for an added margin of unknown source
      marginLeft: theme.spacing(10),
      borderLeft: `3px dashed ${theme.palette.secondary.main}`,
      height: theme.spacing(4),
      display: "inline-block",
      content: "''",
    },
  },
}));

const Block_: React.FC<CardProps & {
  data: TBlock;
  isBlockListLoading: boolean;
}> = props_ => {
  const { data, isBlockListLoading, ...props } = props_;

  if (data.nTx === undefined) {
    console.log("data", data);
  }

  const a = useAtomicCss();
  const classNames = useChainLinkStyles();
  const scrollIntoViewElement = useRef<HTMLDivElement>(null);
  const { blockHeightAsId } = useParams();

  const isActive = blockHeightAsId === data.height.toString();

  useEffect(() => {
    let timeoutId: TimeoutId;

    if (isActive) {
      /**
       * Wait for all the elements in the block list to be painted by the
       * browser. I couldn't find a more sophisticated way to know when the
       * painting operation has completed, so I'm using `setTimeout`, like
       * a peasant...
       */
      timeoutId = setTimeout(() => {
        scrollIntoViewElement.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [blockHeightAsId, isActive]);

  const isLoading = isDummyBlockData(data.merkleroot) || isBlockListLoading;

  const Typography = useLoadingAwareTypography(isLoading);

  return (
    <Box
      className={classNames.class}
      data-testid={isLoading ? "" : testIds.blockListBlock}
    >
      <Card
        {...props}
        variant="elevation"
        className={clsx(
          a("padding2", "borderRadius0", "positionRelative", "overflowVisible"),
          {
            [a("marginLeft08", "marginRightNegative08")]: isActive,
          },
        )}
      >
        {/**
         * CSS is used to give this element a size that extends somewhat
         * from the top and bottom of its parent. That way when it is
         * scrolled into view it adds a little bit of padding, instead
         * of having the scrolling be touching the border, which doesn't
         * look good.
         */}
        <div
          ref={scrollIntoViewElement}
          className={a(
            "positionAbsolute",
            "left0",
            "right0",
            "topNegative10",
            "bottomNegative10",
            "pointerEventsNone",
          )}
        />
        <Link
          to={`/explorer/${data.height.toString()}`}
          className={a(
            "positionAbsolute",
            "top0",
            "bottom0",
            "left0",
            "right0",
            "colorTransparent",
          )}
        >
          Link to block {data.height.toString()}
        </Link>
        <div className={a("displayFlex", "alignItemsCenter")}>
          <div className={a("colorSecondary")}>
            <Typography variant="h3">
              #{data.height.toLocaleString()}
            </Typography>
          </div>
          <div>
            <Typography
              variant="body2"
              className={a("fontSize95%", "colorHint", "marginLeft02")}
            >
              {data.time && secondsTimestampToFormattedDate(data.time)}
            </Typography>
          </div>
        </div>

        <MetaDataItemsContainer>
          <MetaDataItem
            icon={QueryBuilder}
            text={data.time && fromNow(data.time)}
            otherClasses={["width100%"]}
            isLoading={isLoading}
          />
          <MetaDataItem
            icon={Repeat}
            text={data.nTx.toLocaleString()}
            isLoading={isLoading}
          />
          <MetaDataItem
            icon={SaveOutlined}
            text={data.size && humanFileSize(data.size)}
            isLoading={isLoading}
          />
        </MetaDataItemsContainer>

        <div className={a("marginTop05", "colorHint")}>
          <Typography
            variant="body2"
            className={a(
              "textOverflowEllipsis",
              "directionRtl",
              "overflowHidden",
              "width40",
              "whiteSpaceNoWrap",
            )}
          >
            {data.hash}
          </Typography>
        </div>
      </Card>
    </Box>
  );
};

export const Block = memo(
  Block_,
  /* istanbul ignore next */
  (p1, p2) =>
    p1.data.height === p2.data.height &&
    p1.isBlockListLoading === p2.isBlockListLoading,
);
