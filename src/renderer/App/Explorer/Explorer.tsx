import { useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import {
  BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH,
  useAtomicCss,
} from "_r/useAtomicCss";
import { testIds } from "_tu/testIds";
import { useParams, useHistory } from "react-router-dom";
import { rpcService } from "_r/rpcClient/rpcService";
import { BlockDetails } from "./BlockDetails/BlockDetails";
import { BlockList } from "./BlockList/BlockList";

export const Explorer: React.FC = () => {
  const a = useAtomicCss();
  const theme = useTheme();
  const { blockHeightAsId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!blockHeightAsId) {
      const request = async () => {
        const blockchainInfo = await rpcService.requestBlockchainInfo(
          __NONCE__,
        );

        history.push(`/explorer/${blockchainInfo.blocks.toString()}`);
      };

      request();
    }
  }, [blockHeightAsId, history]);

  if (!blockHeightAsId) {
    return null;
  }

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
