/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, ReactText, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, matchPath, useLocation, useRouteMatch } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { humanFileSize } from "_r/utils/humanFileSize";
import {
  // convertDifficultyToGpuTime,
  formatDate,
  fromNow,
} from "_r/utils/smallUtils";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { Null } from "_t/typeHelpers";
import { useBlockStyles } from "./BlockStyles";
import { withDelay } from "_r/utils/withDelay";

type BlockSummary = Pick<TBlock, "hash" | "height" | "nTx" | "size" | "time">;

const dummyBlockData: BlockSummary = {
  hash: "00000000000000f0afbb3aa5fde12a7f58d71c79251a30a156e98ed17b232327",
  height: 1664689,
  nTx: 215,
  size: 96231,
  time: 1580651635,
};

const Block_: React.FC<CardProps & {
  blockHeight: number;
}> = props_ => {
  const { blockHeight, ...props } = props_;

  const cn = useBlockStyles();
  const dispatch = useDispatch();
  const [blockData, setBlockData] = useState<BlockSummary>(dummyBlockData);
  const match = useRouteMatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestData = async () => {
      setBlockData(dummyBlockData);
      setIsLoading(true);

      const blockData_ = await withDelay(
        dispatch(thunks.requestBlockByHeight(__NONCE__, blockHeight)),
        100,
      );

      setBlockData(blockData_);
      setIsLoading(false);
    };

    requestData();
  }, [blockHeight]);

  const toPath = `${match.url}/${blockData.hash}`;
  const isActive = matchPath(location.pathname, toPath);

  const Typography = useLoadingAwareTypography(isLoading);

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
    <Box className={cn.root}>
      <Link to={toPath}>
        <Card
          {...props}
          variant="elevation"
          className={clsx(cn.blockContainer, { [cn.activeCard]: isActive })}
        >
          <div className={cn.topRow}>
            <div className={cn.height}>
              <Typography variant="h3">
                #{blockData.height.toLocaleString()}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" className={cn.date}>
                {blockData.time && formatDate(blockData.time * 1000)}
              </Typography>
            </div>
          </div>
          <div className={cn.metaData}>
            {renderMetaDataItem(
              QueryBuilder,
              blockData.time && fromNow(blockData.time * 1000),
            )}
            {renderMetaDataItem(
              SaveOutlined,
              blockData.size && humanFileSize(blockData.size),
            )}
            {renderMetaDataItem(Repeat, blockData.nTx.toLocaleString())}
            {/* {renderMetaDataItem(
          EvStationOutlined,
          blockData.difficulty &&
            convertDifficultyToGpuTime(blockData.difficulty),
        )} */}
          </div>
          <div className={cn.hash}>
            <Typography variant="body2" className={cn.hashText}>
              {blockData.hash}
            </Typography>
          </div>
        </Card>
      </Link>
    </Box>
  );
};

export const Block = memo(
  Block_,
  (p1, p2) => p1.blockHeight === p2.blockHeight,
);
