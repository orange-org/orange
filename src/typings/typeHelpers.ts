export type OrUndefined<TypeWithKeys> = {
  [Key in keyof TypeWithKeys]: TypeWithKeys[Key] | undefined;
};
