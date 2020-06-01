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
import { Thunks } from "_r/redux/Thunks";
import { useAtomicCss } from "_r/useAtomicCss";
import { Poll } from "_r/utils/Poll";
import { Utils } from "_r/utils/Utils";
import { MempoolInfo } from "_t/RpcResponses";
import { featureFlags } from "_f/featureFlags";
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
    const poll = new Poll(async () => {
      await dispatch(Thunks.requestMempoolInfo(__NONCE__, 4000));
    }, 5000);

    poll.start();

    return poll.stop;
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
          text={Utils.humanFileSize(data!.bytes)}
          tooltipTitle="Required block space"
          isLoading={isLoading}
        />
        {featureFlags.useBcore ? (
          <>
            <MetaDataItem
              icon={ComputerOutlined}
              text={`${Utils.convertBitcoinToSatoshi(
                data!.mempoolminfee,
              ).toLocaleString()} sat/kB`}
              tooltipTitle="Computed minimum fee"
              isLoading={isLoading}
            />
            <MetaDataItem
              icon={PersonOutlined}
              text={`${Utils.convertBitcoinToSatoshi(
                data!.minrelaytxfee,
              ).toLocaleString()} sat/kB`}
              tooltipTitle="Your configured minimum fee"
              isLoading={isLoading}
            />
          </>
        ) : /* istanbul ignore next */ null}
      </MetaDataItemsContainer>

      <div className={a("padding1")}>
        <Tooltip
          arrow
          placement="right-start"
          title={`Local memory usage: ${Utils.humanFileSize(
            data!.usage,
          )} / ${Utils.humanFileSize(data!.maxmempool)}`}
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
