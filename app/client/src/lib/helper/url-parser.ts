import { Empty } from "../config/type";

export function urlParser(
  url: string,
  query?: Record<string, any> | Empty
): string {
  const target = new URL(url);

  if (query) {
    target.search = new URLSearchParams(query).toString();
  }

  return target.href;
}
