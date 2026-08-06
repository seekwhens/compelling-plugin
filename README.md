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

## Requirements

A [Compelling](https://compelling.ai) account. Reading data is free; sourcing, contact
discovery, enrichment, and ranking draw on your workspace's credit balance.

## Installation

Installation depends on your client — any Agent Plugins-compatible client can load this
directory. The plugin follows the [Agent Plugins specification](https://agent-plugins.org/specification) v1.0.0.

## Structure

```
plugin.json            # plugin manifest
mcp.json               # remote MCP server declaration
skills/
  build-tam-list/SKILL.md
  enrich-contacts/SKILL.md
  rank-by-icp/SKILL.md
```
