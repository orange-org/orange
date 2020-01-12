export type OrUndefined<TypeWithKeys> = {
  [Key in keyof TypeWithKeys]: TypeWithKeys[Key] | undefined;
};

export type ValuesOf<T extends any[]> = T[number];
