import { RpcConfigurations } from "_t/IpcMessages";

export const calculateUseCookieAuthentication = (
  rpcConfigurations: RpcConfigurations,
) => "cookieFile" in rpcConfigurations;
