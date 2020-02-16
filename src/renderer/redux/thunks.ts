import { map } from "bluebird";
import { Dispatch } from "redux";
import { rpcService } from "_r/rpcClient/rpcService";
import { GetState } from "_t/typeHelpers";
import * as actions from "./actions";
import { calculateExplorerBlockListHeights } from "./calculateExplorerBlockListHeights";

export const populateBlockList = (
  nonce: NONCE,
  selectedHeight: number,
) => async (dispatch: Dispatch, getState: GetState) => {
  const { explorerBlockList } = getState().misc;
  const blockList = calculateExplorerBlockListHeights(
    selectedHeight,
    explorerBlockList ? explorerBlockList.map(block => block.height) : [],
  );
  const populatedBlockList = await map(
    blockList,
    async height => {
      const block = explorerBlockList?.find(block_ => block_.height === height);

      if (block) {
        return block;
      }

      return rpcService.requestBlockByHeight(nonce, height);
    },
    { concurrency: 1 },
  );

  dispatch(
    actions.setSelectedExplorerBlock(
      populatedBlockList.find(block => block.height === selectedHeight)!,
    ),
  );
  dispatch(actions.setExplorerBlockList(populatedBlockList));

  return populatedBlockList;
};
