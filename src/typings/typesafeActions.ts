/* eslint-disable import/export */
import {
  ActionType,
  TypeConstant,
  ActionCreatorBuilder,
  ActionBuilder,
} from "typesafe-actions";

export type RootAction = ActionType<typeof import("../renderer/redux/actions")>;

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction;
  }

  export function createAction<TType extends TypeConstant>(
    type: TType,
  ): <TPayload = undefined, TMeta = undefined>() => ActionCreatorBuilder<
    TType,
    TPayload | null,
    TMeta
  >;
}
