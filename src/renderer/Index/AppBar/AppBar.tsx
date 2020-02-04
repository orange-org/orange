import { AppBar as MuiAppBar, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { Typography } from "_r/Index/components/Typography";
import { SearchBox } from "./SearchBox/SearchBox";

const useAppBarStyles = makeStyles(theme => ({
  AppBar: {
    borderTop: "2px solid #ff6f00",
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
