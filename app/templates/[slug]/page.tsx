import Link from "next/link";
import { readJSON } from "@/lib/store";
import type { Template } from "@/lib/types";
import TemplateViewPing from "@/components/TemplateViewPing";

export default async function TemplateDetail({ params }: { params: { slug: string } }) {
  const templates = await readJSON<Template[]>("templates.json");
  const t = templates.find((x) => x.slug === params.slug);
  if (!t) return null;

  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <TemplateViewPing slug={t.slug} />

        <div className="text-xs text-zinc-500">Template</div>
        <h1 className="mt-2 text-3xl font-semibold">{t.title}</h1>
        <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{t.short}</p>

        <div className="mt-6 glass rounded-4xl p-6">
          <div className="text-sm font-semibold">Category</div>
          <div className="mt-2 inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700">
            {t.category}
          </div>

          <div className="mt-6 text-sm font-semibold">Variables</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.variables.map((v) => (
              <span key={v} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700">
                {v}
              </span>
            ))}
          </div>

          <div className="mt-6 text-sm font-semibold">Supported themes</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.themes.map((th) => (
              <span key={th} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700">
                {th}
              </span>
            ))}
          </div>

          <div className="mt-8 flex gap-2">
            <Link
              href={`/create?template=${encodeURIComponent(t.slug)}`}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Use this template
            </Link>
            <Link
              href="/templates"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm hover:bg-black/5 transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
