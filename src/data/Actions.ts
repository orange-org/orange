import { createAction } from "typesafe-actions";
import { State } from "./ReducerCreator";

export class Actions {
  static setState = createAction("SET_STATE")<State>();
}
