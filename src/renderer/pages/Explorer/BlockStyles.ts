import { makeStyles } from "@material-ui/core";
import { blueGrey, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles(theme => ({
  root: {
    "&::before": {
      width: "20px",
      marginBottom: "-4px", // This is to compensate for an added margin of unknown source
      marginLeft: "16px",
      borderLeft: `3px dashed ${grey[300]}`,
      height: theme.spacing(4),
      display: "inline-block",
      content: "''",
    },

    "&:nth-child(1)::before": {
      display: "none",
    },
  },

  blockContainer: {
    padding: theme.spacing(2),
    backgroundColor: blueGrey[100],
    borderRadius: 0,
  },

  height: {
    color: grey[600],
  },

  date: {
    fontSize: "95%",
    color: grey[600],
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
    color: grey[800],
  },

  hash: {
    marginTop: theme.spacing(4),
  },

  icon: {
    lineHeight: 0,
    color: grey[500],
  },

  value: {
    marginLeft: theme.spacing(1),
  },
}));
