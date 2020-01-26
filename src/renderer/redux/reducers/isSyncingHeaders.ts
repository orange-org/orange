import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";

export type IsSyncingHeadersState = boolean | null;

export const isSyncingHeaders = createReducer<IsSyncingHeadersState>(
  null,
).handleAction(actions.receiveHeaderSyncParameters, (_state, action) => {
  const { headerCount, previousHeaderCount } = action.payload;

  return headerCount !== previousHeaderCount;
});
