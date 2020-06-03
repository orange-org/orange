import { PromiseType } from "_t/typeHelpers";
import { ShowErrorMtM, RpcRequestMtM, RpcConfigurations } from "_t/IpcMessages";
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
      type: "show-error",
      payload: error,
    }),
  );

class IpcService {
  getSavedRpcConfigurations = (nonce: NONCE) =>
    extractPayload(
      IpcClient.send({
        nonce,
        type: "get-saved-rpc-configurations",
      }),
    );

  getCookiePathFromOpenDialog = (nonce: NONCE) =>
    extractPayload(
      IpcClient.send({
        nonce,
        type: "get-cookie-path-from-open-dialog",
      }),
    );

  showError = showError;

  rpcRequest = (nonce: NONCE, request: RpcRequestMtM["payload"]) =>
    extractPayload(
      IpcClient.send({
        nonce,
        type: "rpc-request",
        payload: request,
      }),
    );

  saveRpcConfigurations = (
    nonce: NONCE,
    rpcConfigurations: RpcConfigurations | null,
  ) =>
    extractPayload(
      IpcClient.send({
        nonce,
        type: "save-rpc-configurations",
        payload: rpcConfigurations,
      }),
    );
}

export const ipcService = new IpcService();
