import assert from "node:assert/strict";
import test from "node:test";
import { parseDocument } from "./index.mjs";

test("reads the status from the ordinary fixture document", () => {
  const document = parseDocument("<fixture><status>ready</status></fixture>");

  assert.deepEqual(document, { fixture: { status: "ready" } });
});

test("reads the status through 102 grouping levels", () => {
  // Fixed 1,552-byte document: no DTD, entity expansion, or external input.
  const xml = "<group>".repeat(102)
    + "<status>ready</status>"
    + "</group>".repeat(102);
  let document = parseDocument(xml);

  for (let level = 0; level < 102; level += 1) {
    document = document.group;
  }

  assert.deepEqual(document, { status: "ready" });
});
