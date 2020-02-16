import { rpcClientMockResponses } from "./RpcClientMockResponses";

export const rpcClient = (_nonce: any, request: any) => {
  const response = rpcClientMockResponses.popResponseFor(request);

  if (!response) {
    throw new Error(
      `No response found for request: ${JSON.stringify(request, null, 2)}`,
    );
  }

  const error = response && (response as any).error;
  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
};
