import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const BLOCK_HORIZONTAL_MARGIN = 5;
const BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH = 82;
const BLOCK_SCROLLABLE_CONTAINER = BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH - 5;

export const BLOCK_AVAILABLE_WIDTH =
  BLOCK_SCROLLABLE_CONTAINER - BLOCK_HORIZONTAL_MARGIN * 2;

export const useExplorerStyles = makeStyles(theme => ({
  explorer: {
    display: "grid",
    gridTemplateColumns: `${theme.spacing(
      BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
    )}px auto`,
  },

  scrollableBlocksContainer: {
    display: "grid",
    gridTemplateColumns: `${theme.spacing(BLOCK_SCROLLABLE_CONTAINER)}px auto`,
    height: "100vh",
    overflowY: "scroll",
    overflowX: "hidden",

    "&::-webkit-scrollbar": {
      width: "0px", // Remove scroll bar
    },
  },

  blocksContainer: {
    margin: `${theme.spacing(30)}px ${theme.spacing(
      BLOCK_HORIZONTAL_MARGIN,
    )}px`,
  },

  moat: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));
