import React from "react";
import { Typography } from "_r/components/Typography";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { useBlockDetailsStyles } from "./useBlockDetailsStyles";

export const BlockDetails: React.FC<{
  displayedBlock: TBlock | null;
}> = props => {
  const cn = useBlockDetailsStyles();
  const { displayedBlock: blockData } = props;

  if (!blockData) {
    return null;
  }

  return (
    <div className={cn.root}>
      <Typography variant="h1" className={cn.h3}>
        op#{blockData.height.toLocaleString()}
      </Typography>

      <Typography variant="h4" className={cn.h3}>
        Hash {blockData.hash}
      </Typography>
      <pre>{JSON.stringify(props.displayedBlock, null, 2)}</pre>
    </div>
  );
};
