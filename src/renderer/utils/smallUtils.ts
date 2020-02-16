/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import moment from "moment";

export const formatDate = (momentInput: moment.MomentInput) => {
  return moment(momentInput).format("llll");
};

export const fromNow = (momentInput: moment.MomentInput) => {
  return moment(momentInput).fromNow();
};

export const pluralize = (
  quantity: number,
  singular: string,
  plural: string,
) => {
  return quantity === 1 ? /* istanbul ignore next */ singular : plural;
};

export const generateUuid = (a: string = ""): string =>
  a
    ? /* eslint-disable no-bitwise */
      ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, generateUuid);

// https://stackoverflow.com/a/14919494/604296
const thresh = 1024;
const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
export const humanFileSize = (bytes: number) => {
  /* istanbul ignore next */
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  let u = -1;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.abs(bytes) >= thresh &&
    /* istanbul ignore next */ u < units.length - 1
  );

  return `${bytes.toFixed(1)} ${units[u]}`;
};
