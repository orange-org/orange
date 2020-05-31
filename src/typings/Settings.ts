import { DeepPartial } from "redux";
import { RpcConfigurations } from "./IpcMessages";

export type Settings = DeepPartial<{
  rpc: RpcConfigurations | null;
}>;
