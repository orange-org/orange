import { DeepPartial } from "redux";
import { RpcConfigurations } from "./IpcMessages";

export type Configurations = DeepPartial<{
  rpc: RpcConfigurations | null;
}>;
