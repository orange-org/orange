import { makeStyles } from "@material-ui/core";
import { blue, blueGrey, grey } from "@material-ui/core/colors";

export const useExplorerStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    boxSizing: "border-box",
  },

  blocksContainer: {
    // backgroundColor: "blue",
    flex: 0.2,
    maxHeight: "100vh",
  },

  blocksInnerContainer: {
    margin: `0 ${theme.spacing(5)}px`,
  },

  overflowHidden: {
    overflow: "hidden",
  },
}));

export const useBlockStyles = makeStyles(theme => ({
  block: {
    // marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    backgroundColor: blueGrey[100],
    borderRadius: 0,
    display: "flex",
  },

  blockContainer: {
    "&::before": {
      width: "20px",
      marginBottom: "-4px", // This is to compensate of an added margin of unknown source
      marginLeft: "16px",
      borderLeft: `3px dashed ${grey[300]}`,
      height: theme.spacing(4),
      display: "inline-block",
      content: "''",
    },

    "&:nth-child(1)::before": {
      display: "none",
    },

    // "&:nth-child(odd)::before": {
    //   marginLeft: "32px",
    // },
  },

  blockNumber: {
    color: grey[600],
  },

  blockType: {
    marginLeft: "10px",
    color: grey[500],
  },
}));
