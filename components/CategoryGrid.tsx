"use client";

import Link from "next/link";
import type { Template } from "@/lib/types";
import { motion, useReducedMotion, type Variants } from "framer-motion";

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

/* -----------------------------
   TR İSİMLER
------------------------------ */
const TR_NAME: Record<string, string> = {
  Holiday: "Yılbaşı & Tatil",
  Greetings: "Selamlaşma",
  Birthday: "Doğum Günü",
  Love: "Aşk",
  Friends: "Arkadaşlar",
  Family: "Aile",
  Work: "İş",
  Education: "Eğitim",
  Invite: "Davet",
  ThankYou: "Teşekkür",
  Congrats: "Tebrik",
  Motivation: "Motivasyon",
  Apology: "Özür",
  Marketing: "Pazarlama",
  Utility: "Araçlar",
  Seasonal: "Sezonluk",
  Timeless: "Zamansız",
  Other: "Diğer"
};

function normalizeCategoryKey(k: string) {
  if (k === "Thanks") return "ThankYou";
  return k;
}

function nameTR(raw: string) {
  return TR_NAME[raw] ?? raw;
}

/* -----------------------------
   RENK PALETLERİ (tema farkı)
   - animasyon aynen aynı kalır
------------------------------ */
type Palette = {
  // background gradient
  bgA: string; // top-left
  bgB: string; // mid
  bgC: string; // bottom-right

  // aura blobs
  aura1: string;
  aura2: string;

  // ring & chip
  ring: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;

  // accent
  accentText: string;
};

