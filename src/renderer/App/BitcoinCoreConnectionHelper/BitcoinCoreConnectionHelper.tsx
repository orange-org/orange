import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  makeStyles,
  CircularProgress,
  Button,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { useAtomicCss, AtomicCssKeysArray } from "_r/useAtomicCss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { hasBitcoinCoreConnectionIssue } from "_r/redux/selectors";
import { productName } from "_r/../../package.json";

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
}));

export const BitcoinCoreConnectionHelper = () => {
  const s = useStyles();
  const hasBitcoinCoreConnectionIssue_ = useSelector(
    hasBitcoinCoreConnectionIssue,
  );
  const bitcoinCoreConnectionIssue = useSelector(
    state => state.bitcoinCoreConnectionIssue,
  );
  const a = useAtomicCss();
  const helperTextClasses: AtomicCssKeysArray = [
    "colorPrimaryFade50%",
    "fontSize0.8Rem",
    "marginTop01",
  ];

  if (!hasBitcoinCoreConnectionIssue_) {
    return null;
  }

  return (
    <Dialog
      open
      BackdropProps={{
        classes: { root: s.root },
      }}
    >
      <DialogContent>
        <DialogTitle>{productName} could not reach Bitcoin Core</DialogTitle>

        <DialogContent>
          {!bitcoinCoreConnectionIssue.isServerReachable && (
            <Typography variant="h4">Is Bitcoin Core running?</Typography>
          )}

          <div className={a("displayFlex", "alignItemsCenter", "marginTop05")}>
            <Typography variant="h5">
              Connection status: attempting to connect
            </Typography>

            <CircularProgress
              color="secondary"
              size={15}
              className={a("marginLeft02")}
            />
          </div>

          <Typography className={a(...helperTextClasses)}>
            The status should automatically change to &quot;connected&quot; when
            you start Bitcoin Core and Orange is able to communicate with it. If
            it doesn&apos;t, try entering the server details manually.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            component={Link}
            to="/settings"
            variant="outlined"
            className={a("marginTop05", "marginLeftAuto")}
          >
            Enter the server details manually
          </Button>
        </DialogActions>

        {/* <div className={a("marginTop05")} /> */}
      </DialogContent>
    </Dialog>
  );
};
