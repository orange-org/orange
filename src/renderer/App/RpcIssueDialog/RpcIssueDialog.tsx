import { featureFlags } from "src/featureFlags/featureFlags";
import { AwaitBtcd } from "./AwaitBtcd/AwaitBtcd";
import { FixBcoreConnection } from "./FixBcoreConnection/FixBcoreConnection";

export const RpcIssueDialog = featureFlags.useBcore
  ? FixBcoreConnection
  : AwaitBtcd;
