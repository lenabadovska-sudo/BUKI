# meta-ad-library-mcp-server

Local, project-scoped MCP server wrapping the Meta Ad Library API (`ads_archive`) — read-only competitive ad research for BUKI. One tool: `search_ads`.

Consumed by `.claude/agents/ad-creative-agent.md`, which discovers it via `ToolSearch` rather than hardcoding a namespace.

## Setup

```bash
cd "mcp-servers/meta-ad-library"
npm install
npm run build
```

Requires `META_ACCESS_TOKEN` in the project root `.env` (a long-lived Meta user access token with the `ads_read` scope). It is loaded automatically — never hardcoded, never logged, never echoed in tool output or error messages.

The server is registered in the project's `.mcp.json` and starts automatically with Claude Code in this project. It does not need to be run manually except for local testing (`npm run dev` or `node dist/index.js`).

## Token lifecycle

Meta long-lived user tokens last ~60 days. When `search_ads` returns "token is invalid or expired," get a new one:

1. https://developers.facebook.com/tools/debug/accesstoken/ → paste current token → Debug → **Extend Access Token**.
2. Copy the new token into `.env` (`META_ACCESS_TOKEN=...`).
3. Restart the MCP server (restart the Claude Code session, or re-run `node dist/index.js` if testing manually) — the token is only read at startup.

## Known API limits (not bugs)

- `impressions_range` is usually `null` for ordinary commercial ads — Meta restricts spend/impressions/audience data to political/social-issue ads. `days_active` (computed from delivery start/stop) is the usable performance proxy instead.
- `ad_reached_countries` is required by Meta's API — always pass at least one 2-letter country code.
