#!/usr/bin/env node
// Generates the client-specific manifests from the root plugin.json (single source of truth).
//
//   node scripts/sync-manifests.mjs          write generated manifests
//   node scripts/sync-manifests.mjs --check  exit 1 if any manifest is out of sync
//
// Edit plugin.json only; never hand-edit the generated files listed in TARGETS.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = "assets/logo.png";
const MCP_URL = "https://mcp.compelling.ai";

const root = JSON.parse(readFileSync(join(ROOT, "plugin.json"), "utf8"));
const { interface: openaiInterface, ...openaiRest } = root.extensions["com.openai"];

const common = {
  version: root.version,
  description: root.description,
  author: root.author,
  homepage: root.homepage,
  repository: root.repository,
  license: root.license,
  keywords: root.keywords,
};

// Claude Code: .claude-plugin/plugin.json (MCP via .mcp.json, skills via default discovery)
const claude = {
  name: root.name,
  displayName: openaiInterface.displayName,
  ...common,
};

// OpenAI Codex / ChatGPT Plugin Directory: interface at top level, review data under extensions
const codex = {
  name: root.name,
  version: root.version,
  description: root.description,
  author: root.author,
  skills: "./skills/",
  mcpServers: "./.mcp.json",
  interface: openaiInterface,
  extensions: { "com.openai": openaiRest },
  keywords: root.keywords,
};

// Cursor (also read by Grok Bot): MCP inline with explicit http transport.
// displayName is accepted by Cursor's manifest schema but not yet in its public docs.
const cursor = {
  name: root.name,
  displayName: openaiInterface.displayName,
  ...common,
  author: { name: root.author.name },
  logo: LOGO,
  skills: "./skills/",
  mcpServers: { [root.name]: { type: "http", url: MCP_URL } },
};

// Cursor / Grok Bot look for .cursor-plugin/marketplace.json first, then .claude-plugin/marketplace.json
const cursorMarketplace = {
  name: root.name,
  owner: { name: root.author.name },
  metadata: { description: `Official ${openaiInterface.displayName} plugin marketplace.` },
  plugins: [
    {
      name: root.name,
      source: "./",
      description: root.description,
      version: root.version,
      logo: LOGO,
      category: openaiInterface.category,
    },
  ],
};

const TARGETS = {
  ".claude-plugin/plugin.json": claude,
  ".codex-plugin/plugin.json": codex,
  ".cursor-plugin/plugin.json": cursor,
  ".cursor-plugin/marketplace.json": cursorMarketplace,
};

const check = process.argv.includes("--check");
let stale = [];

for (const [rel, data] of Object.entries(TARGETS)) {
  const path = join(ROOT, rel);
  const next = JSON.stringify(data, null, 2) + "\n";
  const current = existsSync(path) ? readFileSync(path, "utf8") : null;
  if (current === next) continue;
  if (check) {
    stale.push(rel);
  } else {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, next);
    console.log(`updated ${rel}`);
  }
}

if (stale.length) {
  console.error(`Out of sync with plugin.json: ${stale.join(", ")}`);
  console.error("Run: node scripts/sync-manifests.mjs");
  process.exit(1);
}
if (check) console.log(`All ${Object.keys(TARGETS).length} generated manifests match plugin.json ${root.version}.`);
