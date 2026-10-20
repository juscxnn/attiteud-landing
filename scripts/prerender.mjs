import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const markup = render();
  const file = "dist/index.html";
  const html = await readFile(file, "utf8");

  if (!html.includes('<div id="root"></div>')) {
    throw new Error("Prerender root placeholder not found in dist/index.html");
  }

  await writeFile(
    file,
    html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  );
  console.log("Prerendered the site into dist/index.html");
} finally {
  await vite.close();
}
