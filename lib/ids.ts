import crypto from "crypto";

export function makeId(prefix: "x" | "s" | "t" | "c") {
  const rand = crypto.randomBytes(8).toString("hex"); // 16 chars
  return `${prefix}_${rand}`;
}
