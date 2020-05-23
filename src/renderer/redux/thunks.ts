import { map } from "bluebird";
import { Dispatch } from "redux";
import { rpcService } from "_r/rpcClient/rpcService";
import { GetState } from "_t/typeHelpers";
import * as actions from "./actions";
import { calculateExplorerBlockListHeights } from "./calculateExplorerBlockListHeights";
import { getWalletName, getOrangeWalletList } from "./walletDataHelpers";

export const requestBlockchainInfo = (
  nonce: NONCE,
  cacheDuration?: number,
) => async (dispatch: Dispatch) => {
  const blockchainInfo = await rpcService.requestBlockchainInfo(
    nonce,
    cacheDuration,
  );

  dispatch(actions.setBlockchainInfo(blockchainInfo));

  return blockchainInfo;
};

export const requestMempoolInfo = (
  nonce: NONCE,
  cacheDuration?: number,
) => async (dispatch: Dispatch) => {
  const mempoolInfo = await rpcService.requestMempoolInfo(nonce, cacheDuration);

  dispatch(actions.setMempoolInfo(mempoolInfo));

  return mempoolInfo;
};

export const populateBlockList = (
  nonce: NONCE,
  selectedHeight: number,
) => async (dispatch: Dispatch, getState: GetState) => {
  const { explorerBlockList } = getState();
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
    { concurrency: 2 },
  );

  dispatch(
    actions.setSelectedExplorerBlock(
      populatedBlockList.find(block => block.height === selectedHeight)!,
    ),
  );
  dispatch(actions.setExplorerBlockList(populatedBlockList));

  return populatedBlockList;
};

export const requestRawTransactionToDisplay = (
  nonce: NONCE,
  transactionId: string,
) => async (dispatch: Dispatch) => {
  const transaction = await rpcService.requestRawTransaction(
    nonce,
    transactionId,
  );

  dispatch(actions.setSelectedExplorerTransaction(transaction));

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

  dispatch(actions.setSelectedExplorerTransactionInputValues(inputValues));

  return transaction;
};

export const createWallet = (
  nonce: NONCE,
  selectedMnemonic: string,
) => async () => {
  const walletsList = await rpcService.listWallets(nonce);

  const orangeWalletsList = getOrangeWalletList(walletsList);
  const walletName = getWalletName(orangeWalletsList);

  await rpcService.createWallet(
    nonce,
    walletName,
    false,
    true,
    selectedMnemonic,
    true,
  );

  await rpcService.setHdSeed(nonce, walletName, true, selectedMnemonic);

  return walletName;
};
