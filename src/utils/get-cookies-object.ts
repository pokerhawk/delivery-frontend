/**
 * @description This function uses `document.cookie` to mount an object, it's an alternative to "js-cookie" library because it do too much and a lot of times it simply doesn't get the correct fields.
 */
export function getCookiesObject() {
  if (!document) return;

  const cookies = new Map<string, string>();

  for (const cookie of document.cookie.split("; ")) {
    if (!cookie) continue;

    const [name, value] = cookie.split("=");

    cookies.set(name, value);
  }

  return cookies;
}
