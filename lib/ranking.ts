import type { Analytics, Template } from "@/lib/types";

export function scoreForTemplate(slug: string, a: Analytics) {
  const row = a.templates?.[slug] ?? { views: 0, uses: 0, shares: 0 };
  return row.views * 1 + row.uses * 5 + row.shares * 10;
}

export function trendingTemplates(
  templates: Template[] | undefined | null,
  a: Analytics,
  limit = 6
) {
  const list = templates ?? [];
  return list
    .slice()
    .map((t) => ({ t, score: scoreForTemplate(t.slug, a) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.t);
}

export function featuredTemplates(
  templates: Template[] | undefined | null,
  limit = 6
) {
  return (templates ?? []).filter((t) => t.featured).slice(0, limit);
}
