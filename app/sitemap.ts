import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const APP_DIR = path.join(process.cwd(), "app");
const BASE_URL = "https://calc-tech.com";

// Top-level folders that should never appear in the sitemap.
const EXCLUDED_TOP_LEVEL = new Set([
  "api",
  "components",
  "extensions", // walked separately
  "chat", // served on ppltok.com via host rewrite, not a canonical calc-tech page
  "random-chat",
  "site-map", // internal HTML sitemap page if desired; remove from set to include
]);

// Reads a layout.tsx (if present) and returns true when it declares index: false.
function isNoIndex(dir: string): boolean {
  const layout = path.join(dir, "layout.tsx");
  if (!fs.existsSync(layout)) return false;
  const src = fs.readFileSync(layout, "utf8");
  // crude but reliable: matches `index: false` inside a robots block
  return /index\s*:\s*false/.test(src);
}

function hasPage(dir: string): boolean {
  return (
    fs.existsSync(path.join(dir, "page.tsx")) ||
    fs.existsSync(path.join(dir, "page.ts")) ||
    fs.existsSync(path.join(dir, "page.jsx")) ||
    fs.existsSync(path.join(dir, "page.js"))
  );
}

// Recursively collects route paths (relative to /app) for every folder that has a page file
// and is not marked noindex. Skips dynamic segments and private folders.
function collectRoutes(dir: string, routePrefix: string, out: string[]): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith(".")) continue;
    if (name.startsWith("[") || name.startsWith("(")) continue; // dynamic / route groups
    const full = path.join(dir, name);
    const route = `${routePrefix}/${name}`;
    if (hasPage(full) && !isNoIndex(full)) {
      out.push(route);
    }
    collectRoutes(full, route, out);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: BASE_URL,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Top-level calculator pages
  const topLevel = fs
    .readdirSync(APP_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter(
      (name) =>
        !EXCLUDED_TOP_LEVEL.has(name) &&
        !name.startsWith("_") &&
        !name.startsWith(".") &&
        !name.startsWith("[") &&
        !name.startsWith("(")
    );

  for (const name of topLevel) {
    const dir = path.join(APP_DIR, name);
    if (hasPage(dir) && !isNoIndex(dir)) {
      entries.push({
        url: `${BASE_URL}/${name}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    // include indexable subpages (e.g. /read-aloud-tts/welcome, /privacy/<slug>)
    const subRoutes: string[] = [];
    collectRoutes(dir, `/${name}`, subRoutes);
    for (const route of subRoutes) {
      entries.push({
        url: `${BASE_URL}${route}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Extension pages — only those that don't carry index: false
  const extDir = path.join(APP_DIR, "extensions");
  if (fs.existsSync(extDir)) {
    const exts = fs
      .readdirSync(extDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const ext of exts) {
      const dir = path.join(extDir, ext);
      const baseRoute = `/extensions/${ext}`;
      if (hasPage(dir) && !isNoIndex(dir)) {
        entries.push({
          url: `${BASE_URL}${baseRoute}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.9,
        });
      }
      const subRoutes: string[] = [];
      collectRoutes(dir, baseRoute, subRoutes);
      for (const route of subRoutes) {
        entries.push({
          url: `${BASE_URL}${route}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
