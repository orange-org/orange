import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useCommonStyles } from "_r/commonStyles";
// import { useRpcResponses } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { BlockDetails } from "./BlockDetails";
import { useExplorerStyles } from "./ExplorerStyles";
import { ListOfBlocks } from "./BlockList/BlockList";

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
