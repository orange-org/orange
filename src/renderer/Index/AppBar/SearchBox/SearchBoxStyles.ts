import { makeStyles, fade } from "@material-ui/core";

export const useSearchBoxStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(10),
    width: "auto",
  },
  searchIcon: {
    width: theme.spacing(11),
    color: theme.palette.text.hint,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
}));
