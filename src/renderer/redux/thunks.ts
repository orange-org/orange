import { map } from "bluebird";
import { Dispatch } from "redux";
import { rpcService } from "_r/rpcClient/rpcService";
import { GetState } from "_t/typeHelpers";
import { Actions } from "./Actions";
import { ExplorerBlockListHeights } from "./ExplorerBlockListHeights";

export class Thunks {
  static requestBlockchainInfo = (
    nonce: NONCE,
    cacheDuration?: number,
  ) => async (dispatch: Dispatch) => {
    const blockchainInfo = await rpcService.requestBlockchainInfo(
      nonce,
      cacheDuration,
    );

    dispatch(Actions.setBlockchainInfo(blockchainInfo));

    return blockchainInfo;
  };

  static requestMempoolInfo = (nonce: NONCE, cacheDuration?: number) => async (
    dispatch: Dispatch,
  ) => {
    const mempoolInfo = await rpcService.requestMempoolInfo(
      nonce,
      cacheDuration,
    );

    dispatch(Actions.setMempoolInfo(mempoolInfo));

    return mempoolInfo;
  };

  static populateBlockList = (nonce: NONCE, selectedHeight: number) => async (
    dispatch: Dispatch,
    getState: GetState,
  ) => {
    const { explorerBlockList } = getState();
    const blockList = ExplorerBlockListHeights.calculate(
      selectedHeight,
      explorerBlockList ? explorerBlockList.map(block => block.height) : [],
    );
    const populatedBlockList = await map(
      blockList,
      async height => {
        const block = explorerBlockList?.find(
          block_ => block_.height === height,
        );

        if (block) {
          return block;
        }

        return rpcService.requestBlockByHeight(nonce, height);
      },
      { concurrency: 2 },
    );

    dispatch(
      Actions.setSelectedExplorerBlock(
        populatedBlockList.find(block => block.height === selectedHeight)!,
      ),
    );
    dispatch(Actions.setExplorerBlockList(populatedBlockList));

    return populatedBlockList;
  };

  static requestRawTransactionToDisplay = (
    nonce: NONCE,
    transactionId: string,
  ) => async (dispatch: Dispatch) => {
    const transaction = await rpcService.requestRawTransaction(
      nonce,
      transactionId,
    );

    dispatch(Actions.setSelectedExplorerTransaction(transaction));

    const inputValues = await map(
      transaction.vin,
      async input => {
        const inputSourceTransaction = await rpcService.requestRawTransaction(
          nonce,
          input.txid,
        );
        const inputValue = inputSourceTransaction.vout[input.vout].value;

        return inputValue;
      },
      { concurrency: 2 },
    );

    dispatch(Actions.setSelectedExplorerTransactionInputValues(inputValues));

    return transaction;
  };
}
