import moment from "moment";

export const formatDate = (momentInput: moment.MomentInput) => {
  return moment(momentInput).format("llll");
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
