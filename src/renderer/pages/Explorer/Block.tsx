/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, ReactText, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, matchPath, useLocation, useRouteMatch } from "react-router-dom";
import { getLoadingAwareTypography } from "_r/components/getLoadingAwareTypography";
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

const Block_: React.FC<CardProps & {
  blockHeight: number;
}> = props_ => {
  const { blockHeight, ...props } = props_;

  const cn = useBlockStyles();
  const dispatch = useDispatch();
  const [blockData, setBlockData] = useState<TBlock | null>(null);
  const match = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    const requestData = async () => {
      setBlockData(
        await dispatch(thunks.requestBlockByHeight(__NONCE__, blockHeight)),
      );
    };

    requestData();
  }, [blockHeight]);

  const toPath = `${match.url}/${blockData?.hash}`;
  const isActive = matchPath(location.pathname, toPath);

  const Typography = getLoadingAwareTypography({
    width: 100,
    active: !blockData,
  });
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
                #{blockData?.height.toLocaleString()}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" className={cn.date}>
                {blockData?.time && formatDate(blockData.time * 1000)}
              </Typography>
            </div>
          </div>
          <div className={cn.metaData}>
            {renderMetaDataItem(
              QueryBuilder,
              blockData?.time && fromNow(blockData.time * 1000),
            )}
            {renderMetaDataItem(
              SaveOutlined,
              blockData?.size && humanFileSize(blockData.size),
            )}
            {renderMetaDataItem(Repeat, blockData?.nTx.toLocaleString())}
            {/* {renderMetaDataItem(
          EvStationOutlined,
          blockData?.difficulty &&
            convertDifficultyToGpuTime(blockData.difficulty),
        )} */}
          </div>
          <div className={cn.hash}>
            <Typography variant="body2" className={cn.hashText}>
              {blockData?.hash}
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
