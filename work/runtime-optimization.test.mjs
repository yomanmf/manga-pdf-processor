import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const mainSource = await readFile(
  new URL("./manga-pdf-processor/index.ts", import.meta.url),
  "utf8"
);
const workerSource = await readFile(
  new URL("./kindle-uploader/server.mjs", import.meta.url),
  "utf8"
);

assert.match(mainSource, /"visibilitychange"/);
assert.match(mainSource, /if \(document\.hidden\)/);
assert.match(mainSource, /stopKindleStatusPolling\(\)/);
assert.match(mainSource, /startKindleStatusPolling\(true\)/);

assert.doesNotMatch(
  workerSource,
  /\.then\(\(\) => ensureBrowser\(\)\)/
);
assert.match(workerSource, /browserRunning: isBrowserRunning\(\)/);
assert.match(workerSource, /if \(\s*browserIdleTimer \|\|/);
assert.match(workerSource, /await browserClosing/);
assert.match(
  workerSource,
  /kindleConnected\s*\? queue\.find\(\(item\) => item\.status === "waiting_auth"\)/
);

console.log("runtime optimization tests passed");
