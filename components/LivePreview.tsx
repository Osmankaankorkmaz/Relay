"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Template, ThemePreset } from "@/lib/types";

function normalizeCategoryKey(k: string) {
  if (k === "Thanks") return "ThankYou";
  return k || "Other";
}

function labelOf(v: string) {
  const map: Record<string, string> = {
    senderName: "Gönderen",
    receiverName: "Alıcı",
    message: "Mesaj",
    title: "Başlık"
  };
  if (map[v]) return map[v];
  const spaced = v.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isLongField(key: string) {
  return /message|desc|body|note|content|text/i.test(key);
}

function smartPlaceholder(v: string) {
  const map: Record<string, string> = {
    senderName: "Örn: Ece",
    receiverName: "Örn: Osman",
    message: "Örn: Kısa ve net bir mesaj yazın."
  };
  return map[v] ?? `Örn: ${labelOf(v)}`;
}

/** Kurumsal ama belirgin kategori paleti (3 renk: primary/secondary/soft) */
type CatTone = {
  nameTR: string;
  a: string; // primary
  b: string; // secondary
  softBg: string;
  softBorder: string;
};

const CAT: Record<string, CatTone> = {
  Holiday: {
    nameTR: "Yeni Yıl",
    a: "#0EA5E9",
    b: "#6366F1",
    softBg: "rgba(14,165,233,0.08)",
    softBorder: "rgba(14,165,233,0.22)"
  },
  Birthday: {
    nameTR: "Doğum Günü",
    a: "#F59E0B",
    b: "#FB7185",
    softBg: "rgba(245,158,11,0.08)",
    softBorder: "rgba(245,158,11,0.22)"
  },
  Work: {
    nameTR: "İş",
    a: "#111827",
    b: "#0EA5E9",
    softBg: "rgba(17,24,39,0.05)",
    softBorder: "rgba(17,24,39,0.14)"
  },
  Education: {
    nameTR: "Eğitim",
    a: "#6366F1",
    b: "#0EA5E9",
    softBg: "rgba(99,102,241,0.08)",
    softBorder: "rgba(99,102,241,0.22)"
  },
  Invite: {
    nameTR: "Davet",
    a: "#14B8A6",
    b: "#0EA5E9",
    softBg: "rgba(20,184,166,0.08)",
    softBorder: "rgba(20,184,166,0.22)"
  },
  ThankYou: {
    nameTR: "Teşekkür",
    a: "#22C55E",
    b: "#0EA5E9",
    softBg: "rgba(34,197,94,0.08)",
    softBorder: "rgba(34,197,94,0.22)"
  },
  Congrats: {
    nameTR: "Tebrik",
    a: "#A855F7",
    b: "#0EA5E9",
    softBg: "rgba(168,85,247,0.08)",
    softBorder: "rgba(168,85,247,0.22)"
  },
  Marketing: {
    nameTR: "Pazarlama",
    a: "#F97316",
    b: "#0EA5E9",
    softBg: "rgba(249,115,22,0.08)",
    softBorder: "rgba(249,115,22,0.22)"
  },
  Utility: {
    nameTR: "Araç",
    a: "#0EA5E9",
    b: "#14B8A6",
    softBg: "rgba(14,165,233,0.07)",
    softBorder: "rgba(14,165,233,0.20)"
  },
  Love: {
    nameTR: "Aşk",
    a: "#FB7185",
    b: "#A855F7",
    softBg: "rgba(251,113,133,0.07)",
    softBorder: "rgba(251,113,133,0.20)"
  },
  Other: {
    nameTR: "Diğer",
    a: "#0EA5E9",
    b: "#6366F1",
    softBg: "rgba(14,165,233,0.07)",
    softBorder: "rgba(14,165,233,0.20)"
  }
};

function categoryTone(category: string) {
  const k = normalizeCategoryKey(category);
  return CAT[k] ?? CAT.Other;
}

/** Theme vars -> preview panel */
function toThemeVars(theme?: ThemePreset) {
  const bg = theme?.bg ?? "#ffffff";
  const card = theme?.card ?? "rgba(255,255,255,0.92)";
  const text = theme?.text ?? "#18181B";
  const muted = theme?.muted ?? "rgba(24,24,27,0.65)";

  return {
    ["--pv-bg" as any]: bg,
    ["--pv-card" as any]: card,
    ["--pv-text" as any]: text,
    ["--pv-muted" as any]: muted
  } as React.CSSProperties;
}

/** Scrollbar yok: auto-grow textarea */
function AutoTextArea({
  value,
  onChange,
  placeholder,
  className,
  maxLen
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  maxLen: number;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    const h = Math.min(el.scrollHeight, 220);
    el.style.height = `${h}px`;
    el.style.overflow = "hidden";
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, maxLen))}
      placeholder={placeholder}
      className={className}
    />
  );
}

