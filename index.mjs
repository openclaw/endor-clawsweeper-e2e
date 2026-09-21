import { XMLParser } from "fast-xml-parser";
import lodash from "lodash";

export function parseDocument(xml) {
  return new XMLParser({ processEntities: true }).parse(xml);
}

const parsed = parseDocument("<fixture><status>ready</status></fixture>");
console.log(JSON.stringify(parsed));

// Exercise the intentionally vulnerable dependency with fixed, harmless input only.
const renderStatus = lodash.template("Lodash fixture: <%= status %>");
console.log(renderStatus({ status: "ready" }));
