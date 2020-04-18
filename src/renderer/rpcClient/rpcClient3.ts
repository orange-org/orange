// import { callMain } from "_r/ipc/callMain";
// import { generateUuid } from "_r/utils/smallUtils";
// import { RpcRequest, UnsentRpcRequest } from "_t/RpcRequests";
// import { RpcResponse } from "_t/RpcResponses";
// import { RpcResponseMtR } from "_t/IpcMessages";
// import { store } from "_r/redux/reducers/store";
// import { setBitcoinCoreConnectionIssue } from "_r/redux/actions";
// import { rpcClientCache } from "./rpcClientCache";
// import { isBitcoinCoreConnectionIssue } from "./isBitcoinCoreConnectionIssue";

// const isRpcResponse = (
//   response: any,
//   requestId: string,
// ): response is RpcResponseMtR => {
//   return (
//     response?.message?.requestId === requestId &&
//     response?.source === "@orange/main"
//   );
// };

// export type RpcClientReturnType<T extends UnsentRpcRequest> = Extract<
//   RpcResponse["result"],
//   Extract<RpcResponse, { method: T["method"]; error: null }>["result"]
// >;

// export const rpcClient = <TRpcRequest extends UnsentRpcRequest>(
//   nonce: NONCE,
//   rpcRequest: TRpcRequest,
//   cacheTtl?: number,
// ): Promise<RpcClientReturnType<TRpcRequest>> => {
//   // eslint-disable-next-line consistent-return
//   return new Promise((resolve, reject) => {
//     if (cacheTtl) {
//       const cacheResult = rpcClientCache.get(rpcRequest);

//       if (cacheResult) {
//         return resolve(cacheResult.result as RpcClientReturnType<TRpcRequest>);
//       }
//     }

//     const requestId = generateUuid();
//     const windowMessageEventHandler = (event: MessageEvent) => {
//       const { data: response } = event;

//       if (isRpcResponse(response, requestId)) {
//         window.removeEventListener("message", windowMessageEventHandler);

//         if (response.message.error) {
//           if (isBitcoinCoreConnectionIssue(response.message.error)) {
//             store.dispatch(
//               setBitcoinCoreConnectionIssue(response.message.error),
//             );
//             return;
//           }

//           reject(response.message.error);
//           return;
//         }

//         if (cacheTtl) {
//           rpcClientCache.add(rpcRequest, response.message, cacheTtl);
//         }

//         store.dispatch(setBitcoinCoreConnectionIssue(null));
//         resolve(response.message.result as RpcClientReturnType<TRpcRequest>);
//       }
//     };
//     window.addEventListener("message", windowMessageEventHandler);

//     callMain({
//       nonce,
//       type: "rpc-request",
//       message: { ...rpcRequest, requestId } as RpcRequest,
//     });
//   });
// };
