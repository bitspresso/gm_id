export function normalizeUrl(url) {
  return url.replaceAll("https://", "").replaceAll("http://", "").split("/")[0];
}
