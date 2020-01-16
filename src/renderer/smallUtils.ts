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
