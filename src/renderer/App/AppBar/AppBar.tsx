import { AppBar as MuiAppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";
import { FeatureFlags } from "_f/FeatureFlags";
import { SearchBox } from "./SearchBox/SearchBox";
import { StatusIndicator } from "./StatusIndicator/StatusIndicator";

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
        <Toolbar variant={FeatureFlags.enableExplorer ? "regular" : "dense"}>
          <Typography variant="h6" color="inherit">
            {productName}
          </Typography>

          {FeatureFlags.enableExplorer ? <SearchBox /> : null}

          <div className={a("flexGrow1")} />

          <StatusIndicator />
        </Toolbar>
      </div>
    </MuiAppBar>
  );
};
