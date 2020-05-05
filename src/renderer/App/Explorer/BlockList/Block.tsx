/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon, makeStyles } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, ReactText, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import {
  secondsTimestampToFormattedDate,
  fromNow,
  humanFileSize,
} from "_r/utils/smallUtils";
import { Block as TBlock } from "_t/RpcResponses";
import { Null, TimeoutId } from "_t/typeHelpers";
import { testIds } from "_tu/testIds";
import { useAtomicCss } from "_r/useAtomicCss";

const useBlockStyles = makeStyles(theme => ({
  root: {
    "&::before": {
      width: "20px",
      marginBottom: "-4px", // This is to compensate for an added margin of unknown source
      marginLeft: theme.spacing(10),
      borderLeft: `3px dashed ${theme.palette.secondary.main}`,
      height: theme.spacing(4),
      display: "inline-block",
      content: "''",
    },

    "&:nth-child(1)::before": {
      display: "none",
    },
  },
}));

const Block_: React.FC<CardProps & {
  data: TBlock;
}> = props_ => {
  const { data, ...props } = props_;

  const a = useAtomicCss();
  const classNames = useBlockStyles();
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

  const Typography = useLoadingAwareTypography(false);

  const renderMetaDataItem = (Icon: typeof SvgIcon, text: ReactText | Null) => (
    <div
      className={a(
        "width100%",
        "displayFlex",
        "paddingTop2",
        "alignItemsCenter",
        "flexGrow0",
        "flexBasis50%",
      )}
    >
      <div className={a("lineHeight0", "colorHint")}>
        <Icon fontSize="small" />
      </div>
      <div className={a("marginLeft01")}>
        <Typography>{text}</Typography>
      </div>
    </div>
  );

  return (
    <Box className={classNames.root} data-testid={testIds.blockListBlock}>
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
        <div className={a("displayFlex", "flexWrapWrap", "marginTop02")}>
          {renderMetaDataItem(QueryBuilder, data.time && fromNow(data.time))}
          {renderMetaDataItem(
            SaveOutlined,
            data.size && humanFileSize(data.size),
          )}
          {renderMetaDataItem(Repeat, data.nTx.toLocaleString())}
        </div>
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
  (p1, p2) => p1.data.height === p2.data.height,
);
