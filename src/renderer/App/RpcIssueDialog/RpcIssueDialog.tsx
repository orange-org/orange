import { FeatureFlags } from "src/FeatureFlags/FeatureFlags";
import { AwaitBtcd } from "./AwaitBtcd/AwaitBtcd";
import { FixBcoreConnection } from "./FixBcoreConnection/FixBcoreConnection";

export const RpcIssueDialog = FeatureFlags.useBcore
  ? FixBcoreConnection
  : AwaitBtcd;
