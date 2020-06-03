import { FeatureFlags } from "_f/FeatureFlags";
import { AwaitBtcd } from "./AwaitBtcd/AwaitBtcd";
import { FixBcoreConnection } from "./FixBcoreConnection/FixBcoreConnection";

export const RpcIssueDialog = FeatureFlags.useBcore
  ? FixBcoreConnection
  : AwaitBtcd;
