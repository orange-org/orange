import { Dialog, Typography } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import { useSelector } from "react-redux";
import * as selectors from "_r/redux/selectors";
import { useStyles } from "./ShutdownDialogStyles";

export const ShutdownDialog: React.FC = () => {
  const isShuttingDown = useSelector(selectors.isShuttingDown);
  const s = useStyles();

  // const [flag, setFlag] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setFlag(true);
  //   }, 200);
  // }, []);

  return (
    <Dialog open={isShuttingDown}>
      <div className={s.root}>
        <div>
          <PowerSettingsNewIcon fontSize="large" />
        </div>
        <div className={s.shutdownWarningText}>
          <Typography variant="h6">Orange is shutting down</Typography>

          <Typography>
            Do not shut down the computer until this window disappears.
          </Typography>
        </div>
      </div>
    </Dialog>
  );
};
