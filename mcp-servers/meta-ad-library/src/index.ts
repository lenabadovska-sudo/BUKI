#!/usr/bin/env node
/**
 * MCP server for the Meta Ad Library API (ads_archive) — read-only
 * competitive ad research. One tool: search_ads.
 */

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios, { AxiosError } from "axios";

// --- Load META_ACCESS_TOKEN from the project's .env, regardless of cwd ---
// This file runs from mcp-servers/meta-ad-library/dist/index.js; the project
// root .env lives three directories up from there.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const candidateEnvPaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "../../../.env"),
];
for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const API_BASE_URL = "https://graph.facebook.com/v19.0";
const CHARACTER_LIMIT = 25000;

// --- Types ---

enum AdActiveStatus {
  ACTIVE = "ACTIVE",
  ALL = "ALL",
  INACTIVE = "INACTIVE",
}

const SearchAdsInputSchema = z
  .object({
    search_terms: z
      .string()
      .min(1, "search_terms must not be empty")
      .max(200, "search_terms must not exceed 200 characters")
      .describe(
        "Keyword(s) to search for in ad creative text, e.g. a competitor name or product term (e.g. \"korepetycje\", \"Preply\")."
      ),
    ad_reached_countries: z
      .array(z.string().length(2, "use 2-letter ISO country codes, e.g. \"PL\""))
      .min(1, "at least one country code is required")
      .max(10, "at most 10 country codes per request")
      .describe(
        "ISO 3166-1 alpha-2 country codes the ads reached, e.g. [\"PL\", \"UA\"]. Required by the Meta API."
      ),
    ad_active_status: z
      .nativeEnum(AdActiveStatus)
      .default(AdActiveStatus.ALL)
      .describe(
        "Filter by delivery status: ACTIVE (currently running), INACTIVE (stopped), or ALL (default)."
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(25)
      .describe("Maximum number of ads to return (1-100, default 25)."),
  })
  .strict();

type SearchAdsInput = z.infer<typeof SearchAdsInputSchema>;

interface MetaAd {
  id: string;
  page_id?: string;
  page_name?: string;
  ad_snapshot_url?: string;
  ad_delivery_start_time?: string;
  ad_delivery_stop_time?: string;
  ad_creative_bodies?: string[];
  ad_creative_link_captions?: string[];
  impressions?: { lower_bound?: string; upper_bound?: string };
}

interface AdsArchiveResponse {
  data: MetaAd[];
  paging?: { cursors?: { after?: string }; next?: string };
}

// --- Error handling ---

/**
 * Meta wraps API errors in `{ error: { message, type, code, error_subcode, fbtrace_id } }`.
 * We never echo the access token (it is not present in these error bodies, but
 * we still avoid dumping raw request config which could contain it).
 */
function handleMetaError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: { message?: string; code?: number; error_subcode?: number; type?: string } }>;
    const metaError = axiosError.response?.data?.error;
    const status = axiosError.response?.status;

    if (metaError) {
      const code = metaError.code;
      // OAuthException family: 190 = invalid/expired token, 102 = session invalid
      if (metaError.type === "OAuthException" || code === 190 || code === 102) {
        return (
          "Error: Meta access token is invalid or expired — needs re-authorization. " +
          "Generate a new token (with ads_read scope) and update META_ACCESS_TOKEN in .env, " +
          "then restart this MCP server. " +
          `(Meta said: ${metaError.message ?? "no message"})`
        );
      }
      // 4 = app-level rate limit, 17 = user rate limit, 32 = page rate limit
      if (code === 4 || code === 17 || code === 32 || status === 429) {
        return (
          "Error: Rate limited by the Meta Ad Library API. Wait a few minutes before " +
          "retrying — do not retry immediately in a loop. " +
          `(Meta said: ${metaError.message ?? "no message"})`
        );
      }
      if (status === 400) {
        return `Error: Invalid search parameters. ${metaError.message ?? "Check search_terms and ad_reached_countries."}`;
      }
      return `Error: Meta Ad Library API request failed (status ${status ?? "unknown"}): ${metaError.message ?? "no message"}`;
    }

    if (axiosError.code === "ECONNABORTED") {
      return "Error: Request to Meta Ad Library API timed out. Please try again.";
    }
    return `Error: Meta Ad Library API request failed with status ${status ?? "unknown"}.`;
  }
  return `Error: Unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`;
}

// --- API client ---

const AD_FIELDS = [
  "id",
  "page_id",
  "page_name",
  "ad_snapshot_url",
  "ad_delivery_start_time",
  "ad_delivery_stop_time",
  "ad_creative_bodies",
  "ad_creative_link_captions",
  "impressions",
].join(",");

async function fetchAds(params: SearchAdsInput): Promise<AdsArchiveResponse> {
  const response = await axios.get<AdsArchiveResponse>(`${API_BASE_URL}/ads_archive`, {
    timeout: 30000,
    params: {
      search_terms: params.search_terms,
      ad_reached_countries: JSON.stringify(params.ad_reached_countries),
      ad_active_status: params.ad_active_status,
      ad_type: "ALL",
      limit: params.limit,
      fields: AD_FIELDS,
      access_token: META_ACCESS_TOKEN,
    },
  });
  return response.data;
}

// --- Server ---

