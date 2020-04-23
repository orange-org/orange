import { PromiseType } from "_t/typeHelpers";
import { callMain } from "./callMain";

const extractPayload = async <T extends ReturnType<typeof callMain>>(
  message: T,
): Promise<PromiseType<T>["payload"]> => {
  const { payload } = await message;
  return payload;
};

const s = extractPayload(
  callMain({
    nonce: __NONCE__,
    type: "get-cookie-file-from-open-dialog",
  }),
);

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
}

export const ipcService = new IpcService();
