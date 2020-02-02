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

  "@keyframes shine": {
    from: {
      backgroundPosition: "100%",
    },
    to: {
      backgroundPosition: "-100%",
    },
  },

  skeleton: {
    position: "relative",

    "&::before": {
      animation: "$shine 1s infinite",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      content: "''",
      background:
        "linear-gradient(138deg, rgba(242,242,242,1) 28%, rgba(255,255,255,1) 46%, rgba(242,242,242,1) 57%)",
      backgroundColor: "rgba(242,242,242,1)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "200%",
      opacity: 1,
    },
  },

  transition: {
    "&::before": {
      transition: "opacity 1200ms",
    },
  },

  none: {
    "&::before": {
      content: "''",
      opacity: 0,
    },
  },
}));