const PALETTES: Record<string, Palette> = {
  Holiday: {
    bgA: "rgba(11,16,32,0.04)",
    bgB: "rgba(255,255,255,0.60)",
    bgC: "rgba(255,43,214,0.16)",
    aura1: "rgba(255,43,214,0.18)",
    aura2: "rgba(0,229,255,0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,43,214,0.35),0_28px_120px_rgba(0,229,255,0.18)]",
    chipBorder: "rgba(255,43,214,0.34)",
    chipBg: "rgba(255,43,214,0.12)",
    chipText: "#A10078",
    accentText: "#A10078"
  },
  Birthday: {
    bgA: "rgba(255,178,0,0.14)",
    bgB: "rgba(255,255,255,0.64)",
    bgC: "rgba(255,45,85,0.14)",
    aura1: "rgba(255,178,0,0.18)",
    aura2: "rgba(255,45,85,0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,178,0,0.35),0_28px_120px_rgba(255,45,85,0.18)]",
    chipBorder: "rgba(255,178,0,0.34)",
    chipBg: "rgba(255,178,0,0.12)",
    chipText: "#7B4300",
    accentText: "#7B4300"
  },
  Invite: {
    bgA: "rgba(0,194,255,0.14)",
    bgB: "rgba(255,255,255,0.64)",
    bgC: "rgba(109,40,255,0.12)",
    aura1: "rgba(0,194,255,0.16)",
    aura2: "rgba(109,40,255,0.14)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(0,194,255,0.35),0_28px_120px_rgba(109,40,255,0.18)]",
    chipBorder: "rgba(0,194,255,0.34)",
    chipBg: "rgba(0,194,255,0.12)",
    chipText: "#00546C",
    accentText: "#00546C"
  },
  Work: {
    bgA: "rgba(16,19,26,0.10)",
    bgB: "rgba(255,255,255,0.68)",
    bgC: "rgba(0,255,178,0.10)",
    aura1: "rgba(0,255,178,0.14)",
    aura2: "rgba(167,139,250,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(16,19,26,0.20),0_28px_120px_rgba(0,255,178,0.14)]",
    chipBorder: "rgba(0,0,0,0.12)",
    chipBg: "rgba(255,255,255,0.55)",
    chipText: "#18181B",
    accentText: "#18181B"
  },
  Education: {
    bgA: "rgba(79,70,255,0.14)",
    bgB: "rgba(255,255,255,0.64)",
    bgC: "rgba(0,229,255,0.10)",
    aura1: "rgba(79,70,255,0.14)",
    aura2: "rgba(0,229,255,0.12)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(79,70,255,0.35),0_28px_120px_rgba(0,229,255,0.16)]",
    chipBorder: "rgba(79,70,255,0.34)",
    chipBg: "rgba(79,70,255,0.12)",
    chipText: "#2A22C2",
    accentText: "#2A22C2"
  },
  Marketing: {
    bgA: "rgba(255,107,0,0.16)",
    bgB: "rgba(255,255,255,0.64)",
    bgC: "rgba(0,255,234,0.10)",
    aura1: "rgba(255,107,0,0.16)",
    aura2: "rgba(0,255,234,0.12)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,107,0,0.35),0_28px_120px_rgba(0,255,234,0.16)]",
    chipBorder: "rgba(255,107,0,0.34)",
    chipBg: "rgba(255,107,0,0.12)",
    chipText: "#7C2A00",
    accentText: "#7C2A00"
  },
  ThankYou: {
    bgA: "rgba(0,255,122,0.14)",
    bgB: "rgba(255,255,255,0.64)",
    bgC: "rgba(0,194,255,0.10)",
    aura1: "rgba(0,255,122,0.14)",
    aura2: "rgba(0,194,255,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(0,255,122,0.30),0_28px_120px_rgba(0,194,255,0.14)]",
    chipBorder: "rgba(0,255,122,0.32)",
    chipBg: "rgba(0,255,122,0.12)",
    chipText: "#006433",
    accentText: "#006433"
  },
  Congrats: {
    bgA: "rgba(255,45,85,0.14)",
    bgB: "rgba(255,255,255,0.64)",
    bgC: "rgba(255,208,0,0.12)",
    aura1: "rgba(255,45,85,0.14)",
    aura2: "rgba(255,208,0,0.12)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,45,85,0.35),0_28px_120px_rgba(255,208,0,0.16)]",
    chipBorder: "rgba(255,45,85,0.30)",
    chipBg: "rgba(255,45,85,0.10)",
    chipText: "#8B001D",
    accentText: "#8B001D"
  },
  Love: {
    bgA: "rgba(255,45,85,0.12)",
    bgB: "rgba(255,255,255,0.68)",
    bgC: "rgba(255,43,214,0.10)",
    aura1: "rgba(255,45,85,0.14)",
    aura2: "rgba(255,43,214,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,45,85,0.30),0_28px_120px_rgba(255,43,214,0.14)]",
    chipBorder: "rgba(255,45,85,0.30)",
    chipBg: "rgba(255,45,85,0.10)",
    chipText: "#8B001D",
    accentText: "#8B001D"
  },
  Friends: {
    bgA: "rgba(182,255,0,0.16)",
    bgB: "rgba(255,255,255,0.68)",
    bgC: "rgba(0,229,255,0.10)",
    aura1: "rgba(182,255,0,0.14)",
    aura2: "rgba(0,229,255,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(182,255,0,0.35),0_28px_120px_rgba(0,229,255,0.14)]",
    chipBorder: "rgba(182,255,0,0.30)",
    chipBg: "rgba(182,255,0,0.10)",
    chipText: "#365A00",
    accentText: "#365A00"
  },
  Family: {
    bgA: "rgba(255,178,0,0.16)",
    bgB: "rgba(255,255,255,0.68)",
    bgC: "rgba(255,107,0,0.10)",
    aura1: "rgba(255,178,0,0.14)",
    aura2: "rgba(255,107,0,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,178,0,0.30),0_28px_120px_rgba(255,107,0,0.14)]",
    chipBorder: "rgba(255,178,0,0.30)",
    chipBg: "rgba(255,178,0,0.10)",
    chipText: "#7B4300",
    accentText: "#7B4300"
  },
  Motivation: {
    bgA: "rgba(0,229,255,0.14)",
    bgB: "rgba(255,255,255,0.68)",
    bgC: "rgba(0,255,122,0.10)",
    aura1: "rgba(0,229,255,0.12)",
    aura2: "rgba(0,255,122,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(0,229,255,0.32),0_28px_120px_rgba(0,255,122,0.14)]",
    chipBorder: "rgba(0,229,255,0.30)",
    chipBg: "rgba(0,229,255,0.10)",
    chipText: "#00546C",
    accentText: "#00546C"
  },
  Apology: {
    bgA: "rgba(148,163,184,0.16)",
    bgB: "rgba(255,255,255,0.74)",
    bgC: "rgba(17,24,39,0.06)",
    aura1: "rgba(148,163,184,0.12)",
    aura2: "rgba(17,24,39,0.08)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(148,163,184,0.26),0_28px_120px_rgba(17,24,39,0.10)]",
    chipBorder: "rgba(0,0,0,0.12)",
    chipBg: "rgba(255,255,255,0.55)",
    chipText: "#334155",
    accentText: "#334155"
  },
  Seasonal: {
    bgA: "rgba(255,43,214,0.12)",
    bgB: "rgba(255,255,255,0.68)",
    bgC: "rgba(0,194,255,0.10)",
    aura1: "rgba(255,43,214,0.12)",
    aura2: "rgba(0,194,255,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(255,43,214,0.30),0_28px_120px_rgba(0,194,255,0.14)]",
    chipBorder: "rgba(255,43,214,0.30)",
    chipBg: "rgba(255,43,214,0.10)",
    chipText: "#A10078",
    accentText: "#A10078"
  },
  Timeless: {
    bgA: "rgba(11,16,32,0.10)",
    bgB: "rgba(255,255,255,0.76)",
    bgC: "rgba(11,16,32,0.06)",
    aura1: "rgba(11,16,32,0.10)",
    aura2: "rgba(167,139,250,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(11,16,32,0.22),0_28px_120px_rgba(11,16,32,0.12)]",
    chipBorder: "rgba(0,0,0,0.12)",
    chipBg: "rgba(255,255,255,0.55)",
    chipText: "#18181B",
    accentText: "#18181B"
  },
  Utility: {
    bgA: "rgba(0,255,234,0.12)",
    bgB: "rgba(255,255,255,0.70)",
    bgC: "rgba(79,70,255,0.10)",
    aura1: "rgba(0,255,234,0.12)",
    aura2: "rgba(79,70,255,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(0,255,234,0.30),0_28px_120px_rgba(79,70,255,0.14)]",
    chipBorder: "rgba(0,255,234,0.30)",
    chipBg: "rgba(0,255,234,0.10)",
    chipText: "#005E58",
    accentText: "#005E58"
  },
  Other: {
    bgA: "rgba(0,194,255,0.12)",
    bgB: "rgba(255,255,255,0.72)",
    bgC: "rgba(182,255,0,0.10)",
    aura1: "rgba(0,194,255,0.10)",
    aura2: "rgba(182,255,0,0.10)",
    ring: "group-hover:shadow-[0_0_0_1px_rgba(0,194,255,0.28),0_28px_120px_rgba(182,255,0,0.12)]",
    chipBorder: "rgba(0,0,0,0.12)",
    chipBg: "rgba(255,255,255,0.55)",
    chipText: "#18181B",
    accentText: "#18181B"
  }
};

