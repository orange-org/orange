import { PromiseType } from "_t/typeHelpers";
import { ShowErrorMtM, RpcRequestMtM, RpcConfigurations } from "_t/IpcMessages";
import { callMain } from "./callMain";

const extractPayload = async <T extends ReturnType<typeof callMain>>(
  message: T,
): Promise<PromiseType<T>["payload"]> => {
  const { payload } = await message;
  return payload;
};

/* istanbul ignore next: can only ignore class props this way */
const showError = (nonce: NONCE, error: ShowErrorMtM["payload"]) =>
  extractPayload(
    callMain({
      nonce,
      type: "show-error",
      payload: error,
    }),
  );

class IpcService {
  getSavedRpcConfigurations = (nonce: NONCE) =>
    extractPayload(
      callMain({
        nonce,
        type: "get-saved-rpc-configurations",
      }),
    );

  getCookieFileFromOpenDialog = (nonce: NONCE) =>
    extractPayload(
      callMain({
        nonce,
        type: "get-cookie-file-from-open-dialog",
      }),
    );

  showError = showError;

  rpcRequest = (nonce: NONCE, request: RpcRequestMtM["payload"]) =>
    extractPayload(
      callMain({
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
      callMain({
        nonce,
        type: "save-rpc-configurations",
        payload: rpcConfigurations,
      }),
    );
}

export const ipcService = new IpcService();
