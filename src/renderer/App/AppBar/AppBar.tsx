import {
  AppBar as MuiAppBar,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { SearchBox } from "./SearchBox/SearchBox";

const useAppBarStyles = makeStyles(theme => ({
  AppBar: {
    borderTop: `2px solid ${theme.palette.secondary.main}`,
  },
}));

export const AppBar: React.FC = () => {
  const cn = useAppBarStyles();

  return (
    <MuiAppBar variant="elevation" elevation={1} className={cn.AppBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Orange
        </Typography>

        <SearchBox />
      </Toolbar>
    </MuiAppBar>
  );
};
