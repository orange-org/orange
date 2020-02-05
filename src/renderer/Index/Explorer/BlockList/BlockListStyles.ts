import { makeStyles } from "@material-ui/core";
import { BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH } from "_r/Index/Explorer/ExplorerStyles";

const BLOCK_HORIZONTAL_MARGIN = 5;
const BLOCK_SCROLLABLE_CONTAINER = BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH - 5;

export const BLOCK_AVAILABLE_WIDTH =
  BLOCK_SCROLLABLE_CONTAINER - BLOCK_HORIZONTAL_MARGIN * 2;

export const useBlockListStyles = makeStyles(theme => ({
  scrollableBlocksContainer: {
    display: "grid",
    gridTemplateColumns: `${theme.spacing(BLOCK_SCROLLABLE_CONTAINER)}px auto`,
    overflowY: "scroll",
    overflowX: "hidden",

    "&::-webkit-scrollbar": {
      width: "0px", // Remove scroll bar
    },
  },

  blocksContainer: {
    margin: `${theme.spacing(10)}px ${theme.spacing(
      BLOCK_HORIZONTAL_MARGIN,
    )}px`,
  },

  moat: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));
