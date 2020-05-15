import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Settings, Home } from "@material-ui/icons";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Link } from "react-router-dom";
import { testIds } from "_tu/testIds";
import { SearchBox } from "./SearchBox/SearchBox";

export const AppBar: React.FC = () => {
  const a = useAtomicCss();

  return (
    <Toolbar>
      <SearchBox />

      <div className={a("flexGrow1")} />

      <IconButton
        component={Link}
        to="/explorer/300000"
        data-testid={testIds.homeButton}
      >
        <Home />
      </IconButton>

      <IconButton
        component={Link}
        to="/wallet"
        data-testid={testIds.homeButton}
      >
        <Home />
      </IconButton>

      <IconButton
        component={Link}
        to="/settings"
        data-testid={testIds.settingsButton}
      >
        <Settings />
      </IconButton>
    </Toolbar>
  );
};
