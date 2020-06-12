/* eslint-disable import/no-default-export */
import { Action, AnyAction, Store } from "redux";
import { State } from "_r/redux/ReducerCreator";
import { SwitchProps } from "@material-ui/core";
import { GetState } from "./typeHelpers";

declare module "react-redux" {
  export function useSelector<TSelected>(
    selector: (state: State) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;

  export function useStore<S = State, A extends Action = AnyAction>(): Store<
    S,
    A
  >;
}

type ThunkType<T> = (dispatch: T, getState: GetState) => Promise<any>;
declare module "redux" {
  export interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T extends ThunkType<Dispatch> ? ReturnType<T> : T;
  }
}

declare module "@material-ui/core/Switch" {
  export default function Switch(
    props: SwitchProps & {
      inputProps: SwitchProps["inputProps"] & { "data-testid"?: string };
    },
  ): JSX.Element;
}