function paletteFor(categoryKey: string): Palette {
  const k = normalizeCategoryKey(categoryKey);
  return PALETTES[k] ?? PALETTES.Other;
}

/* -----------------------------
   VARIANTS (TS-safe)
------------------------------ */
const gridV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.05 } }
} satisfies Variants;

const cardV = {
  hidden: { opacity: 0, y: 24, scale: 0.985, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 260, damping: 22 }
  }
} satisfies Variants;

/* -----------------------------
   KART İÇERİK METİNLERİ (düzenli)
------------------------------ */
function tagFor(categoryKey: string) {
  const k = normalizeCategoryKey(categoryKey);
  switch (k) {
    case "Holiday":
      return "KAR • IŞIK";
    case "Birthday":
      return "KUTLAMA • DİLEK";
    case "Invite":
      return "RSVP • ETKİNLİK";
    case "Work":
      return "PRO • TAKIM";
    case "Education":
      return "PLAN • ÖĞRENME";
    case "Marketing":
      return "NEON • CTA";
    case "ThankYou":
      return "ZARİF • SPARK";
    case "Congrats":
      return "BAŞARI • CONFETTI";
    case "Love":
      return "PULSE • ROMANTİK";
    case "Friends":
      return "POP • ENERJİ";
    case "Family":
      return "SICAK • YAKIN";
    case "Motivation":
      return "RISE • POZİTİF";
    case "Apology":
      return "SOFT • SAMİMİ";
    case "Seasonal":
      return "AURORA • MEVSİM";
    case "Timeless":
      return "KALİTE • SADE";
    case "Utility":
      return "PRATİK • HIZLI";
    default:
      return "KEŞFET";
  }
}

