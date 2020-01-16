import { randomBytes } from "crypto";

export const username = randomBytes(16).toString("base64");
export const password = randomBytes(16).toString("base64");
