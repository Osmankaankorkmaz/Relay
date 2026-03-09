import type { Template } from "@/lib/types";

export type CatalogQuery = {
  q?: string;
  category?: string; // "All" veya gerçek kategori
  featuredOnly?: boolean;
};

export type SortMode = "featured" | "title" | "newest";

export function searchCatalog(
  templates: Template[],
  query: CatalogQuery,
  sort: SortMode = "featured"
) {
  const q = (query.q ?? "").trim().toLowerCase();
  const category = (query.category ?? "All").trim();
  const featuredOnly = Boolean(query.featuredOnly);

  let list = templates.slice();

  if (category && category !== "All") {
    list = list.filter((t) => (t.category ?? "").toLowerCase() === category.toLowerCase());
  }

  if (featuredOnly) list = list.filter((t) => Boolean(t.featured));

  if (q) {
    list = list.filter((t) => {
      const hay = `${t.title} ${t.short} ${(t.category ?? "")} ${(t.variables ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }

  if (sort === "title") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "featured") {
    list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title));
  } else if (sort === "newest") {
    // JSON db'de createdAt yoksa id'ye göre kaba sıralama
    list.sort((a, b) => b.id.localeCompare(a.id));
  }

  return list;
}
