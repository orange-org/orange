const keyEqualsValue = <T extends { [P in keyof T]: P }>(o: T) => o;

export const testIds = keyEqualsValue({
  tbd: "tbd",
} as const);
