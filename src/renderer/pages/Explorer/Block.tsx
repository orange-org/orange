/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps } from "@material-ui/core";
import {
  EvStationOutlined,
  QueryBuilder,
  Repeat,
  SaveOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCommonStyles } from "_r/commonStyles";
import * as thunks from "_r/redux/thunks";
import { humanFileSize } from "_r/utils/humanFileSize";
import {
  convertDifficultyToGpuTime,
  formatDate,
  fromNow,
} from "_r/utils/smallUtils";
import { Typography } from "_r/components/Typography";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { useStyles } from "./BlockStyles";

export const Block: React.FC<CardProps & { blockHeight: number }> = props_ => {
  const { blockHeight, ...props } = props_;

  const cn = useStyles();
  const dispatch = useDispatch();
  const [blockData, setBlockData] = useState<TBlock | null>(null);

  useEffect(() => {
    const requestData = async () => {
      setBlockData(
        await dispatch(thunks.requestBlockByHeight(__NONCE__, blockHeight)),
      );
    };

    requestData();
  }, [blockHeight]);

  const isLoading = () => ({ width: 100, active: !blockData });

  return (
    <Box className={cn.root}>
      <Card {...props} className={cn.blockContainer}>
        <div className={cn.topRow}>
          <div className={cn.height}>
            <Typography variant="h3" isLoading={isLoading()}>
              #{blockData?.height.toLocaleString()}
            </Typography>
          </div>
          <div>
            <Typography
              variant="body2"
              className={cn.date}
              isLoading={isLoading()}
            >
              {blockData?.time && formatDate(blockData.time * 1000)}
            </Typography>
          </div>
        </div>

        <div className={cn.metaData}>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <QueryBuilder fontSize="small" />
            </div>
            <div className={cn.value}>
              <Typography isLoading={isLoading()}>
                {blockData?.time && fromNow(blockData.time * 1000)}
              </Typography>
            </div>
          </div>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <SaveOutlined fontSize="small" />
            </div>
            <div className={cn.value}>
              <Typography isLoading={isLoading()}>
                {blockData?.size && humanFileSize(blockData.size)}
              </Typography>
            </div>
          </div>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <Repeat fontSize="small" />
            </div>
            <div className={cn.value}>
              <Typography isLoading={isLoading()}>
                {blockData?.nTx.toLocaleString()}
              </Typography>
            </div>
          </div>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <EvStationOutlined fontSize="small" />
            </div>
            <div className={cn.value}>
              <Typography isLoading={isLoading()}>
                {blockData?.difficulty &&
                  convertDifficultyToGpuTime(blockData.difficulty)}
              </Typography>
            </div>
          </div>
        </div>

        <div className={cn.hash}>
          <Typography
            variant="body2"
            className={cn.hashText}
            isLoading={isLoading()}
          >
            {blockData?.hash}
          </Typography>
        </div>
      </Card>
    </Box>
  );
};
