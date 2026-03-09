import Link from "next/link";
import type { Analytics, Template } from "@/lib/types";
import { trendingTemplates } from "@/lib/ranking";

export default function TrendingStrip({
  templates,
  analytics,
  limit = 6
}: {
  templates: Template[];
  analytics: Analytics;
  limit?: number;
}) {
  const trending = trendingTemplates(templates, analytics, limit);

  return (
    <div className="rounded-4xl border border-black/10 bg-white/75 backdrop-blur p-6 shadow-sm">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs text-zinc-500">Trending</div>
          <div className="mt-1 text-xl font-semibold">Şu an yükselenler</div>
          <div className="mt-2 text-sm text-zinc-600">
            Anonim sayaçlara göre (views/uses/shares) sıralanır.
          </div>
        </div>
        <Link
          href="/templates"
          className="hidden md:inline-flex rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 transition"
        >
          Kataloğa git →
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {trending.map((t) => (
          <Link
            key={t.id}
            href={`/templates/${t.slug}`}
            className="rounded-3xl border border-black/10 bg-white p-4 hover:bg-black/5 transition"
          >
            <div className="text-sm font-semibold">{t.title}</div>
            <div className="mt-1 text-xs text-zinc-500">{t.category}</div>
            <div className="mt-2 text-sm text-zinc-600">{t.short}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