function descFor(categoryKey: string) {
  const k = normalizeCategoryKey(categoryKey);
  switch (k) {
    case "Holiday":
      return "Yılbaşı ve tatil akışları. Kış temalı zincir deneyimler.";
    case "Birthday":
      return "Doğum günü sürprizleri. Dilek ve kutlama kurguları.";
    case "Invite":
      return "Davet & RSVP. Etkinliği linkle paylaş, akış büyüsün.";
    case "Work":
      return "Takım ve süreç akışları. Check-in, duyuru, bildirim.";
    case "Education":
      return "Ders ve çalışma planları. Öğrenmeyi düzenli hale getir.";
    case "Marketing":
      return "Kampanya ve lansman. CTA odaklı, yüksek dönüşüm kurgusu.";
    case "ThankYou":
      return "Kısa, zarif teşekkürler. Minimal ama etkili iletişim.";
    case "Congrats":
      return "Başarı ve kilometre taşları. Tebrik zincirleri kur.";
    case "Love":
      return "Romantik, sıcak, modern. Duyguyu sade anlat.";
    case "Friends":
      return "Eğlence ve enerji. Arkadaşlarla hızlı paylaşım.";
    case "Family":
      return "Sıcak aile mesajları. Yakın ve samimi deneyimler.";
    case "Motivation":
      return "Pozitif akışlar. Günlük motivasyon ve yükseliş hissi.";
    case "Apology":
      return "Sakin ve samimi. Net bir özür kurgusu oluştur.";
    case "Seasonal":
      return "Mevsime göre setler. Döneme uygun renk ve stil.";
    case "Timeless":
      return "Her zaman kullanılabilir. Sade, güçlü ve kaliteli.";
    case "Utility":
      return "Mini araçlar. Kontrol listeleri, hızlı formlar, pratik akışlar.";
    default:
      return "Katalogda filtrele. Hızlıca başla ve paylaş.";
  }
}

/* -----------------------------
   ORTAK FX (tüm kartlara aynı)
------------------------------ */
function UnifiedFX({
  p,
  reduceMotion
}: {
  p: Palette;
  reduceMotion: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* premium grain */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[19px_19px]" />

      {/* iki aura blob (renk farklı, hareket aynı) */}
      {!reduceMotion && (
        <>
          <div
            className="absolute -top-28 -right-28 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: p.aura1,
              animation: "rgAuraA 9s ease-in-out infinite"
            }}
          />
          <div
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: p.aura2,
              animation: "rgAuraB 10.5s ease-in-out infinite"
            }}
          />
        </>
      )}

      {/* ortak shine (hover’da belirgin) */}
      <div
        className="absolute -left-48 top-0 h-full w-48 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)",
          animation: reduceMotion ? undefined : "rgShine 2.8s ease-in-out infinite"
        }}
      />
    </div>
  );
}

