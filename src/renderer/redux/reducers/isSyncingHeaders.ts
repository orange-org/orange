import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";

export type IsSyncingHeadersState = boolean | null;

export const isSyncingHeaders = createReducer<IsSyncingHeadersState>(
  null,
).handleAction(actions.receiveHeaderSyncParameters, (_state, action) => {
  const {
    headerCount,
    blockCount,
    previousState,
    isInitialBlockDownload,
  } = action.payload;

  // If `isSyncingHeaders` is ever `false` never flip it to `true` again.
  // I think that's how `bitcoind` works.
  //
  // Or if we're not in initial block download, return `false`.
  if (previousState.isSyncingHeaders === false || !isInitialBlockDownload) {
    return false;
  }

  return (
    headerCount !== previousState.headerCount ||
    blockCount === previousState.blockCount
  );
});
