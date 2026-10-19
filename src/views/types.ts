export type ViewId = "index" | "company" | "ventures" | "contact";

export const VIEW_IDS: ViewId[] = ["index", "company", "ventures", "contact"];

export function parseViewHash(): ViewId {
  const hash = window.location.hash.replace("#", "") as ViewId;
  return VIEW_IDS.includes(hash) ? hash : "index";
}
