import { Store, Action, AnyAction } from "redux";
import { State } from "_r/redux/reducers/reducer";

declare module "react-redux" {
  // import { Action, AnyAction, Store } from "react-redux";

  export function useSelector<TSelected>(
    selector: (state: State) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;

  export function useStore<S = State, A extends Action = AnyAction>(): Store<
    S,
    A
  >;
}
