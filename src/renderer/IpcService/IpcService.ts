import { RpcRequestMtM, ShowErrorMtM } from "_t/IpcMessages";
import { PromiseType } from "_t/typeHelpers";
import { IpcClient } from "./IpcClient";

const extractPayload = async <T extends ReturnType<typeof IpcClient.send>>(
  message: T,
): Promise<PromiseType<T>["payload"]> => {
  const { payload } = await message;
  return payload;
};

/* istanbul ignore next: can only ignore class props this way */
const showError = (nonce: NONCE, error: ShowErrorMtM["payload"]) =>
  extractPayload(
    IpcClient.send({
      nonce,
      type: "showError",
      payload: error,
    }),
  );

class IpcService {
  showError = showError;

  rpcRequest = (nonce: NONCE, request: RpcRequestMtM["payload"]) =>
    extractPayload(
      IpcClient.send({
        nonce,
        type: "rpcRequest",
        payload: request,
      }),
    );

  setIsReady = (nonce: NONCE) =>
    extractPayload(
      IpcClient.send({
        nonce,
        type: "setIsReady",
        payload: undefined,
      }),
    );
}

export const ipcService = new IpcService();