/* -----------------------------
   COMPONENT
------------------------------ */
export default function CategoryGrid({ templates }: { templates: Template[] }) {
  const reduceMotion = useReducedMotion();

  const counts = (templates ?? []).reduce<Record<string, number>>((acc, t) => {
    const key = normalizeCategoryKey(String(t.category ?? "Other"));
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(counts)
    .map(([k, v]) => ({ k, v }))
    .sort((a, b) => b.v - a.v);

  const max = Math.max(1, ...categories.map((x) => x.v));

  return (
    <>
      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={gridV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
      >
        {categories.map(({ k, v }, idx) => {
          const p = paletteFor(k);
          const ratio = Math.max(0.12, Math.min(1, v / max));
          const pct = Math.round(ratio * 100);

          return (
            <motion.div key={k} variants={cardV}>
              <Link
                href={`/templates?cat=${encodeURIComponent(k)}`}
                className={cx(
                  "group relative block overflow-hidden",
                  "h-[300px] rounded-[34px] border border-black/10",
                  "bg-white/55 backdrop-blur-xl shadow-sm",
                  "transition hover:-translate-y-2 hover:shadow-xl",
                  p.ring,
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                )}
              >
                {/* canlı surface */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${p.bgA} 0%, ${p.bgB} 45%, ${p.bgC} 100%)`
                  }}
                />

                {/* ortak FX */}
                <UnifiedFX p={p} reduceMotion={!!reduceMotion} />

                {/* top bevel */}
                <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-white/70 opacity-35" />

                {/* content */}
                <motion.div
                  className="relative h-full p-6 flex flex-col"
                  whileHover={reduceMotion ? {} : { rotateX: 3, rotateY: -3 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold tracking-tight text-zinc-900">
                        {nameTR(k)}
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] tracking-wide"
                          style={{
                            borderColor: p.chipBorder,
                            background: p.chipBg,
                            color: p.chipText
                          }}
                        >
                          {tagFor(k)}
                        </span>

                        {/* ortak canlı dot */}
                        <motion.span
                          className="h-2 w-2 rounded-full bg-black/25"
                          animate={reduceMotion ? {} : { opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
                          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs text-zinc-700/70">{v} şablon</div>
                      <div className="mt-2 text-[11px] opacity-80" style={{ color: p.accentText }}>
                        Filtrele →
                      </div>
                    </div>
                  </div>

                  {/* desc */}
                  <p className="mt-4 text-sm text-zinc-800/75 leading-relaxed line-clamp-3">
                    {descFor(k)}
                  </p>

                  {/* düzenli küçük “özellik satırı” */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      { t: "Stil", v: "Modern" },
                      { t: "Hız", v: "Anında" },
                      { t: "Pop.", v: pct > 66 ? "Yüksek" : "Normal" }
                    ].map((m) => (
                      <div
                        key={m.t}
                        className="rounded-2xl border border-black/10 bg-white/55 px-3 py-2"
                      >
                        <div className="text-[10px] text-zinc-500">{m.t}</div>
                        <div className="text-[11px] font-medium text-zinc-900">{m.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* footer */}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="text-[11px] text-zinc-600/80">
                      <span className="opacity-85">Kataloğa git</span>
                      <span className="mx-2 opacity-35">•</span>
                      <span className="opacity-75">Hızlı filtre</span>
                    </div>

                    <motion.span
                      className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-zinc-900 shadow-sm"
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.35, delay: 0.06 }}
                      animate={reduceMotion ? {} : { y: [0, -1.2, 0] }}
                    >
                      Hızlı başla →
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* clamp + keyframes */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Tüm kartlarda animasyon aynı */
        @keyframes rgAuraA {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: .55; }
          50% { transform: translate(-10px, 12px) scale(1.05); opacity: .9; }
        }

        @keyframes rgAuraB {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: .45; }
          50% { transform: translate(12px, -10px) scale(1.06); opacity: .8; }
        }

        @keyframes rgShine {
          0% { transform: translateX(-260px) rotate(12deg); opacity: 0; }
          25% { opacity: .95; }
          100% { transform: translateX(980px) rotate(12deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}
