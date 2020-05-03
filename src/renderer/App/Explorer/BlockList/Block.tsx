/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon } from "@material-ui/core";
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
import { Null } from "_t/typeHelpers";
import { testIds } from "_tu/testIds";
import { useBlockStyles } from "./BlockStyles";

const Block_: React.FC<CardProps & {
  data: TBlock;
}> = props_ => {
  const { data, ...props } = props_;

  const classNames = useBlockStyles();
  const scrollIntoViewElement = useRef<HTMLDivElement>(null);
  const { blockHeightAsId } = useParams();

  const isActive = blockHeightAsId === data.height.toString();

  useEffect(() => {
    if (isActive) {
      scrollIntoViewElement.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [blockHeightAsId, isActive]);

  const Typography = useLoadingAwareTypography(false);

  const renderMetaDataItem = (Icon: typeof SvgIcon, text: ReactText | Null) => (
    <div className={classNames.metaDataItem}>
      <div className={classNames.icon}>
        <Icon fontSize="small" />
      </div>
      <div className={classNames.value}>
        <Typography>{text}</Typography>
      </div>
    </div>
  );

  return (
    <Box className={classNames.root} data-testid={testIds.blockListBlock}>
      <Card
        {...props}
        variant="elevation"
        className={clsx(classNames.blockContainer, {
          [classNames.activeCard]: isActive,
        })}
      >
        {/**
         * CSS is used to give this element a size that extends slightly
         * from the top and bottom of its parent. That way when it is
         * scrolled into view it adds a little bit of padding, instead
         * of having the scrolling be touching the border, which doesn't
         * look good.
         */}
        <div
          ref={scrollIntoViewElement}
          className={classNames.scrollIntoView}
        />
        <Link
          to={`/explorer/${data.height.toString()}`}
          className={classNames.link}
        >
          Link to block {data.height.toString()}
        </Link>
        <div className={classNames.topRow}>
          <div className={classNames.height}>
            <Typography variant="h3">
              #{data.height.toLocaleString()}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" className={classNames.date}>
              {data.time && secondsTimestampToFormattedDate(data.time)}
            </Typography>
          </div>
        </div>
        <div className={classNames.metaData}>
          {renderMetaDataItem(QueryBuilder, data.time && fromNow(data.time))}
          {renderMetaDataItem(
            SaveOutlined,
            data.size && humanFileSize(data.size),
          )}
          {renderMetaDataItem(Repeat, data.nTx.toLocaleString())}
        </div>
        <div className={classNames.hash}>
          <Typography variant="body2" className={classNames.hashText}>
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
