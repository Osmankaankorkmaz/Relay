"use client";

import type { Collection } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function hashToHue(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h % 360;
}

function hashToPick(input: string, mod: number) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 131 + input.charCodeAt(i)) >>> 0;
  return h % mod;
}

/**
 * Koleksiyona göre otomatik "kapak":
 * - canlı gradient
 * - seçili pattern
 * - soft scan/shine
 */
function useCover(seed: string) {
  const hue = hashToHue(seed);
  const hue2 = (hue + 72) % 360;
  const hue3 = (hue + 168) % 360;

  const variant = hashToPick(seed, 6); // 0..5 pattern seçimi

  // canlı ama premium alpha
  const g1 = `hsla(${hue}, 95%, 55%, 0.18)`;
  const g2 = `hsla(${hue2}, 95%, 55%, 0.14)`;
  const g3 = `hsla(${hue3}, 95%, 55%, 0.12)`;

  const chipBorder = `hsla(${hue}, 95%, 55%, 0.30)`;
  const chipBg = `hsla(${hue}, 95%, 55%, 0.10)`;
  const chipText = `hsl(${hue}, 70%, 30%)`;
  const accent = `hsl(${hue}, 70%, 30%)`;

  const ringShadow = `0 0 0 1px hsla(${hue}, 95%, 55%, 0.24), 0 28px 120px hsla(${hue2}, 95%, 55%, 0.16)`;

  // Kapak gradienti (üst bölüm)
  const coverBg = `linear-gradient(135deg, ${g1} 0%, rgba(255,255,255,0.58) 42%, ${g2} 100%)`;

  // Kartın ana surface’i (alt bölümle uyum)
  const surfaceBg = `linear-gradient(135deg, ${g2} 0%, rgba(255,255,255,0.70) 48%, ${g3} 100%)`;

  return {
    hue,
    hue2,
    hue3,
    variant,
    g1,
    g2,
    g3,
    chipBorder,
    chipBg,
    chipText,
    accent,
    ringShadow,
    coverBg,
    surfaceBg
  };
}

function Pattern({
  variant,
  reduceMotion
}: {
  variant: number;
  reduceMotion: boolean;
}) {
  // Patternler sadece görsel; animasyon dili aynı
  // (arka plan dokusu küçük opaklık)
  const base = "pointer-events-none absolute inset-0 opacity-[0.10]";

  if (variant === 0) {
    return <div className={cx(base, "bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]")} />;
  }
  if (variant === 1) {
    return <div className={cx(base, "bg-[linear-gradient(90deg,rgba(0,0,0,.10)_1px,transparent_1px)] bg-[length:20px_20px]")} />;
  }
  if (variant === 2) {
    return <div className={cx(base, "bg-[linear-gradient(0deg,rgba(0,0,0,.10)_1px,transparent_1px)] bg-[length:20px_20px]")} />;
  }
  if (variant === 3) {
    return <div className={cx(base, "bg-[conic-gradient(from_180deg,rgba(0,0,0,.12),transparent,rgba(0,0,0,.10),transparent)]")} />;
  }
  if (variant === 4) {
    return (
      <div
        className={cx(base, "opacity-[0.08]")}
        style={{
          background:
            "repeating-linear-gradient(135deg, rgba(0,0,0,.12) 0 1px, transparent 1px 12px)"
        }}
      />
    );
  }
  // variant 5
  return (
    <div
      className={cx(base, "opacity-[0.08]")}
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(0,0,0,.14), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,0,0,.10), transparent 60%)"
      }}
    />
  );
}

