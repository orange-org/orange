/* eslint-disable no-underscore-dangle */

interface NONCE extends string {
  // Add a property with a random key
  // to throw off TypeScript's duck typing
  // and make it insist on __NONCE__ type
  // specifically rather than any string
  asdlj289amcagwajfs84jcmxaoeur: "";
}

declare const __NONCE__: NONCE;
