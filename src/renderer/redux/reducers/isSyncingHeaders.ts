import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";

export type IsSyncingHeadersState = boolean | null;

export const isSyncingHeaders = createReducer<IsSyncingHeadersState>(
  null,
).handleAction(actions.receiveHeaderSyncParameters, (state, action) => {
  return !state || !action.payload.headerCount
    ? null
    : !!action.payload.headerCount;
});
