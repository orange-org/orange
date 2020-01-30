import { makeStyles } from "@material-ui/core";

export const useBlockDetailsStyles = makeStyles(theme => ({
  root: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));
