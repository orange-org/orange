import { Dispatch } from "redux";
import { SetNetworkActiveRpcRequest } from "_t/bitcoindRpcRequests";
import {
  receiveHeaderSyncParameters,
  setBlock,
  setBlockchainInfo,
  setMempoolInfo,
  setNetworkInfo,
  setPeerInfo,
  setRpcInfo,
  setUptime,
} from "./actions";
import { rpcClient } from "./rpcClient/rpcClient";
import { GetState } from "_t/typeHelpers";

export const requestNetworkInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getnetworkinfo" }, 1000);
  dispatch(setNetworkInfo(response.result));
  return response.result;
};

export const requestBlockchainInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(
    nonce,
    { method: "getblockchaininfo" },
    1000,
  );

  dispatch(setBlockchainInfo(response.result));

  return response.result;
};

export const requestUptime = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "uptime" });
  dispatch(setUptime(response.result));
  return response.result;
};

export const requestBlock = (nonce: NONCE, blockHash: string) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(
    nonce,
    {
      method: "getblock",
      params: [blockHash],
    },
    1000,
  );
  dispatch(setBlock(response.result));
  return response.result;
};

export const requestPeerInfo = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "getpeerinfo" }, 1000);
  dispatch(setPeerInfo(response.result));
  return response.result;
};

export const requestMempoolInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getmempoolinfo" }, 1000);
  dispatch(setMempoolInfo(response.result));
  return response.result;
};

export const requestRpcInfo = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "getrpcinfo" }, 1000);
  dispatch(setRpcInfo(response.result));
  return response.result;
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

    dispatch(setNetworkInfo(response.result));

    return response.result;
  };
};

export const requestHeaderSyncParameters = (nonce: NONCE) => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const blockchainInfoResponse = await rpcClient(nonce, {
    method: "getblockchaininfo",
  });
  const { headers: headerCount } = blockchainInfoResponse.result;
  const previousHeaderCount = getState().rpcResponses.blockchainInfo?.headers;
  const payload = { headerCount, previousHeaderCount };

  dispatch(receiveHeaderSyncParameters(payload));

  return payload;
};
