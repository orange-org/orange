import React from "react";
import { Typography } from "_r/Index/components/Typography";
import {
  Toolbar,
  IconButton,
  AppBar as MuiAppBar,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useAppBarStyles = makeStyles({
  AppBar: {
    borderTop: "2px solid #ff6f00",
  },
});

export const AppBar: React.FC = () => {
  const cn = useAppBarStyles();

  return (
    <MuiAppBar variant="elevation" elevation={1} className={cn.AppBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Bitcoin
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
