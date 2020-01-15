export type OrUndefined<TypeWithKeys> = {
  [Key in keyof TypeWithKeys]: TypeWithKeys[Key] | undefined;
};

export type ValuesOf<T extends any[]> = T[number];

export type AllKeys<T> = T extends T ? keyof T : never;

export type OmitDistributed<T, K extends AllKeys<T>> = T extends T
  ? Pick<T, Exclude<keyof T, K>>
  : never;
