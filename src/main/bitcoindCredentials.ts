import { randomBytes } from "crypto";
import { isDevelopment } from "./isDevelopment";

export const username = isDevelopment ? 1 : randomBytes(16).toString("base64");
export const password = isDevelopment ? 1 : randomBytes(16).toString("base64");
