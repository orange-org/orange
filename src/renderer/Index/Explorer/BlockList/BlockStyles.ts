import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

const PADDING = 2;
const BLOCK_COLOR = blueGrey[100];

export const useBlockStyles = makeStyles(theme => ({
  root: {
    "&::before": {
      width: "20px",
      marginBottom: "-4px", // This is to compensate for an added margin of unknown source
      marginLeft: theme.spacing(10),
      borderLeft: `3px dashed ${theme.palette.secondary.main}`,
      height: theme.spacing(4),
      display: "inline-block",
      content: "''",
    },

    "&:nth-child(1)::before": {
      display: "none",
    },
  },

  blockContainer: {
    padding: theme.spacing(PADDING),
    backgroundColor: BLOCK_COLOR,
    borderRadius: 0,
    // transition: "margin 20ms",
    position: "relative",
    overflow: "visible",
  },

  height: {
    color: theme.palette.text.secondary,
  },

  date: {
    fontSize: "95%",
    color: theme.palette.text.hint,
    marginLeft: theme.spacing(2),
  },

  topRow: {
    display: "flex",
    alignItems: "center",
  },

  metaData: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(2),
  },

  metaDataItem: {
    width: "100%",
    flex: "0 50%",
    display: "flex",
    paddingTop: theme.spacing(2),
    alignItems: "center",
  },

  hash: {
    marginTop: theme.spacing(4),
    color: theme.palette.text.hint,
  },

  hashText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "160px",
    whiteSpace: "nowrap",
  },

  icon: {
    lineHeight: 0,
    color: theme.palette.text.hint,
  },

  value: {
    marginLeft: theme.spacing(1),
  },

  activeCard: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(-8),
  },

  scrollIntoView: {
    position: "absolute",
    top: `-${theme.spacing(10)}px`,
    bottom: `-${theme.spacing(10)}px`,
    left: 0,
    right: 0,
  },
}));
