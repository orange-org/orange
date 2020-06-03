/* eslint-disable import/export */
import {
  ActionType,
  TypeConstant,
  ActionCreatorBuilder,
} from "typesafe-actions";

export type RootAction = ActionType<typeof import("../renderer/redux/Actions")>;

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
