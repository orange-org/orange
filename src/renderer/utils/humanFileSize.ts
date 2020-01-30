/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// https://stackoverflow.com/a/14919494/604296
const thresh = 1024;
const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export const humanFileSize = (bytes: number) => {
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  let u = -1;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);

  return `${bytes.toFixed(1)} ${units[u]}`;
};
