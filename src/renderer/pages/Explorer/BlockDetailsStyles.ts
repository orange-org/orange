import { makeStyles } from "@material-ui/core";

export const useBlockDetailsStyles = makeStyles(theme => ({
  blockDetails: {
    padding: theme.spacing(6),
    overflow: "scroll",
    height: "100vh",
  },

  title: {
    fontWeight: 500,
    fontStyle: "italic",
  },

  hash: {
    fontStyle: "italic",
    color: theme.palette.text.hint,
  },

  section: {
    marginTop: theme.spacing(5),
  },

  table: {
    marginTop: theme.spacing(2),
    maxHeight: theme.spacing(60),
  },

  detailsSection: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
  },

  detailsItem: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },

  detailsItemValue: {
    marginLeft: theme.spacing(1),
  },

  detailsItemKeyText: {
    fontWeight: 500,
  },

  detailsItemKey: {},
}));
