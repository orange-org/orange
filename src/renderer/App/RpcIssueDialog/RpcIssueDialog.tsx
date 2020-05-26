import { featureFlags } from "_f/featureFlags";
import { AwaitBtcd } from "./AwaitBtcd/AwaitBtcd";
import { FixBcoreConnection } from "./FixBcoreConnection/FixBcoreConnection";

export const RpcIssueDialog = featureFlags.useBcore
  ? FixBcoreConnection
  : AwaitBtcd;
