import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React from "react";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";
import { Link } from "react-router-dom";
import { SearchBox } from "./SearchBox/SearchBox";

export const AppBar: React.FC = () => {
  const a = useAtomicCss();

  return (
    <MuiAppBar
      variant="elevation"
      elevation={1}
      color="inherit"
      className={a(
        "borderWidth2",
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

        <IconButton
          onClick={() => null}
          component={Link}
          to="/settings/bitcoin-core-connection"
        >
          <Settings />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};
