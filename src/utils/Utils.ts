/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import moment from "moment";

export class Utils {
  static secondsTimestampToFormattedDate = (momentInput: number) =>
    moment(momentInput * 1000).format("llll");

  static fromNow = (momentInput: number) =>
    moment(momentInput * 1000).fromNow();

  static pluralize = (quantity: number, singular: string, plural: string) =>
    quantity === 1 ? /* istanbul ignore next */ singular : plural;

  static convertBitcoinToSatoshi = (amount: number) =>
    amount * 1000 * 1000 * 100;

  static generateUuid = (a: string = ""): string =>
    a
      ? /* eslint-disable no-bitwise */
        ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
      : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(
          /[018]/g,
          Utils.generateUuid,
        );

  // https://stackoverflow.com/a/14919494/604296
  static humanFileSize = (bytes: number) => {
    const thresh = 1000;
    const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

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

  static isValidUrl = (url: string) => {
    try {
      // eslint-disable-next-line no-new
      new URL(url);

      return true;
    } catch (e) {
      return false;
    }
  };
}
