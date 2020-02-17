import clsx from "clsx";
import React from "react";
import { useCcn } from "_r/commonStyles";
import { useTheme } from "@material-ui/core";
import { BlockDetails } from "./BlockDetails/BlockDetails";
import { ListOfBlocks } from "./BlockList/BlockList";

export const BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH = 82;

export const Explorer_: React.FC = () => {
  const ccn = useCcn();
  const theme = useTheme();

  return (
    <div
      style={{
        gridTemplateColumns: `${theme.spacing(
          BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
        )}px auto`,
      }}
      className={ccn("topLevelComponent", "displayGrid")}
    >
      <ListOfBlocks />
      <BlockDetails />
    </div>
  );
};

export const Explorer = Explorer_;
