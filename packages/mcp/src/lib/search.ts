import type { RegistryEntry } from './registry.js';

interface SearchResult {
  entry: RegistryEntry;
  score: number;
  reasons: string[];
}

export function searchEntries(
  query: string,
  entries: RegistryEntry[],
  maxResults = 5,
): SearchResult[] {
  const lower = query.toLowerCase();
  const terms = lower.split(/\s+/).filter(Boolean);

  const scored: SearchResult[] = [];

  for (const entry of entries) {
    const reasons: string[] = [];
    let score = 0;

    // Name match (highest weight)
    const nameLower = entry.name.toLowerCase();
    if (nameLower.includes(lower) || lower.includes(nameLower)) {
      score += 10;
      reasons.push(`Name "${entry.name}" matches query`);
    }
    for (const term of terms) {
      if (nameLower.includes(term)) score += 5;
    }

    // Slug match
    if (entry.slug.includes(lower.replace(/\s+/g, '-'))) {
      score += 8;
      reasons.push(`Slug "${entry.slug}" matches`);
    }

    // Description match
    const descLower = entry.description.toLowerCase();
    for (const term of terms) {
      if (descLower.includes(term)) {
        score += 3;
        reasons.push(`Description mentions "${term}"`);
      }
    }

    // Tags match
    for (const tag of entry.tags) {
      const tagLower = tag.toLowerCase();
      for (const term of terms) {
        if (tagLower.includes(term)) {
          score += 4;
          reasons.push(`Tag "${tag}" matches`);
        }
      }
    }

    // Use cases match
    for (const uc of entry.useCases) {
      const ucLower = uc.toLowerCase();
      let matchedTerms = 0;
      for (const term of terms) {
        if (ucLower.includes(term)) {
          matchedTerms++;
          score += 2;
        }
      }
      if (matchedTerms > 0) {
        reasons.push(`Use case: "${uc}"`);
      }
    }

    // Category match
    if (entry.category.toLowerCase().includes(lower)) {
      score += 3;
      reasons.push(`Category "${entry.category}" matches`);
    }

    if (score > 0) {
      scored.push({ entry, score, reasons });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
