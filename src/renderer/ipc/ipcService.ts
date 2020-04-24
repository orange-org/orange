import { PromiseType } from "_t/typeHelpers";
import { ShowErrorMtM, RpcRequestMtM, RpcConfigurations } from "_t/IpcMessages";
import { callMain } from "./callMain";

const extractPayload = async <T extends ReturnType<typeof callMain>>(
  message: T,
): Promise<PromiseType<T>["payload"]> => {
  const { payload } = await message;
  return payload;
};

class IpcService {
  getRpcConfigurations = (nonce: NONCE) =>
    extractPayload(
      callMain({
        nonce,
        type: "get-rpc-configurations",
      }),
    );

  getCookieFileFromOpenDialog = (nonce: NONCE) =>
    extractPayload(
      callMain({
        nonce,
        type: "get-cookie-file-from-open-dialog",
      }),
    );

  showError = (nonce: NONCE, error: ShowErrorMtM["payload"]) =>
    extractPayload(
      callMain({
        nonce,
        type: "show-error",
        payload: error,
      }),
    );

  rpcRequest = (nonce: NONCE, request: RpcRequestMtM["payload"]) =>
    extractPayload(
      callMain({
        nonce,
        type: "rpc-request",
        payload: request,
      }),
    );

  saveBitcoinCoreConnectionConfigurations = (
    nonce: NONCE,
    connectionConfigurations: RpcConfigurations | null,
  ) => {};
}

export const ipcService = new IpcService();
