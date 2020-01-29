import { makeStyles } from "@material-ui/core";
import { blue, blueGrey, grey } from "@material-ui/core/colors";

export const useExplorerStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    boxSizing: "border-box",
  },

  blocksContainer: {
    maxHeight: "100vh",
  },

  blocksInnerContainer: {
    margin: `0 ${theme.spacing(5)}px`,
    maxWidth: "270px",
  },

  overflowHidden: {
    overflow: "hidden",
  },
}));
