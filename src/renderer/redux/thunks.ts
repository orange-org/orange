import { Dispatch } from "redux";
import { SetNetworkActiveRpcRequest } from "_t/bitcoindRpcRequests";
import { GetState } from "_t/typeHelpers";
import * as actions from "./actions";
import { rpcClient } from "../rpcClient/rpcClient";
import { Block } from "_t/bitcoindRpcResponses";
import { last } from "_r/utils/smallUtils";

export const requestNetworkInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getnetworkinfo" }, 1000);
  dispatch(actions.setNetworkInfo(response));
  return response;
};

export const requestBlockchainInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(
    nonce,
    { method: "getblockchaininfo" },
    1000,
  );

  dispatch(actions.setBlockchainInfo(response));

  return response;
};

export const requestUptime = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "uptime" });
  dispatch(actions.setUptime(response));
  return response;
};

export const requestBlock = (
  nonce: NONCE,
  blockHash: string,
  verbosity: 0 | 1 | 2 = 1,
) => async (dispatch: Dispatch) => {
  const response = await rpcClient(
    nonce,
    {
      method: "getblock",
      params: [blockHash, verbosity],
    },
    1000,
  );
  dispatch(actions.setBlock(response));
  return response;
};

export const requestPeerInfo = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "getpeerinfo" }, 1000);
  dispatch(actions.setPeerInfo(response));
  return response;
};

export const requestMempoolInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getmempoolinfo" }, 1000);
  dispatch(actions.setMempoolInfo(response));
  return response;
};

export const requestRpcInfo = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "getrpcinfo" }, 1000);
  dispatch(actions.setRpcInfo(response));
  return response;
};

export const requestSetNetworkActive = (
  nonce: NONCE,
  isNetworkActive: SetNetworkActiveRpcRequest["params"]["state"],
) => {
  return async (dispatch: Dispatch) => {
    await rpcClient(nonce, {
      method: "setnetworkactive",
      params: { state: isNetworkActive },
    });

    const response = await rpcClient(nonce, { method: "getnetworkinfo" });

    dispatch(actions.setNetworkInfo(response));

    return response;
  };
};

export const requestBlockByHeight = (
  nonce: NONCE,
  height: number,
  verbosity: 0 | 1 | 2 = 1,
) => async (dispatch: Dispatch) => {
  const blockHashResponse = await rpcClient(nonce, {
    method: "getblockhash",
    params: [height],
  });
  const blockResponse = await rpcClient(nonce, {
    method: "getblock",
    params: [blockHashResponse, verbosity],
  });

  dispatch(actions.setBlock(blockResponse));

  return blockResponse;
};

export const setSelectedExplorerBlock = (
  nonce: NONCE,
  blockHeight: number,
) => async (dispatch: Dispatch) => {
  const blockHash = await rpcClient(nonce, {
    method: "getblockhash",
    params: [blockHeight],
  });
  const block = await rpcClient(nonce, {
    method: "getblock",
    params: [blockHash, 1],
  });

  dispatch(actions.setSelectedExplorerBlock(block));

  return block;
};

export const addBlockToExplorerBlockList = (
  nonce: NONCE,
  blockHeight: number,
) => async (dispatch: Dispatch, getState: GetState) => {
  const { explorerBlockList } = getState().misc;

  const blockHash = await rpcClient(nonce, {
    method: "getblockhash",
    params: [blockHeight],
  });
  const block = await rpcClient(nonce, {
    method: "getblock",
    params: [blockHash, 1],
  });

  const newExplorerBlockList = explorerBlockList
    ? [...explorerBlockList, block]
    : [block];

  dispatch(actions.setExplorerBlockList(newExplorerBlockList));

  return newExplorerBlockList;
};
