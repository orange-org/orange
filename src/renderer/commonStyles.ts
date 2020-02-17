import { makeStyles } from "@material-ui/core";

export const useCommonStyles = makeStyles(theme => ({
  displayTable: {
    display: "table",
    tableLayout: "fixed",
    borderSpacing: `${theme.spacing(3)}px`,
  },
  displayTableRow: {
    display: "table-row",
  },
  displayTableCell: {
    display: "table-cell",
  },
  fontWeight500: {
    fontWeight: 500,
  },
  topLevelComponent: {
    padding: "64px 0 0 0", // compensate for AppBar
    height: "100%",
  },
  fontStyleItalic: {
    fontStyle: "italic",
  },
  marginTop1: {
    marginTop: theme.spacing(1),
  },
  colorHint: {
    color: theme.palette.text.hint,
  },
}));
