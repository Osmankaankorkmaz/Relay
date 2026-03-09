"use client";

import type { ThemePreset } from "@/lib/types";

export default function ThemePicker({
  themes,
  allowed,
  value,
  onChange
}: {
  themes: ThemePreset[];
  allowed?: string[]; // template’e göre izinli theme id listesi
  value: string;
  onChange: (id: string) => void;
}) {
  const allowedSet = allowed ? new Set(allowed) : null;
  const list = allowedSet ? themes.filter((t) => allowedSet.has(t.id)) : themes;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {list.map((t) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={[
              "rounded-3xl border p-4 text-left transition",
              selected
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-black/10 bg-white hover:bg-black/5"
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{t.name}</div>
              <span
                className={[
                  "h-6 w-10 rounded-full bg-linear-to-r",
                  t.accent
                ].join(" ")}
              />
            </div>
            <div className={`mt-2 text-xs ${selected ? "text-white/75" : "text-zinc-500"}`}>
              id: {t.id}
            </div>
          </button>
        );
      })}
    </div>
  );
}
