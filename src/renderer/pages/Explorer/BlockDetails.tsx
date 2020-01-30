import React from "react";
import { useParams } from "react-router-dom";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { useBlockDetailsStyles } from "./useBlockDetailsStyles";

export const BlockDetails: React.FC<{
  displayedBlock: TBlock | null;
}> = props => {
  const cn = useBlockDetailsStyles();
  const { blockNeedle } = useParams() as any;

  return (
    <div className={cn.root}>
      <h3>Block: {blockNeedle}</h3>
      <pre>{JSON.stringify(props.displayedBlock, null, 2)}</pre>
    </div>
  );
};
