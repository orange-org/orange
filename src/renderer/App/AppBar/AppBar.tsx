import { AppBar as MuiAppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";
import { SearchBox } from "./SearchBox/SearchBox";

export const AppBar: React.FC = () => {
  const a = useAtomicCss();

  return (
    <MuiAppBar
      variant="outlined"
      elevation={1}
      color="inherit"
      className={a("borderTopNone", "borderLeftNone", "borderRightNone")}
    >
      <div
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
        </Toolbar>
      </div>
    </MuiAppBar>
  );
};