const server = new McpServer({
  name: "meta-ad-library-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "search_ads",
  {
    title: "Search Meta Ad Library",
    description: `Search Meta's public Ad Library (ads_archive) for ads matching a keyword, in given countries.

Read-only competitive ad research — this does NOT touch campaign management, spend, or any write operations on the Meta Marketing API. Use it to find what a competitor (or a search term) is currently or recently advertising on Facebook/Instagram.

Args:
  - search_terms (string, required): keyword to match against ad creative text, e.g. a competitor brand name.
  - ad_reached_countries (string[], required): 2-letter ISO country codes the ads reached, e.g. ["PL", "UA"].
  - ad_active_status ('ACTIVE' | 'INACTIVE' | 'ALL', default 'ALL'): filter by whether the ad is currently running.
  - limit (number, default 25, max 100): max ads to return.

Returns JSON with:
  {
    "count": number,              // ads returned in this response
    "ads": [
      {
        "id": string,
        "page_name": string | null,       // advertiser page name, if Meta returned it
        "ad_snapshot_url": string | null, // link to view the actual ad creative
        "ad_delivery_start_time": string | null,
        "ad_delivery_stop_time": string | null,   // null/absent if still active
        "hooks": string[],                // ad_creative_bodies — the ad copy text
        "link_captions": string[],
        "impressions_range": { "lower_bound": string, "upper_bound": string } | null,
        "days_active": number | null      // computed: delivery_stop - delivery_start in days (proxy for ad performance — longer-running ads are more likely to be working)
      }
    ],
    "has_more": boolean,
    "note": string | null            // present if impressions data was unavailable for this query (common for non-political/non-social-issue ads — Meta restricts spend/impressions/audience fields to that category) or if results were truncated
  }

Notes on data limits (Meta API restriction, not a bug in this tool):
  - impressions_range is frequently null for ordinary commercial ads — Meta only reliably exposes it for political/social-issue ads. Don't treat a null impressions_range as "no data available," it's an expected limit of what this endpoint discloses for regular ads.
  - days_active (computed from delivery start/stop) is the best available proxy for "is this ad performing" — a long-running ad is more likely working than a freshly-launched one.

Examples:
  - Use when: "What is Preply currently running in Poland?" -> search_terms="Preply", ad_reached_countries=["PL"]
  - Use when: "Find Superprof ads targeting Ukraine" -> search_terms="Superprof", ad_reached_countries=["UA"]
  - Don't use when: you need spend/budget data (not available via this endpoint for commercial ads) or need to create/manage ads (this tool is read-only).

Error Handling:
  - Returns a clear message distinguishing "token expired/invalid — needs re-authorization" from "invalid search params" from "rate limited — wait before retrying."`,
    inputSchema: SearchAdsInputSchema.shape,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (params: SearchAdsInput) => {
    if (!META_ACCESS_TOKEN) {
      return {
        content: [
          {
            type: "text" as const,
            text:
              "Error: META_ACCESS_TOKEN is not set. Add it to the project's .env file " +
              "(META_ACCESS_TOKEN=...) and restart this MCP server.",
          },
        ],
      };
    }

    try {
      const raw = await fetchAds(params);
      const ads = raw.data ?? [];

      if (!ads.length) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No ads found for search_terms="${params.search_terms}" in ${params.ad_reached_countries.join(", ")}.`,
            },
          ],
        };
      }

      let anyImpressions = false;
      const formattedAds = ads.map((ad) => {
        if (ad.impressions) anyImpressions = true;
        let daysActive: number | null = null;
        if (ad.ad_delivery_start_time) {
          const start = new Date(ad.ad_delivery_start_time).getTime();
          const end = ad.ad_delivery_stop_time
            ? new Date(ad.ad_delivery_stop_time).getTime()
            : Date.now();
          if (!Number.isNaN(start) && !Number.isNaN(end) && end >= start) {
            daysActive = Math.round((end - start) / (1000 * 60 * 60 * 24));
          }
        }
        return {
          id: ad.id,
          page_name: ad.page_name ?? null,
          ad_snapshot_url: ad.ad_snapshot_url ?? null,
          ad_delivery_start_time: ad.ad_delivery_start_time ?? null,
          ad_delivery_stop_time: ad.ad_delivery_stop_time ?? null,
          hooks: ad.ad_creative_bodies ?? [],
          link_captions: ad.ad_creative_link_captions ?? [],
          impressions_range: ad.impressions ?? null,
          days_active: daysActive,
        };
      });

      const output: {
        count: number;
        ads: typeof formattedAds;
        has_more: boolean;
        note: string | null;
      } = {
        count: formattedAds.length,
        ads: formattedAds,
        has_more: Boolean(raw.paging?.next),
        note: anyImpressions
          ? null
          : "impressions_range was not available for any ad in this result — expected for ordinary commercial ads (Meta restricts spend/impressions/audience fields to political/social-issue ads). Use days_active as the performance proxy instead.",
      };

      let text = JSON.stringify(output, null, 2);
      if (text.length > CHARACTER_LIMIT) {
        const truncatedAds = formattedAds.slice(0, Math.max(1, Math.floor(formattedAds.length / 2)));
        const truncatedOutput = {
          ...output,
          ads: truncatedAds,
          count: truncatedAds.length,
          note: `Response truncated from ${formattedAds.length} to ${truncatedAds.length} ads to stay under the size limit. Narrow search_terms or lower limit for full results.`,
        };
        text = JSON.stringify(truncatedOutput, null, 2);
        return {
          content: [{ type: "text" as const, text }],
          structuredContent: truncatedOutput,
        };
      }

      return {
        content: [{ type: "text" as const, text }],
        structuredContent: output,
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: handleMetaError(error) }],
      };
    }
  }
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("meta-ad-library-mcp-server running via stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
