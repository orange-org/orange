import { makeStyles } from "@material-ui/core";

export const useSearchBoxStyles = makeStyles(theme => {
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
      },
    },
  };
});
