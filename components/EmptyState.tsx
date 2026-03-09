import Link from "next/link";
import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "Sonuç yok",
  desc = "Filtreyi değiştir veya farklı bir arama yap.",
  actionHref = "/templates",
  actionLabel = "Kataloğa dön"
}: {
  title?: string;
  desc?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/75 backdrop-blur p-10 shadow-sm text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl border border-black/10 bg-white flex items-center justify-center">
        <SearchX className="h-6 w-6 text-zinc-700" />
      </div>
      <div className="mt-4 text-xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-zinc-600">{desc}</div>
      <div className="mt-6">
        <Link
          href={actionHref}
          className="inline-flex rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}
