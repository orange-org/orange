/* eslint-disable import/export */
import { ActionType } from "typesafe-actions";
import {
  TypeConstant,
  ActionCreatorBuilder,

  // I don't see this being used in the file but for some reason if I remove it, the typing
  // of `createAction` doesn't work as expected
  ActionBuilder,
} from "typesafe-actions/dist/type-helpers";

export type RootAction = ActionType<typeof import("../renderer/redux/actions")>;

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction;
  }

  export declare function createAction<TType extends TypeConstant>(
    type: TType,
  ): <TPayload = undefined, TMeta = undefined>() => ActionCreatorBuilder<
    TType,
    TPayload | undefined,
    TMeta
  >;
}
