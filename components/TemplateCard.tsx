import Link from "next/link";
import type { Template } from "@/lib/types";

export default function TemplateCard({ t }: { t: Template }) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white/75 backdrop-blur p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{t.title}</div>
          <div className="mt-1 text-xs text-zinc-500">{t.category}</div>
        </div>
        {t.featured ? (
          <span className="text-[11px] rounded-full border border-black/10 bg-white px-2 py-1 text-zinc-600">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{t.short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {t.variables.slice(0, 3).map((v) => (
          <span key={v} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700">
            {v}
          </span>
        ))}
        {t.variables.length > 3 ? (
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-500">
            +{t.variables.length - 3}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          href={`/templates/${t.slug}`}
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 transition"
        >
          Details
        </Link>
        <Link
          href={`/create?template=${t.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 transition"
        >
          Use
        </Link>
      </div>
    </div>
  );
}
