import { makeStyles } from "@material-ui/core";
import { blue, blueGrey, grey } from "@material-ui/core/colors";

export const useExplorerStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    boxSizing: "border-box",
  },

  blocksContainer: {
    marginRight: "-1px", // This allows the block chain to overlap with block details
    height: "100vh",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "0px", // Remove scroll bar
    },
  },

  blocksInnerContainer: {
    margin: `${theme.spacing(30)}px ${theme.spacing(5)}px`,
    width: "270px",
  },

  overflowHidden: {
    overflow: "hidden",
  },
}));
