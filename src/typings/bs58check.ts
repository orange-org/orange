/* eslint-disable import/no-default-export */

declare module "bs58check" {
  export function decode(s: string): Buffer;
  export function encode(b: Buffer): string;
}
