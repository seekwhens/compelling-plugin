# Compelling — Agent Plugin

Find and qualify B2B target companies with [Compelling](https://compelling.ai) AI research
agents, directly from ChatGPT, Codex or another connected client. Research Germany, Austria
and Switzerland (DACH), including Mittelstand and industrial markets, or your chosen market
elsewhere. Build lists using your own criteria, find decision-makers, research custom signals
and prioritize accounts using an explicit customer-fit rubric.

Developed in Cologne, Germany. Compelling uses European infrastructure. Saved results remain
in your Compelling workspace, where you can use its native CRM integrations.

This is an [Agent Plugin](https://agent-plugins.org) bundling:

- **MCP server** — the remote Compelling MCP at `https://mcp.compelling.ai` (Streamable HTTP,
  OAuth). Connect with your Compelling account; the connection is scoped to your workspace.
- **Skills** — playbooks that teach your agent to use Compelling well:
  - `build-tam-list` — find target companies by geography and custom criteria
  - `enrich-contacts` — research company data and buying signals, or find and enrich decision-makers
  - `rank-by-icp` — prioritize target companies with explicit, weighted customer-fit criteria
  - `feedback` — report a bug or rough edge from right inside your agent

## Requirements

A [Compelling](https://compelling.ai) account. Reading data is free; sourcing, contact
discovery, enrichment, and ranking draw on your workspace's credit balance.

## Install in Claude Code

```
/plugin marketplace add seekwhens/compelling-plugin
/plugin install compelling@compelling
```

Then connect the `compelling` MCP server with your Compelling account (OAuth) when prompted.

## Install in Cursor / Grok Bot

Once listed in the Cursor Marketplace: Customize → search **Compelling** → Install.

Until then, load locally:

```bash
ln -s /path/to/compelling-plugin ~/.cursor/plugins/local/compelling
```

Then reload the window and open Customize. Connect the MCP with your Compelling account (OAuth).

Setup docs: https://compelling.notion.site/Compelling-MCP-3cfc763a76238174a7aaf14f7e6353fb

## Install in Codex

Add the marketplace, then install the plugin:

```bash
codex plugin marketplace add seekwhens/compelling-plugin
codex plugin add compelling@compelling
```

For a local checkout, use `codex plugin marketplace add /absolute/path/to/compelling-plugin`
and the same install command. Start a new session, then connect the `compelling` MCP server
with your Compelling account (OAuth). Existing-plugin update packages preserve the original
MCP server declaration. Versions 0.3.6 and 0.3.7 added explicit OAuth scopes and can
be rejected as a server-configuration change when replacing an existing installation.

## ChatGPT

Once listed, install Compelling from the Plugin Directory at https://chatgpt.com/plugins.

Until then, add it in developer mode: Plugins, Create app, server URL `https://mcp.compelling.ai`,
authentication OAuth. Then connect with your Compelling account and pick your workspace.

## Other clients

Any [Agent Plugins](https://agent-plugins.org/specification)-compatible client can load this
directory (spec v1.0.0) — the spec's client list includes VS Code, Cursor, GitHub Copilot,
ChatGPT/Codex, and Kiro. The repo additionally ships the Claude Code plugin layout
(`.claude-plugin/`), so both ecosystems resolve the same skills and MCP server.

## Structure

```
plugin.json                        # Agent Plugins manifest (agent-plugins.org)
mcp.json                           # Agent Plugins MCP declaration
.claude-plugin/plugin.json         # Claude Code plugin manifest
.claude-plugin/marketplace.json    # Claude Code marketplace catalog (this repo)
.mcp.json                          # Claude Code MCP declaration
.codex-plugin/plugin.json          # OpenAI Codex plugin manifest (icon, display name)
.agents/plugins/marketplace.json   # OpenAI Codex marketplace catalog (this repo)
assets/logo.png                    # Plugin icon
skills/
  build-tam-list/SKILL.md
  enrich-contacts/SKILL.md
  rank-by-icp/SKILL.md
  feedback/SKILL.md
```
