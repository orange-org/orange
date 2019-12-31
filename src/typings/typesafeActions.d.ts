import { ActionType } from "typesafe-actions";

export type RootAction = ActionType<typeof import("../renderer/redux/actions")>;

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction;
  }
}
