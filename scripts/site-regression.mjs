import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const routes = [
  ["flights", "/flights/"], ["hotels", "/hotels/"], ["holidays", "/holidays/"],
  ["visa", "/visa/"], ["umrah-packages", "/umrah-packages/"], ["about-us", "/about-us/"],
  ["contact-us", "/contact-us/"], ["privacy-policy", "/privacy-policy/"],
  ["terms-and-conditions", "/terms-and-conditions/"], ["refund-policy", "/refund-policy/"],
  ["payment-method", "/payment-method/"], ["blog", "/blog/"],
  ["blog/corporate-travel-cost-control", "/blog/corporate-travel-cost-control/"],
  ["request-service", "/request-service/"]
];
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
const app = read("app.js");
const home = read("index.html");
assert.match(home, /rel="canonical" href="https:\/\/traveltoknow\.com\.bd\//);
assert.match(home, /application\/ld\+json/);
assert.match(app, /function updatePageMetadata\(route\)/);
assert.match(app, /const ASSET = "\/";/, "assets must resolve from site root on nested routes");
assert.match(app, /noindex, nofollow/);
assert.doesNotMatch(app, /No offer found/i);
assert.match(robots, /Sitemap: https:\/\/traveltoknow\.com\.bd\/sitemap\.xml/);
assert.match(robots, /Disallow: \/sign-in\//);
for (const [slug, url] of routes) {
  const html = read(path.join(slug, "index.html"));
  assert.match(html, /<title>[^<]+<\/title>/, slug + ": title");
  assert.match(html, /name="description" content="[^"]+"/, slug + ": description");
  assert.ok(html.includes("https://traveltoknow.com.bd" + url), slug + ": canonical");
  assert.ok(sitemap.includes("https://traveltoknow.com.bd" + url), slug + ": sitemap entry");
}
console.log("SEO regression checks passed: homepage + " + routes.length + " route pages, canonical tags, metadata, schema, robots and sitemap.");
