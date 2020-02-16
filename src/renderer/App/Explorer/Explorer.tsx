import clsx from "clsx";
import React from "react";
import { useCommonStyles } from "_r/commonStyles";
import { BlockDetails } from "./BlockDetails";
import { ListOfBlocks } from "./BlockList/BlockList";
import { useExplorerStyles } from "./ExplorerStyles";

export const Explorer_: React.FC = () => {
  const cn = useExplorerStyles();
  const ccn = useCommonStyles();

  return (
    <div className={clsx(cn.explorer, ccn.topLevelComponent)}>
      <ListOfBlocks />
      <BlockDetails />
    </div>
  );
};

export const Explorer = Explorer_;
