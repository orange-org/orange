/* eslint-disable import/export */
import {
  ActionType,
  TypeConstant,
  ActionCreatorBuilder,
} from "typesafe-actions";

export type WalletActions = ActionType<typeof import("../data/WalletActions")>;

declare module "typesafe-actions" {
  interface Types {
    RootAction: WalletActions;
  }

  export function createAction<TType extends TypeConstant>(
    type: TType,
  ): <TPayload = undefined, TMeta = undefined>() => ActionCreatorBuilder<
    TType,
    TPayload | null,
    TMeta
  >;
}
