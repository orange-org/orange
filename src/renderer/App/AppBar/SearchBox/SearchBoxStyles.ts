import { makeStyles } from "@material-ui/core";
import { getAtomicCssAndStyleGroups } from "_r/useAtomicCss";

export const useSearchBoxStyles = makeStyles(theme => {
  const { atomicCss } = getAtomicCssAndStyleGroups(theme);

  return {
    inputRoot: {
      color: "inherit",
    },

    inputInput: {
      padding: theme.spacing(3, 3, 3, 11),
      transition: theme.transitions.create("width"),
      width: 300,
      "&:focus": {
        width: 600,
        ...atomicCss.borderWidth1px,
        ...atomicCss.borderRadius4px,
        ...atomicCss.borderColorSecondaryMain,
        ...atomicCss.borderStyleSolid,
      },
    },
  };
});
