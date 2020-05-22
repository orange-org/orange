import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { respondToRenderer } from "_m/respondToRenderer";
import { getRpcConfigurationsFromDisk } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcConfigurationsFromDisk";
import { getRpcCredentialsFromCookie } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcCredentialsFromCookie";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";
import { SendableMessageToMain } from "_t/IpcMessages";
import { RpcResponse } from "_t/RpcResponses";
import { getDefaultRpcConfigurations } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getDefaultRpcConfigurations";

export const handleCreateWalletAndSetSeed = async (
  data: Extract<SendableMessageToMain, { type: "createWalletAndSetSeed" }>,
) => {
  await mainRpcClient();
};
