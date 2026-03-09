import Link from "next/link";
import { readJSON } from "@/lib/store";
import type { Settings, Template } from "@/lib/types";
import TemplateCard from "@/components/TemplateCard";
import EmptyState from "@/components/EmptyState";
import Section from "@/components/Section";
import { searchCatalog } from "@/lib/catalog";

export default async function TemplatesPage({
  searchParams
}: {
  searchParams: { q?: string; cat?: string; featured?: string };
}) {
  const settings = await readJSON<Settings>("settings.json");
  const templates = await readJSON<Template[]>("templates.json");

  const q = searchParams.q ?? "";
  const cat = (searchParams.cat ?? "All") as any;
  const featuredOnly = searchParams.featured === "1";

  const list = searchCatalog(
    templates,
    { q, category: cat, featuredOnly },
    "featured"
  );

  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Section
          eyebrow="Catalog"
          title="Templates"
          desc="Arama, kategori ve featured filtreleriyle keşfet."
          right={
            <Link
              href="/create"
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Create
            </Link>
          }
        />

        {/* filters (simple, URL param based) */}
        <div className="mt-6 glass rounded-[1.75rem] p-5">
          <form className="grid gap-3 md:grid-cols-3" action="/templates">
            <input
              name="q"
              defaultValue={q}
              placeholder="Ara: yeni yıl, tebrik, onboarding…"
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
            <input
              name="cat"
              defaultValue={cat === "All" ? "" : cat}
              placeholder="Kategori (ör: Holiday, Work, Invite...)"
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
            <label className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
              <input type="checkbox" name="featured" value="1" defaultChecked={featuredOnly} />
              Featured only
            </label>

            <div className="md:col-span-3 flex gap-2">
              <button className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition" type="submit">
                Apply
              </button>
              <Link className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm hover:bg-black/5 transition" href="/templates">
                Reset
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => <TemplateCard key={t.id} t={t} />)}
        </div>

        {list.length === 0 ? (
          <div className="mt-8">
            <EmptyState />
          </div>
        ) : null}
      </div>
    </main>
  );
}
