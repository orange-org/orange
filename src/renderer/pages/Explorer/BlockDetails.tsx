import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "_r/components/Typography";
import * as thunks from "_r/redux/thunks";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { useBlockDetailsStyles } from "./useBlockDetailsStyles";

export const BlockDetails: React.FC = () => {
  const cn = useBlockDetailsStyles();
  const { blockSearchQuery } = useParams();
  const [blockData, setBlockData] = useState<TBlock | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestData = async () => {
      setBlockData(
        await dispatch(thunks.requestBlock(__NONCE__, blockSearchQuery!)),
      );
    };

    requestData();
  }, [blockSearchQuery]);

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
      <pre>{JSON.stringify(blockData, null, 2)}</pre>
    </div>
  );
};
