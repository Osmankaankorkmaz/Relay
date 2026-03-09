import RunnerClient from "./ui";
import { notFound } from "next/navigation";
import { ensureArray, readJSON } from "@/lib/store";
import type { Experience, Template, ThemePreset } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeId(id: string) {
  try {
    return decodeURIComponent(id).trim();
  } catch {
    return (id ?? "").trim();
  }
}

function DebugBox({ title, data }: { title: string; data: any }) {
  return (
    <main className="min-h-screen bg-aurora">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="glass rounded-4xl p-6">
          <div className="text-sm font-semibold">{title}</div>
          <pre className="mt-3 text-xs text-zinc-700 whitespace-pre-wrap break-all">
            {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

// ✅ params Promise olabilir -> await ile unwrap
export default async function RunnerPage(props: { params: Promise<{ id: string }> | { id: string } }) {
  const params = await Promise.resolve(props.params);
  const id = normalizeId(params.id);

  let exps: Experience[] = [];
  try {
    const raw = await readJSON<any>("experiences.json");
    exps = ensureArray<Experience>(raw);
  } catch (e: any) {
    return (
      <DebugBox
        title="experiences.json OKUNAMADI (Bu yüzden 404 alıyorsun)"
        data={{ id, error: String(e?.message ?? e), cwd: process.cwd() }}
      />
    );
  }

  if (!exps.length) {
    return (
      <DebugBox
        title="experiences.json BOŞ"
        data={{ id, message: "Dosya boş array dönüyor. İçerik gerçekten var mı?" }}
      />
    );
  }

  const exp = exps.find((x) => String(x?.id ?? "").trim() === id);
  if (!exp) {
    return (
      <DebugBox
        title="EXPERIENCE BULUNAMADI"
        data={{
          aranan: id,
          toplam: exps.length,
          ilk5: exps.slice(0, 5).map((x) => x.id)
        }}
      />
    );
    // prod: return notFound();
  }

  let templates: Template[] = [];
  try {
    templates = ensureArray<Template>(await readJSON<any>("templates.json"));
  } catch {
    templates = [];
  }

  let themes: ThemePreset[] = [];
  try {
    themes = ensureArray<ThemePreset>(await readJSON<any>("themes.json"));
  } catch (e: any) {
    return (
      <DebugBox
        title="themes.json OKUNAMADI"
        data={{ error: String(e?.message ?? e), cwd: process.cwd() }}
      />
    );
  }

  if (!themes.length) {
    return <DebugBox title="themes.json BOŞ" data="themes.json boş geliyor." />;
  }

  const t = templates.find((x) => x.slug === exp.templateSlug) ?? undefined;
  const th = themes.find((x) => x.id === exp.theme) ?? themes[0];

  if (!th) return notFound();

  return <RunnerClient exp={exp} template={t} theme={th} />;
}
