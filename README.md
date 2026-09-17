# Compelling — Agent Plugin

Build lead lists and automate enrichment with [Compelling](https://compelling.ai) AI agents,
directly from your coding or chat agent.

This is an [Agent Plugin](https://agent-plugins.org) bundling:

- **MCP server** — the remote Compelling MCP at `https://mcp.compelling.ai` (Streamable HTTP,
  OAuth). Connect with your Compelling account; the connection is scoped to your workspace.
- **Skills** — playbooks that teach your agent to use Compelling well:
  - `build-tam-list` — source a target market into a fresh list
  - `enrich-contacts` — find decision-makers and research emails, LinkedIn profiles, or any custom data point
  - `rank-by-icp` — score accounts 0-100 against your ICP and read the list sorted by fit
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

## Other clients

Any [Agent Plugins](https://agent-plugins.org/specification)-compatible client can load this
directory (spec v1.0.0). The repo additionally ships the Claude Code plugin layout
(`.claude-plugin/`), so both ecosystems resolve the same skills and MCP server.

## Structure

```
plugin.json                        # Agent Plugins manifest (agent-plugins.org)
mcp.json                           # Agent Plugins MCP declaration
.claude-plugin/plugin.json         # Claude Code plugin manifest
.claude-plugin/marketplace.json    # Claude Code marketplace catalog (this repo)
.mcp.json                          # Claude Code MCP declaration
skills/
  build-tam-list/SKILL.md
  enrich-contacts/SKILL.md
  rank-by-icp/SKILL.md
  feedback/SKILL.md
```
