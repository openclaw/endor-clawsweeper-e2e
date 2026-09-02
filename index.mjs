import { XMLParser } from "fast-xml-parser";

export function parseDocument(xml) {
  return new XMLParser({ processEntities: true }).parse(xml);
}

const parsed = parseDocument("<fixture><status>ready</status></fixture>");
console.log(JSON.stringify(parsed));
