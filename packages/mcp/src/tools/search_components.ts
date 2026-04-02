// ============================================================================
// search_components - Search for components by intent, keywords, or description
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, filterPublic } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
  server.tool(
    'search_components',
    'Search for VedUI components by intent, keywords, or description. Returns matching components with relevance scores.',
    {
      query: z.string().describe('Natural language search query describing what you need'),
      searchIn: z
        .enum(['all', 'intent', 'keywords', 'description'])
        .default('all')
        .describe('Where to search - defaults to all fields'),
      limit: z.number().min(1).max(20).default(5).describe('Maximum number of results to return'),
    },
    async ({ query, searchIn, limit }) => {
      const q = query.toLowerCase();
      const items = filterPublic(Object.values(registry));

      const scored = items
        .map((c) => {
          let score = 0;
          const matchReasons: string[] = [];

          // Search in intent (highest priority - 3x weight)
          if ((searchIn === 'all' || searchIn === 'intent') && c.intent) {
            const intentMatches = c.intent.filter((i) => i.toLowerCase().includes(q));
            if (intentMatches.length > 0) {
              score += intentMatches.length * 3;
              matchReasons.push(`Intent: ${intentMatches.join(', ')}`);
            }
          }

          // Search in ai_keywords (high priority - 2x weight)
          if ((searchIn === 'all' || searchIn === 'keywords') && c.ai_keywords) {
            const keywordMatches = c.ai_keywords.filter((k) => k.toLowerCase().includes(q));
            if (keywordMatches.length > 0) {
              score += keywordMatches.length * 2;
              matchReasons.push(`Keywords: ${keywordMatches.join(', ')}`);
            }
          }

          // Search in description (standard priority - 1x weight)
          if (searchIn === 'all' || searchIn === 'description') {
            if (c.description?.toLowerCase().includes(q)) {
              score += 1;
              matchReasons.push('Description match');
            }
            if (c.ai_summary?.toLowerCase().includes(q)) {
              score += 1;
              matchReasons.push('Summary match');
            }
          }

          return { component: c, score, matchReasons };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      if (!scored.length) {
        return err(
          `No components matched "${query}". Try different keywords or use list_components().`,
        );
      }

      return ok(
        scored.map((r) => ({
          component: r.component.component,
          slug: r.component.slug,
          category: r.component.category,
          description: r.component.description,
          relevanceScore: r.score,
          matchReasons: r.matchReasons,
        })),
      );
    },
  );
}