export default function CollectionCard({ c, count }: { c: Collection; count: number }) {
  const reduceMotion = useReducedMotion();

  const seed = `${c.slug ?? ""}-${c.title ?? ""}-${c.desc ?? ""}`;
  const cover = useCover(seed);

  const glow = clamp(count, 1, 22);
  const glowScale = 0.86 + glow / 32;

  return (
    <motion.div
      className={cx(
        "group relative overflow-hidden",
        "rounded-[34px] border border-black/10",
        "bg-white/55 backdrop-blur-xl shadow-sm",
        "transition will-change-transform"
      )}
      whileHover={reduceMotion ? {} : { y: -8 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      {/* surface */}
      <div className="pointer-events-none absolute inset-0" style={{ background: cover.surfaceBg }} />

      {/* premium hover ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[34px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: cover.ringShadow }}
      />

      {/* aura blobs (ortak dil) */}
      {!reduceMotion && (
        <>
          <div
            className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: cover.g1,
              transform: `scale(${glowScale})`,
              animation: "cc2AuraA 9s ease-in-out infinite"
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: cover.g2,
              transform: `scale(${glowScale})`,
              animation: "cc2AuraB 10.5s ease-in-out infinite"
            }}
          />
        </>
      )}

      {/* hover shine */}
      <div
        className="pointer-events-none absolute -left-48 top-0 h-full w-48 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)",
          animation: reduceMotion ? undefined : "cc2Shine 2.8s ease-in-out infinite"
        }}
      />

      {/* content */}
      <div className="relative p-6">
        {/* COVER */}
        <div className="relative overflow-hidden rounded-[26px] border border-black/10 bg-white/50">
          <div className="absolute inset-0" style={{ background: cover.coverBg }} />
          <Pattern variant={cover.variant} reduceMotion={!!reduceMotion} />

          {/* cover scan (hepsinde aynı, çok hafif) */}
          {!reduceMotion && (
            <div
              className="pointer-events-none absolute left-0 top-0 h-10 w-full opacity-50"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(255,255,255,.20), transparent)",
                animation: "cc2Scan 3.2s linear infinite"
              }}
            />
          )}

          <motion.div
            className="relative p-4"
            whileHover={reduceMotion ? {} : { rotateX: 3, rotateY: -3 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold tracking-tight text-zinc-900 line-clamp-1">
                  {c.title}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] tracking-wide"
                    style={{
                      borderColor: cover.chipBorder,
                      background: cover.chipBg,
                      color: cover.chipText
                    }}
                  >
                    Koleksiyon
                  </span>

                  <motion.span
                    className="h-2 w-2 rounded-full bg-black/25"
                    animate={reduceMotion ? {} : { opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
                    transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-xs text-zinc-700/70">{count} şablon</div>
                <div className="mt-2 text-[11px]" style={{ color: cover.accent }}>
                  İncele →
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BODY */}
        <p className="mt-4 text-sm text-zinc-800/75 leading-relaxed line-clamp-3">
          {c.desc}
        </p>

        {/* meta row (düzenli, bar yok) */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { t: "Stil", v: "Modern" },
            { t: "Format", v: "Paket" },
            { t: "Akış", v: "Hızlı" }
          ].map((m) => (
            <div key={m.t} className="rounded-2xl border border-black/10 bg-white/55 px-3 py-2">
              <div className="text-[10px] text-zinc-500">{m.t}</div>
              <div className="text-[11px] font-medium text-zinc-900">{m.v}</div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-[11px] text-zinc-600/80">
            <span className="opacity-85">Hazır set</span>
            <span className="mx-2 opacity-35">•</span>
            <span className="opacity-75">Hızlı başlangıç</span>
          </div>

          <motion.span
            className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-zinc-900 shadow-sm"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            animate={reduceMotion ? {} : { y: [0, -1.2, 0] }}
          >
            Aç →
          </motion.span>
        </div>
      </div>

      {/* helpers + anims */}
      <style jsx global>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* CategoryGrid ile aynı animasyon dili */
        @keyframes cc2AuraA {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate(-10px, 12px) scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes cc2AuraB {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.45;
          }
          50% {
            transform: translate(12px, -10px) scale(1.06);
            opacity: 0.8;
          }
        }

        @keyframes cc2Shine {
          0% {
            transform: translateX(-260px) rotate(12deg);
            opacity: 0;
          }
          25% {
            opacity: 0.95;
          }
          100% {
            transform: translateX(980px) rotate(12deg);
            opacity: 0;
          }
        }

        @keyframes cc2Scan {
          0% { transform: translateY(-20px); opacity: 0; }
          15% { opacity: .55; }
          100% { transform: translateY(220px); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
