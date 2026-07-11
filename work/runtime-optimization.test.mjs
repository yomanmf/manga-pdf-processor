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
const dockerfile = await readFile(
  new URL("./kindle-uploader/Dockerfile", import.meta.url),
  "utf8"
);
const startScript = await readFile(
  new URL("./kindle-uploader/start.sh", import.meta.url),
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
assert.match(workerSource, /displayRuntimeRunning: isDisplayRuntimeRunning\(\)/);
assert.match(workerSource, /vncRunning: isVncServerRunning\(\)/);
assert.match(workerSource, /await ensureDisplayRuntime\(\)/);
assert.match(workerSource, /async function ensureVncServer\(\)/);
assert.match(workerSource, /await ensureVncServer\(\)/);
assert.match(workerSource, /await stopDisplayRuntime\(\)/);
assert.match(workerSource, /process\.once\("SIGTERM"/);
assert.match(workerSource, /startDisplayProcess\("Xvfb"/);
assert.match(workerSource, /startDisplayProcess\("x11vnc"/);
assert.match(dockerfile, /tini/);
assert.match(dockerfile, /CMD \["\/usr\/bin\/tini", "--", "\/app\/start\.sh"\]/);
assert.doesNotMatch(startScript, /Xvfb|fluxbox|x11vnc/);
assert.match(workerSource, /if \(\s*browserIdleTimer \|\|/);
assert.match(workerSource, /await browserClosing/);
assert.match(
  workerSource,
  /kindleConnected\s*\? queue\.find\(\(item\) => item\.status === "waiting_auth"\)/
);

assert.doesNotMatch(
  workerSource,
  /in library\|recently sent files/
);
assert.match(workerSource, /job\.status = "verifying"/);
assert.match(workerSource, /firstNewEvidence\(/);
assert.match(workerSource, /pdfReferences\.length > 1/);
assert.doesNotMatch(workerSource, /const directRow =/);
assert.match(workerSource, /job\.verificationBaseline = baseline/);
assert.match(workerSource, /job\.resumeVerification/);
assert.match(workerSource, /\/api\/jobs\/:id\/evidence/);
assert.match(workerSource, /getBoundingClientRect\(\)/);
assert.match(workerSource, /sameVisualRow/);
assert.match(
  workerSource,
  /Amazon Add to your library checkbox was not found/
);
assert.match(workerSource, /app\.get\("\/api\/jobs\/:id"/);
assert.match(workerSource, /ticket\.inProgress = true/);
assert.match(
  workerSource,
  /await saveQueue\(\);\s*uploadTickets\.delete\(id\)/
);
assert.match(mainSource, /async function waitForKindleJob\(/);
assert.match(mainSource, /const maxUploadAttempts = 5/);
assert.match(mainSource, /getKindleJobIfExists\(/);
assert.match(
  mainSource,
  /job\.amazonStatus !==\s*"in_library"/
);
assert.match(mainSource, /"\/kindle\/jobs\/:id"/);

console.log("runtime optimization tests passed");
