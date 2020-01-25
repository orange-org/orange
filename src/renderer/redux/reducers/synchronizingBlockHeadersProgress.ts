import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";

export type SynchronizingBlockHeadersProgressState = number | null;

export const synchronizingBlockHeadersProgress = createReducer<
  SynchronizingBlockHeadersProgressState
>(null).handleAction(actions.setBlockchainInfo, (state, action) => {
  return !state || !action.payload.headers
    ? null
    : state + action.payload.headers;
});
