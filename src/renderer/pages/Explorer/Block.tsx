/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, Typography } from "@material-ui/core";
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
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { Null } from "_t/typeHelpers";
import { useStyles } from "./BlockStyles";

const Row: React.FC<{ name: string; value: string | Null }> = props => {
  const ccn = useCommonStyles();

  return (
    <div className={ccn.displayTableRow}>
      {/* <div className={ccn.displayTableCell}>
        <Typography>{props.name}</Typography>
      </div> */}
      <div className={ccn.displayTableCell}>{props.value || "N/A"}</div>
    </div>
  );
};

export const Block: React.FC<CardProps & { blockHeight: number }> = props_ => {
  const { blockHeight, ...props } = props_;

  const ccn = useCommonStyles();
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

  return (
    <Box className={cn.root}>
      <Card {...props} className={cn.blockContainer}>
        <div className={cn.topRow}>
          <div className={cn.height}>
            <Typography variant="h3">#1,284,000</Typography>
          </div>
          <div>
            <Typography variant="body2" className={cn.date}>
              Thu, Jan 9, 2020 2:43 PM
            </Typography>
          </div>
        </div>

        <div className={cn.metaData}>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <QueryBuilder fontSize="small" />
            </div>
            <div className={cn.value}>7 mins ago</div>
          </div>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <SaveOutlined fontSize="small" />
            </div>
            <div className={cn.value}>256 Kb</div>
          </div>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <Repeat fontSize="small" />
            </div>
            <div className={cn.value}>2,458</div>
          </div>
          <div className={cn.metaDataItem}>
            <div className={cn.icon}>
              <EvStationOutlined fontSize="small" />
            </div>
            <div className={cn.value}>7 years</div>
          </div>
        </div>

        <div className={cn.hash}>3fja934cam39fjacjs39s...</div>
      </Card>
    </Box>
  );
};
