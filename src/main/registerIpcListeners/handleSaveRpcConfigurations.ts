import { SendableMessageToMain } from "_t/IpcMessages";
import { writeConfigurations } from "_m/writeConfigurations";

export const handleSaveRpcConfigurations = async (
  data: Extract<SendableMessageToMain, { type: "save-rpc-configurations" }>,
) => {
  // const { connectionConfigurations } = data.payload;
  // if (connectionConfigurations) {
  //   if ("cookieFile" in connectionConfigurations) {
  //     await writeConfigurations({
  //       cookieFile: connectionConfigurations.cookieFile,
  //       serverUrl: connectionConfigurations.serverUrl,
  //     });
  //   } else {
  //     await writeConfigurations({
  //       username: connectionConfigurations.username,
  //       password: connectionConfigurations.password,
  //       serverUrl: connectionConfigurations.serverUrl,
  //     });
  //   }
  // } else {
  //   throw new TypeError("No connection configurations were provided");
  // }
};
