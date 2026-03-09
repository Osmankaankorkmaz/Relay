"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Settings, Template, ThemePreset } from "@/lib/types";
import ThemePicker from "@/components/ThemePicker";
import ShareKit from "@/components/ShareKit";
import { validateVars } from "@/lib/validators";

async function postJSON(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json().catch(() => ({}));
}

export default function CreateClient({
  settings,
  templates,
  themes,
  initialTemplateSlug,
  refParam
}: {
  settings: Settings;
  templates: Template[];
  themes: ThemePreset[];
  initialTemplateSlug: string;
  refParam: string;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [templateSlug, setTemplateSlug] = useState(initialTemplateSlug);

  const template = useMemo(() => {
    return templates.find((t) => t.slug === templateSlug) ?? templates[0];
  }, [templates, templateSlug]);

  // templates boşsa güvenli fallback UI
  if (!template) {
    return (
      <div className="glass rounded-4xl p-6">
        <div className="text-sm font-semibold">Template bulunamadı</div>
        <div className="mt-2 text-sm text-zinc-600">
          templates.json boş olabilir veya initialTemplateSlug yanlış.
        </div>
        <div className="mt-4">
          <Link className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm text-white" href="/templates">
            Template kataloğuna git
          </Link>
        </div>
      </div>
    );
  }

  const allowedThemes = useMemo(() => {
    const ids = new Set(template.themes ?? []);
    const list = themes.filter((t) => ids.has(t.id));
    return list.length ? list : themes; // template teması yoksa tüm temalara düş
  }, [themes, template]);

  const [themeId, setThemeId] = useState(() => {
    return (
      allowedThemes.find((x) => x.id === settings.defaults.defaultTheme)?.id ??
      allowedThemes[0]?.id ??
      settings.defaults.defaultTheme
    );
  });

  const [vars, setVars] = useState<Record<string, string>>({
    senderName: settings.defaults.defaultSenderName,
    receiverName: "",
    message: ""
  });

  const [experienceId, setExperienceId] = useState<string>("");
  const shareUrl = experienceId ? `/x/${experienceId}` : "";

  // ✅ Template/theme değişince themeId geçerli mi düzelt (useEffect)
  useEffect(() => {
    const ids = new Set((template.themes ?? []));
    if (ids.size === 0) return; // template theme kısıtı yoksa dokunma
    if (!ids.has(themeId)) {
      setThemeId(allowedThemes[0]?.id ?? settings.defaults.defaultTheme);
    }
  }, [templateSlug, template.themes, themeId, allowedThemes, settings.defaults.defaultTheme]);

  async function createExperience() {
    const vr = validateVars(template, vars);
    if (!vr.ok) {
      alert(vr.message);
      return;
    }

    await postJSON("/api/analytics", { type: "use", slug: template.slug });
    await postJSON("/api/analytics", { type: "exp_created" });

    const res = await postJSON("/api/experiences", {
      templateSlug: template.slug,
      theme: themeId,
      vars,
      ref: refParam || vars.senderName
    });

    if (!res?.id) {
      alert("Experience oluşturulamadı.");
      return;
    }

    setExperienceId(res.id);
    setStep(4);
  }

  return (
    <div className="grid gap-6">
      <div className="glass rounded-4xl p-6 md:p-8">
        <div className="text-xs text-zinc-500">Builder</div>
        <div className="mt-2 text-2xl font-semibold">Create an experience</div>
        <div className="mt-2 text-sm text-zinc-600">
          Step {step}/4 — Template → Theme → Content → Share
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s as any)}
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                step === s
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-black/10 bg-white hover:bg-black/5"
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {step === 1 ? (
        <div className="glass rounded-4xl p-6">
          <div className="text-sm font-semibold">1) Template seç</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => setTemplateSlug(t.slug)}
                className={[
                  "rounded-3xl border p-5 text-left transition",
                  templateSlug === t.slug
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-black/10 bg-white hover:bg-black/5"
                ].join(" ")}
              >
                <div className="text-sm font-semibold">{t.title}</div>
                <div className={`mt-1 text-xs ${templateSlug === t.slug ? "text-white/70" : "text-zinc-500"}`}>
                  {t.category}
                </div>
                <div className={`mt-2 text-sm ${templateSlug === t.slug ? "text-white/80" : "text-zinc-600"}`}>
                  {t.short}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
              type="button"
            >
              Next →
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="glass rounded-4xl p-6">
          <div className="text-sm font-semibold">2) Tema seç</div>
          <div className="mt-4">
            <ThemePicker themes={themes} allowed={template.themes} value={themeId} onChange={setThemeId} />
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm hover:bg-black/5 transition"
              type="button"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
              type="button"
            >
              Next →
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="glass rounded-4xl p-6">
          <div className="text-sm font-semibold">3) İçerik</div>
          <div className="mt-4 grid gap-3">
            {template.variables.map((field) => (
              <label key={field} className="grid gap-1">
                <span className="text-xs text-zinc-500">{field}</span>
                <input
                  value={vars[field] ?? ""}
                  onChange={(e) => setVars((p) => ({ ...p, [field]: e.target.value }))}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                  placeholder={field}
                />
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm hover:bg-black/5 transition"
              type="button"
            >
              ← Back
            </button>
            <button
              onClick={createExperience}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
              type="button"
            >
              Create experience
            </button>
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="glass rounded-4xl p-6">
          <div className="text-sm font-semibold">4) Share</div>
          <div className="mt-2 text-sm text-zinc-600">Experience hazır. Linki paylaş ya da runner’ı aç.</div>

          <div className="mt-5">
            <ShareKit
              url={shareUrl}
              onShare={() => postJSON("/api/analytics", { type: "share", slug: template.slug })}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={shareUrl || "/"}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Open runner
            </Link>
            <Link
              href="/templates"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm hover:bg-black/5 transition"
            >
              Back to catalog
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
