import React from "react";
import {
  useAtomicCss,
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
} from "_r/useAtomicCss";
import { useTheme } from "@material-ui/core";
import { testIds } from "_r/testIds";
import { BlockDetails } from "./BlockDetails/BlockDetails";
import { BlockList } from "./BlockList/BlockList";

export const Explorer: React.FC = () => {
  const a = useAtomicCss();
  const theme = useTheme();

  return (
    <div
      data-testid={testIds.explorerPage}
      style={{
        gridTemplateColumns: `${theme.spacing(
          BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
        )}px auto`,
      }}
      className={a("topLevelComponent", "displayGrid")}
    >
      <BlockList />
      <BlockDetails />
    </div>
  );
};
