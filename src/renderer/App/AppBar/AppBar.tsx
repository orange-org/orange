import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Settings, Home } from "@material-ui/icons";
import React from "react";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";
import { Link } from "react-router-dom";
import { testIds } from "_r/testIds";
import { FeatureFlags } from "_f/FeatureFlags";
import { SearchBox } from "./SearchBox/SearchBox";

export const AppBar: React.FC = () => {
  const a = useAtomicCss();

  return (
    <MuiAppBar
      variant="elevation"
      elevation={1}
      color="inherit"
      className={a(
        "borderWidth2px",
        "borderTopStyleSolid",
        "borderColorSecondaryMain",
      )}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {productName}
        </Typography>

        <SearchBox />

        <div className={a("flexGrow1")} />

        <IconButton component={Link} to="/" data-testid={testIds.homeButton}>
          <Home />
        </IconButton>

        {FeatureFlags.useBcore ? (
          <IconButton
            component={Link}
            to="/settings"
            data-testid={testIds.settingsButton}
          >
            <Settings />
          </IconButton>
        ) : null}
      </Toolbar>
    </MuiAppBar>
  );
};
