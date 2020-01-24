import { TSelected } from "react-redux";
import { State } from "_r/redux/reducers";

declare module "react-redux" {
  export function useSelector<TSelected>(
    selector: (state: State) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;
}
