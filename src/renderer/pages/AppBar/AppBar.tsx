import React from "react";
import { Typography } from "_r/components/Typography";
import { Toolbar, IconButton, AppBar as MuiAppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export const AppBar: React.FC = () => {
  return (
    <MuiAppBar variant="elevation" elevation={1}>
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
