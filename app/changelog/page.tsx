import { readJSON } from "@/lib/store";
import type { Settings } from "@/lib/types";

export default async function ChangelogPage() {
  const settings = await readJSON<Settings>("settings.json");
  if (!settings.flags.enableChangelog) return null;

  const changelog = await readJSON<{ version: string; date: string; items: string[] }[]>("changelog.json");

  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="glass rounded-4xl p-6 md:p-8">
          <div className="text-xs text-zinc-500">Product</div>
          <h1 className="mt-2 text-3xl font-semibold">Changelog</h1>
          <div className="mt-2 text-sm text-zinc-600">Sürüm notları ve ürün güncellemeleri.</div>

          <div className="mt-8 grid gap-6">
            {changelog.map((c) => (
              <div key={c.version} className="rounded-3xl border border-black/10 bg-white p-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="text-xl font-semibold">v{c.version}</div>
                  <div className="text-xs text-zinc-500">{c.date}</div>
                </div>
                <ul className="mt-4 grid gap-2 text-sm text-zinc-700 list-disc pl-5">
                  {c.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
