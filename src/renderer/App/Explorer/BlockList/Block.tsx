/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, ReactText, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import { formatDate, fromNow, humanFileSize } from "_r/utils/smallUtils";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { Null } from "_t/typeHelpers";
import { useBlockStyles } from "./BlockStyles";

const Block_: React.FC<CardProps & {
  data: TBlock;
}> = props_ => {
  const { data, ...props } = props_;

  const cn = useBlockStyles();
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
    <div className={cn.metaDataItem}>
      <div className={cn.icon}>
        <Icon fontSize="small" />
      </div>
      <div className={cn.value}>
        <Typography>{text}</Typography>
      </div>
    </div>
  );

  return (
    <Box className={cn.root} data-testid="blocklist-block">
      <Card
        {...props}
        variant="elevation"
        className={clsx(cn.blockContainer, { [cn.activeCard]: isActive })}
      >
        {/**
         * CSS is used to give this element a size that extends slightly
         * from the top and bottom of its parent. That way when it is
         * scrolled into view it adds a little bit of padding, instead
         * of having the scrolling be touching the border, which doesn't
         * look good.
         */}
        <div ref={scrollIntoViewElement} className={cn.scrollIntoView} />
        <Link to={data.height.toString()} className={cn.link}>
          Link to block {data.height.toString()}
        </Link>
        <div className={cn.topRow}>
          <div className={cn.height}>
            <Typography variant="h3">
              #{data.height.toLocaleString()}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" className={cn.date}>
              {data.time && formatDate(data.time * 1000)}
            </Typography>
          </div>
        </div>
        <div className={cn.metaData}>
          {renderMetaDataItem(
            QueryBuilder,
            data.time && fromNow(data.time * 1000),
          )}
          {renderMetaDataItem(
            SaveOutlined,
            data.size && humanFileSize(data.size),
          )}
          {renderMetaDataItem(Repeat, data.nTx.toLocaleString())}
        </div>
        <div className={cn.hash}>
          <Typography variant="body2" className={cn.hashText}>
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
