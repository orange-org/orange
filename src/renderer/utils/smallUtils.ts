import moment, { duration } from "moment";
import { Null } from "_t/typeHelpers";

export const formatDate = (momentInput: moment.MomentInput) => {
  return moment(momentInput).format("llll");
};

export const fromNow = (momentInput: moment.MomentInput) => {
  return moment(momentInput).fromNow();
};

export const formatNumber = (
  number: number,
  options?: Intl.NumberFormatOptions,
) => {
  return number.toLocaleString(undefined, options);
};

/**
 * Type guard verifying that a value is non-nullable
 */
export const isNonNull = <T>(val: T): val is NonNullable<T> => {
  return val !== null && val !== undefined;
};

export const isNull = (val: any) => {
  return !isNonNull(val);
};

// const AVERAGE_GPU_HASHES_PER_SECOND = 500;
// const HUMAN_INSTANT_MILLISECONDS = 200;
// export const convertDifficultyRequiredComputers = (difficulty: number) => {
//   return duration(difficulty / AVERAGE_GPU_HASHES_PER_SECOND).humanize();
// };