/** Motion presets (kurumsal) */
const fadeIn = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35 } }
};

const lift = {
  whileHover: { y: -2 },
  transition: { type: "spring" as const, stiffness: 240, damping: 20 }
};

export default function LivePreview({
  templates,
  themes
}: {
  templates: Template[];
  themes: ThemePreset[];
}) {
  const reduceMotion = useReducedMotion();

  const safeTemplates = templates ?? [];
  const safeThemes = themes ?? [];

  const [slug, setSlug] = useState(safeTemplates[0]?.slug ?? "");
  const t = useMemo(
    () => safeTemplates.find((x) => x.slug === slug) ?? safeTemplates[0],
    [slug, safeTemplates]
  );

  const allowedThemes = useMemo(() => {
    const ids = new Set(t?.themes ?? []);
    const filtered = safeThemes.filter((th) => ids.has(th.id));
    return filtered.length ? filtered : safeThemes;
  }, [safeThemes, t]);

  const [themeId, setThemeId] = useState(allowedThemes[0]?.id ?? safeThemes[0]?.id ?? "minimal");
  const theme = useMemo(() => safeThemes.find((th) => th.id === themeId) ?? safeThemes[0], [safeThemes, themeId]);

  useEffect(() => {
    const ids = new Set(t?.themes ?? []);
    if (ids.size && !ids.has(themeId)) setThemeId(allowedThemes[0]?.id ?? "minimal");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const [vars, setVars] = useState<Record<string, string>>({
    senderName: "Bedirhan",
    receiverName: "Osman",
    message: "Bu yıl çok daha iyi geçsin."
  });

  if (!t || !theme) return null;

  const hydratedVars = useMemo(() => {
    const hv = { ...vars };
    for (const v of t.variables ?? []) if (!(v in hv)) hv[v] = "";
    return hv;
  }, [vars, t.variables]);

  const cat = categoryTone(String(t.category ?? "Other"));

  /** Accent vars for CSS ring/gradients */
  const accentVars = {
    ["--accent-a" as any]: cat.a,
    ["--accent-b" as any]: cat.b
  } as React.CSSProperties;

  return (
    <motion.section
      className="relative rounded-[32px] border border-black/10 bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden"
      style={accentVars}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.22 }}
      variants={fadeIn}
    >
      {/* Kurumsal ama premium: ince animated shine (çok hafif) */}
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-48 top-0 h-full w-48 opacity-[0.22]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
            transform: "skewX(-12deg)"
          }}
          animate={{ x: [-200, 1200] }}
          transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
        />
      ) : null}

      {/* Header */}
      <div className="px-6 pt-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-zinc-500">Relay • Canlı Önizleme</div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">
                {t.title}
              </div>

              {/* Kategori etiketi: daha belirgin */}
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-[11px]"
                style={{
                  background: cat.softBg,
                  borderColor: cat.softBorder,
                  color: cat.a
                }}
              >
                {cat.nameTR}
              </span>

              {/* Tema etiketi */}
              <span
                className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] text-zinc-700"
              >
                Tema: {theme.name}
              </span>
            </div>

            <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
              {t.short}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-zinc-800 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent-a)_18%,transparent)]"
            >
              {safeTemplates.map((x) => (
                <option key={x.slug} value={x.slug}>
                  {x.title}
                </option>
              ))}
            </select>

            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-zinc-800 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent-a)_18%,transparent)]"
            >
              {allowedThemes.map((th) => (
                <option key={th.id} value={th.id}>
                  {th.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kategoriye özel ince çizgi (kurumsal) */}
        <div
          className="mt-5 h-[2px] w-full rounded-full"
          style={{ background: `linear-gradient(90deg, var(--accent-a), var(--accent-b))` }}
        />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            className="rounded-[28px] border border-black/10 bg-white/85 shadow-sm overflow-hidden"
            {...(!reduceMotion ? lift : {})}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-900">Alanlar</div>
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...hydratedVars };
                    for (const v of t.variables ?? []) next[v] = "";
                    setVars(next);
                  }}
                  className="text-xs text-zinc-500 hover:text-zinc-800 transition"
                >
                  Temizle
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                {(t.variables ?? []).map((v) => {
                  const maxLen = v === "message" ? 300 : 160;
                  const val = (hydratedVars[v] ?? "").toString();
                  const long = isLongField(v);

                  const pct = Math.min(100, Math.round((val.length / maxLen) * 100));

                  return (
                    <label key={v} className="grid gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-600">{labelOf(v)}</span>
                        <span className="text-[10px] text-zinc-400">
                          {val.length}/{maxLen}
                        </span>
                      </div>

                      {long ? (
                        <AutoTextArea
                          value={val}
                          onChange={(nv) => setVars((p) => ({ ...p, [v]: nv }))}
                          maxLen={maxLen}
                          placeholder={smartPlaceholder(v)}
                          className="min-h-[46px] rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent-a)_18%,transparent)]"
                        />
                      ) : (
                        <input
                          value={val}
                          onChange={(e) => setVars((p) => ({ ...p, [v]: e.target.value.slice(0, maxLen) }))}
                          placeholder={smartPlaceholder(v)}
                          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent-a)_18%,transparent)]"
                        />
                      )}

                      {/* Kurumsal meter + animasyon */}
                      <div className="h-1 w-full rounded-full bg-black/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, var(--accent-a), var(--accent-b))`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ type: "spring", stiffness: 220, damping: 22 }}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            className="rounded-[28px] border border-black/10 shadow-sm overflow-hidden relative"
            style={toThemeVars(theme)}
            {...(!reduceMotion ? lift : {})}
          >
            {/* Tema arka planı */}
            <div className="absolute inset-0" style={{ background: "var(--pv-bg)" }} />

            {/* Tema + kategori overlay (çok hafif, kurumsal) */}
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                background: `radial-gradient(900px 420px at 10% 0%, color-mix(in srgb, var(--accent-a) 38%, transparent), transparent 60%),
                             radial-gradient(900px 420px at 90% 10%, color-mix(in srgb, var(--accent-b) 30%, transparent), transparent 60%)`
              }}
            />

            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]" />

            <div className="relative p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: "var(--pv-muted)" }}>
                  Önizleme
                </div>
                <span
                  className="inline-flex items-center rounded-full border px-3 py-1 text-[11px]"
                  style={{
                    background: cat.softBg,
                    borderColor: cat.softBorder,
                    color: cat.a
                  }}
                >
                  {cat.nameTR}
                </span>
              </div>

              {/* Tema / template değişince yumuşak geçiş */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${slug}-${themeId}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(10px)" }}
                  transition={{ duration: 0.28 }}
                >
                  <div
                    className="mt-4 text-2xl font-semibold tracking-tight"
                    style={{ color: "var(--pv-text)" }}
                  >
                    {hydratedVars.receiverName?.trim()
                      ? `Merhaba, ${hydratedVars.receiverName.trim()}!`
                      : "Merhaba!"}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--pv-muted)" }}>
                    {hydratedVars.senderName?.trim()
                      ? `Bu mesaj sana ${hydratedVars.senderName.trim()} tarafından gönderildi.`
                      : "Bu mesaj sana gönderildi."}
                  </p>

                  <div
                    className="mt-4 rounded-3xl border px-5 py-4 text-sm leading-relaxed"
                    style={{
                      borderColor: "rgba(0,0,0,0.08)",
                      background: "var(--pv-card)",
                      color: "var(--pv-text)"
                    }}
                  >
                    {hydratedVars.message?.trim()
                      ? hydratedVars.message.trim()
                      : "Mesaj alanını doldurduğunda burada görünecek."}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 text-[11px]" style={{ color: "var(--pv-muted)" }}>
                    <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">Tema: {theme.name}</span>
                    <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">Kategori: {cat.nameTR}</span>
                  </div>

                  {/* İnce, premium accent çizgi */}
                  {!reduceMotion ? (
                    <motion.div
                      className="mt-6 h-[2px] w-full rounded-full"
                      style={{ background: `linear-gradient(90deg, var(--accent-a), var(--accent-b))` }}
                      animate={{ opacity: [0.45, 0.9, 0.45] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <div
                      className="mt-6 h-[2px] w-full rounded-full"
                      style={{ background: `linear-gradient(90deg, var(--accent-a), var(--accent-b))`, opacity: 0.65 }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 text-xs text-zinc-500">
          Önizleme; <span className="font-medium text-zinc-700">templates.json</span> verisi ile çalışır.
        </div>
      </div>
    </motion.section>
  );
}
