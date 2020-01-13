import { Theme, makeStyles } from "@material-ui/core";

export const useCommonStyles = makeStyles(theme => ({
  displayTable: {
    display: "table",
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
}));
