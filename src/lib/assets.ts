import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Does a file actually sit in /public?
 *
 * Resolved on the server while the page renders, so a missing photograph never
 * reaches the browser as a request that 404s — the component swaps in its
 * designed stand-in instead. Server components only.
 */
export function hasPublicFile(publicPath: string): boolean {
  if (!publicPath) return false;
  return existsSync(path.join(process.cwd(), "public", publicPath));
}
