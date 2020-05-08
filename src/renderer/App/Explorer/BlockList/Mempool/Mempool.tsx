import {
  lighten,
  LinearProgress,
  Paper,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import {
  BubbleChartOutlined,
  ComputerOutlined,
  PersonOutlined,
  Repeat,
  SaveOutlined,
} from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoadingAwareTypography } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { useAtomicCss } from "_r/useAtomicCss";
import { poll } from "_r/utils/poll";
import { convertBitcoinToSatoshi, humanFileSize } from "_r/utils/smallUtils";
import { MempoolInfo } from "_t/RpcResponses";
import { MetaDataItem } from "../common/MetaDataItem";
import { MetaDataItemsContainer } from "../common/MetaDataItemsContainer";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: theme.spacing(2),
    backgroundColor: lighten(theme.palette.secondary.main, 0.6),
  },

  bar: {
    backgroundColor: lighten(theme.palette.secondary.main, 0.3),
  },
}))(LinearProgress);

const dummyMempoolData: MempoolInfo = {
  loaded: true,
  size: 1300,
  bytes: 4100,
  usage: 0,
  maxmempool: 300000,
  mempoolminfee: 0.000001,
  minrelaytxfee: 0.000001,
};

export const Mempool = () => {
  const a = useAtomicCss();
  const dispatch = useDispatch();

  useEffect(() => {
    const pollHandler = poll(async () => {
      await dispatch(thunks.requestMempoolInfo(__NONCE__, 4000));
    }, 5000);

    pollHandler.start();

    return pollHandler.stop;
  }, [dispatch]);

  const mempoolInfo = useSelector(state => state.mempoolInfo);
  const isLoading = !mempoolInfo;

  const Typography = useLoadingAwareTypography(isLoading);

  const data = isLoading ? dummyMempoolData : mempoolInfo;

  return (
    <Paper
      variant="outlined"
      className={a("padding2", "backgroundColorPaper90%Opaque")}
    >
      <div className={a("colorSecondary", "displayFlex", "alignItemsCenter")}>
        <BubbleChartOutlined fontSize="small" />
        <Typography
          variant="h5"
          className={a("lineHeightNormal", "marginLeft01")}
        >
          Mempool
        </Typography>
      </div>

      <MetaDataItemsContainer>
        <MetaDataItem
          icon={Repeat}
          text={data!.size.toLocaleString()}
          tooltipTitle="Pending transactions"
          isLoading={isLoading}
        />
        <MetaDataItem
          icon={SaveOutlined}
          text={humanFileSize(data!.bytes)}
          tooltipTitle="Required block space"
          isLoading={isLoading}
        />
        <MetaDataItem
          icon={ComputerOutlined}
          text={`${convertBitcoinToSatoshi(
            data!.mempoolminfee,
          ).toLocaleString()} sat/kB`}
          tooltipTitle="Computed minimum fee"
          isLoading={isLoading}
        />
        <MetaDataItem
          icon={PersonOutlined}
          text={`${convertBitcoinToSatoshi(
            data!.minrelaytxfee,
          ).toLocaleString()} sat/kB`}
          tooltipTitle="Your configured minimum fee"
          isLoading={isLoading}
        />
      </MetaDataItemsContainer>

      <div className={a("padding1")}>
        <Tooltip
          arrow
          placement="right-start"
          title={`Local memory usage: ${humanFileSize(
            data!.usage,
          )} / ${humanFileSize(data!.maxmempool)}`}
        >
          <BorderLinearProgress
            className={a("marginTop02")}
            variant="determinate"
            color="secondary"
            value={(data!.usage / data!.maxmempool) * 100}
          />
        </Tooltip>
      </div>
    </Paper>
  );
};
