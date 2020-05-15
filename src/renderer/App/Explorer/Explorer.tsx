import { useTheme } from "@material-ui/core";
import React from "react";
import {
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
  useAtomicCss,
} from "_r/useAtomicCss";
import { testIds } from "_tu/testIds";
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
