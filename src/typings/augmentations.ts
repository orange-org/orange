import { Action, AnyAction, Store } from "redux";
import { State } from "_r/redux/reducers/reducer";
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
type CachableThunk<T> = {
  thunk: ThunkType<T>;
  cacheDuration: number;
};
declare module "redux" {
  export interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T extends ThunkType<Dispatch>
      ? ReturnType<T>
      : T extends CachableThunk<Dispatch>
      ? ReturnType<T["thunk"]>
      : T;
  }
}
