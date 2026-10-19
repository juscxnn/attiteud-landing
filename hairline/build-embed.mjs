import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const kernel = readFileSync(
  resolve(root, ".agents/skills/hairline-create/kernel.js"),
  "utf8"
).trimEnd();
const figure = readFileSync(resolve(root, "hairline/strata.js"), "utf8").trimEnd();
const template = readFileSync(
  resolve(root, "hairline/embed-template.html"),
  "utf8"
);

const html = template
  .replace("/*KERNEL*/", () => `\n${kernel}\n`)
  .replace("/*FIGURE*/", () => `\n${figure}\n`);

mkdirSync(resolve(root, "public/hairline"), { recursive: true });
writeFileSync(resolve(root, "public/hairline/strata.html"), html);
console.log("wrote public/hairline/strata.html");
