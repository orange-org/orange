import { makeStyles } from "@material-ui/core";

export const useBlockDetailsStyles = makeStyles(theme => ({
  blockDetails: {
    padding: theme.spacing(6),
    overflow: "scroll",
  },

  blockDetailsInnerContainer: {
    marginBottom: theme.spacing(10),
  },

  title: {
    fontWeight: 500,
    fontStyle: "italic",
  },

  hash: {
    marginTop: theme.spacing(1),
    fontStyle: "italic",
    color: theme.palette.text.hint,
  },

  section: {
    marginTop: theme.spacing(5),
  },

  table: {
    marginTop: theme.spacing(2),
    maxHeight: theme.spacing(120),
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

  navigationButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },

  buttonLabel: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  buttonIcon: {
    display: "flex",
  },

  buttonText: {
    flex: 1,
  },

  tableRow: {
    "&:last-child th, &:last-child td": {
      borderBottom: 0,
    },
  },

  transactionsPage: {
    marginTop: theme.spacing(2),
  },

  transactionItem: {
    padding: theme.spacing(3),
    // borderBottom: `1px solid ${fade(theme.palette.divider, 1)}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
