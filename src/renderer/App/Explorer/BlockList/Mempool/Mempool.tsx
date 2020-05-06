import {
  lighten,
  LinearProgress,
  Paper,
  Typography,
  withStyles,
  Tooltip,
} from "@material-ui/core";
import {
  BubbleChartOutlined,
  ConfirmationNumberOutlined,
  PersonOutlined,
  Repeat,
  SaveOutlined,
} from "@material-ui/icons";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
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

export const Mempool = () => {
  const a = useAtomicCss();

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
          text="2,000"
          tooltipTitle="Pending transactions"
        />
        <MetaDataItem
          icon={SaveOutlined}
          text="1.5 MB"
          tooltipTitle="Required block space"
        />
        <MetaDataItem
          icon={ConfirmationNumberOutlined}
          text="1,000 sat/kB"
          tooltipTitle="Computed minimum fee"
        />
        <MetaDataItem
          icon={PersonOutlined}
          text="1,000 sat/kB"
          tooltipTitle="Your configured minimum fee"
        />
      </MetaDataItemsContainer>

      <div className={a("padding1")}>
        <Tooltip
          arrow
          placement="right-start"
          title="Local memory usage: 2.3 / 300 MB"
        >
          <BorderLinearProgress
            className={a("marginTop02")}
            variant="determinate"
            color="secondary"
            value={50}
          />
        </Tooltip>
      </div>
    </Paper>
  );
};
