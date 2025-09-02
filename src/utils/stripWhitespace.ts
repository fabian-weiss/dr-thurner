export function stripWhitespace(href: string) {
  if (typeof href !== "string") return href;
  return href.replace(/\s+/g, "");
}
