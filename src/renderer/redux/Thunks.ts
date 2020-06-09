import { map } from "bluebird";
import { Dispatch } from "redux";
import { RpcService } from "_r/RpcService/RpcService";
import { GetState } from "_t/typeHelpers";
import { Actions } from "./Actions";
import { ExplorerBlockListHeights } from "./ExplorerBlockListHeights";
import { WalletUtils } from "./WalletUtils";

export class Thunks {
  static requestBlockchainInfo = (
    nonce: NONCE,
    cacheDuration?: number,
  ) => async (dispatch: Dispatch) => {
    const blockchainInfo = await RpcService.requestBlockchainInfo(
      nonce,
      cacheDuration,
    );

    dispatch(Actions.setBlockchainInfo(blockchainInfo));

    return blockchainInfo;
  };

  static requestMempoolInfo = (nonce: NONCE, cacheDuration?: number) => async (
    dispatch: Dispatch,
  ) => {
    const mempoolInfo = await RpcService.requestMempoolInfo(
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

        return RpcService.requestBlockByHeight(nonce, height);
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
    const transaction = await RpcService.requestRawTransaction(
      nonce,
      transactionId,
    );

    dispatch(Actions.setSelectedExplorerTransaction(transaction));

    const inputValues = await map(
      transaction.vin,
      async input => {
        const inputSourceTransaction = await RpcService.requestRawTransaction(
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

  static requestPeerInfo = (nonce: NONCE, cacheDuration?: number) => async (
    dispatch: Dispatch,
  ) => {
    const peerInfo = await RpcService.requestPeerInfo(nonce, cacheDuration);

    dispatch(Actions.setPeerInfo(peerInfo));

    return peerInfo;
  };

  static createWallet = (
    nonce: NONCE,
    selectedMnemonic: string,
  ) => async () => {
    const walletsList = await RpcService.listWallets(nonce);

    const orangeWalletsList = WalletUtils.getOrangeWalletList(walletsList);
    const walletName = WalletUtils.getWalletName(orangeWalletsList);

    await RpcService.createWallet(
      nonce,
      walletName,
      false,
      true,
      selectedMnemonic,
      true,
    );

    await RpcService.setHdSeed(nonce, walletName, true, selectedMnemonic);

    return walletName;
  };
}
