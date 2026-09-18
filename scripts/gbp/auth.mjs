// Dependency-free GBP auth: mints an access token from the shared OAuth refresh
// token (see gbp-operations playbook §1). Config is gitignored gbp-config.json.
import { readFileSync } from "node:fs";

export const config = JSON.parse(readFileSync(new URL("../../gbp-config.json", import.meta.url), "utf8"));
const oauth = JSON.parse(readFileSync(config.oauthPath, "utf8"));

let token;
export async function accessToken() {
  if (token) return token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: oauth.client_id,
      client_secret: oauth.client_secret,
      refresh_token: oauth.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`token: ${res.status} ${await res.text()}`);
  token = (await res.json()).access_token;
  return token;
}

export async function gbp(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { authorization: `Bearer ${await accessToken()}`, "content-type": "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${init.method || "GET"} ${url}\n${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

export const V1 = "https://mybusinessbusinessinformation.googleapis.com/v1";
