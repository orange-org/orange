import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: "auto",
    backgroundImage: "linear-gradient(to bottom, #f9f9f9, #e3e3e3)",
    padding: theme.spacing(1),
    borderTop: "1px solid #bebebe",
    height: theme.spacing(7),
  },
  progressBarContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  progressBarRoot: {
    marginLeft: theme.spacing(2),
    height: theme.spacing(3),
    backgroundColor: "#dadada",
    border: "1px solid #d4d4d4",
    flex: 1,
    borderRadius: 3,
  },
  progressBarBar: {
    borderRadius: 2,
    backgroundColor: "#b7b7b7",
  },
  progressBarMessageContainer: {
    minWidth: "10%",
  },
  networkStateContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%",

    "& *": {
      height: "100%",
    },
  },
  iconButton: {
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "none",
  },
  details: {
    marginTop: theme.spacing(10),
    width: "100%",
  },
}));
