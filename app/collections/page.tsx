import { readJSON } from "@/lib/store";
import type { Collection, Template } from "@/lib/types";
import Section from "@/components/Section";
import TemplateCard from "@/components/TemplateCard";
import CollectionCard from "@/components/CollectionCard";

export default async function CollectionsPage() {
  const collections = await readJSON<Collection[]>("collections.json");
  const templates = await readJSON<Template[]>("templates.json");

  const bySlug = new Map(templates.map((t) => [t.slug, t]));

  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Section
          eyebrow="Packs"
          title="Collections"
          desc="Koleksiyonlar: hızlı başlangıç setleri. Her pack altında ilgili template’ler."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.id} c={c} count={c.templateSlugs.length} />
          ))}
        </div>

        <div className="mt-10 grid gap-8">
          {collections.map((c) => {
            const list = c.templateSlugs.map((s) => bySlug.get(s)).filter(Boolean) as Template[];
            return (
              <section key={c.id} className="glass rounded-4xl p-6">
                <div className="text-xs text-zinc-500">Pack</div>
                <div className="mt-1 text-xl font-semibold">{c.title}</div>
                <div className="mt-2 text-sm text-zinc-600">{c.desc}</div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((t) => <TemplateCard key={t.id} t={t} />)}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
