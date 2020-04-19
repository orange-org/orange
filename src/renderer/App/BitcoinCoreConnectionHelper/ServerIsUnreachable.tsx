import { Link } from "react-router-dom";
import React from "react";
import {
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
  DialogActions,
  Button,
} from "@material-ui/core";
import { productName } from "_r/../../package.json";
import { useAtomicCss, AtomicCssKeysArray } from "_r/useAtomicCss";
import { BitcoinCoreConnectionStatus } from "_r/App/components/BitcoinCoreConnectionStatus/BitcoinCoreConnectionStatus";

export const ServerIsUnreachable: React.FC<{ onClose: any }> = props => {
  const a = useAtomicCss();
  const helperTextClasses: AtomicCssKeysArray = [
    "colorPrimaryFade50%",
    "fontSize0.8Rem",
    "marginTop01",
  ];

  return (
    <>
      <DialogTitle>{productName} could not reach Bitcoin Core</DialogTitle>
      <DialogContent>
        <Typography variant="h4">Is Bitcoin Core running?</Typography>

        <div className={a("marginTop05")}>
          <BitcoinCoreConnectionStatus />
        </div>

        <Typography className={a(...helperTextClasses)}>
          The status should automatically change to &quot;connected&quot; when
          you start Bitcoin Core and Orange is able to communicate with it. If
          it doesn&apos;t, try entering the server details manually.
        </Typography>
      </DialogContent>
    </>
  );
};
