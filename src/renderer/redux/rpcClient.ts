import { callMain } from "./callMain";

export const rpcClient = async (nonce: __NONCE__, method: string) => {
  const response = await callMain("rpc-request", { nonce, method });

  return response;
};
