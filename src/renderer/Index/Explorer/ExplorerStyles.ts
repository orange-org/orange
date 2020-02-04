import { makeStyles } from "@material-ui/core";

export const BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH = 82;

export const useExplorerStyles = makeStyles(theme => ({
  explorer: {
    display: "grid",
    gridTemplateColumns: `${theme.spacing(
      BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
    )}px auto`,
  },
}));
