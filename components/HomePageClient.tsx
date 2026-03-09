"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Analytics, Collection, Settings, Template, ThemePreset } from "@/lib/types";
import CategoryGrid from "@/components/CategoryGrid";
import TrendingStrip from "@/components/TrendingStrip";
import TemplateCard from "@/components/TemplateCard";
import CollectionCard from "@/components/CollectionCard";
import LivePreview from "@/components/LivePreview";
import Section from "@/components/Section";
import { featuredTemplates } from "@/lib/ranking";

function pill(cls: string) {
  return `inline-flex items-center rounded-full px-3 py-1 text-xs border ${cls}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
};

const pop = {
  hidden: { opacity: 0, scale: 0.96, y: 10, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 220, damping: 20 }
  }
};

export default function HomePageClient({
  settings,
  templates,
  collections,
  themes,
  analytics
}: {
  settings: Settings;
  templates: Template[];
  collections: Collection[];
  themes: ThemePreset[];
  analytics: Analytics;
}) {
  const reduceMotion = useReducedMotion();

  const featured = featuredTemplates(templates, 6);

  return (
    <main className="min-h-screen text-zinc-900">
      {/* Renkli arka plan */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute -top-24 left-1/2 h-72 w-240 -translate-x-1/2 rounded-full bg-fuchsia-200/40 blur-3xl"
          animate={reduceMotion ? {} : { x: [-18, 18, -18], y: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 -right-40 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl"
          animate={reduceMotion ? {} : { x: [0, -18, 0], y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 -left-40 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
          animate={reduceMotion ? {} : { x: [0, 16, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-24 h-52 w-52 rounded-full bg-lime-200/30 blur-3xl"
          animate={reduceMotion ? {} : { x: [0, -14, 0], y: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gren dokusu */}
        <motion.div
          className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        {/* HERO */}
        <motion.section
          className="rounded-[2.5rem] border border-black/10 bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden"
          initial="hidden"
          animate="show"
          variants={pop}
        >
          {/* Üst parıltı */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              aria-hidden
              className="absolute -left-40 top-0 h-full w-40 bg-linear-to-r from-transparent via-white/40 to-transparent rotate-12"
              animate={reduceMotion ? {} : { x: [-220, 980] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="p-8 md:p-10 relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Sol */}
              <motion.div className="max-w-2xl" variants={stagger} initial="hidden" animate="show">
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {["Relay", "Şablonlar", "Temalar", "Paylaşılabilir"].map((x) => (
                    <motion.span
                      key={x}
                      className={pill("border-black/10 bg-white text-zinc-700")}
                      whileHover={reduceMotion ? {} : { y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      {x}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]"
                >
                  Rengarenk,
                  <span className="block">
                    modern ve <span className="text-zinc-500">paylaşılabilir</span>.
                  </span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-4 text-sm md:text-base text-zinc-600 leading-relaxed">
                  <b className="text-zinc-800">Relay</b>; her kategori için (Tatil, İş, Davet, Eğitim, Pazarlama, Araçlar…)
                  <b className="text-zinc-800"> şablon + tema + paylaşım</b> akışı sunar.
                  Ücretsiz kalır, ürün standardında gelişir.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                  <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={`/create?template=${encodeURIComponent(settings.defaults.defaultTemplateSlug)}`}
                      className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
                    >
                      Deneyim oluştur
                    </Link>
                  </motion.div>

                  <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/templates"
                      className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 transition"
                    >
                      Kataloğa göz at
                    </Link>
                  </motion.div>

                  <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/submit-template"
                      className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 transition"
                    >
                      Şablon öner
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2 text-xs">
                  {[
                    ["Reklam yok", "border-emerald-200 bg-emerald-50 text-emerald-700"],
                    ["Veri satışı yok", "border-sky-200 bg-sky-50 text-sky-700"],
                    ["Minimum veri", "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700"],
                    ["Hızlı", "border-amber-200 bg-amber-50 text-amber-700"]
                  ].map(([label, cls]) => (
                    <motion.span
                      key={label}
                      className={pill(cls)}
                      whileHover={reduceMotion ? {} : { y: -2 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    >
                      {label}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Sağ istatistikler */}
              <motion.div
                className="w-full lg:w-88"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                <motion.div className="grid grid-cols-2 gap-3" variants={stagger} initial="hidden" animate="show">
                  {[
                    { k: "Şablon", v: String(templates.length) },
                    { k: "Tema", v: String(themes.length) },
                    { k: "Oluşturulan", v: String(analytics.experiences.created) },
                    { k: "Açılan", v: String(analytics.experiences.opened) }
                  ].map((s) => (
                    <motion.div
                      key={s.k}
                      variants={fadeUp}
                      whileHover={reduceMotion ? {} : { y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                      className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-4 shadow-sm"
                    >
                      <div className="text-xs text-zinc-500">{s.k}</div>
                      <div className="mt-1 text-2xl font-semibold">{s.v}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-3 rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22 }}
                  whileHover={reduceMotion ? {} : { y: -2 }}
                >
                  <div className="text-xs text-zinc-500">Nasıl çalışır?</div>
                  <div className="mt-2 grid gap-2 text-sm text-zinc-700">
                    {[
                      ["1", "Şablon seç"],
                      ["2", "Tema seç"],
                      ["3", "Linki paylaş"]
                    ].map(([n, txt]) => (
                      <motion.div
                        key={n}
                        className="flex gap-2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.26 + Number(n) * 0.06 }}
                      >
                        <span className="h-6 w-6 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-xs">
                          {n}
                        </span>
                        {txt}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Alt mini şerit */}
            <motion.div
              className="mt-8 grid gap-3 md:grid-cols-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {[
                {
                  t: "Bütün kategoriler",
                  d: "Katalog her senaryoyu kapsar: iş, okul, etkinlik, pazarlama…"
                },
                {
                  t: "Tema motoru",
                  d: "Aynı içerik; neon, aurora, minimal gibi stillerle yeniden doğar."
                },
                { t: "Zincir etkisi", d: "Kimden geldi korunur; alıcı tek tıkla devam ettirir." }
              ].map((x) => (
                <motion.div
                  key={x.t}
                  variants={fadeUp}
                  whileHover={reduceMotion ? {} : { y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-4"
                >
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-xs text-zinc-600">{x.d}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dekoratif alt bar */}
          <motion.div
            className="h-2 bg-linear-to-r from-fuchsia-500 via-cyan-400 to-emerald-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.section>

        {/* KATEGORİLER */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Section
              eyebrow="Platform"
              title="Kategoriler"
              desc="İstediğin bağlamı seç, tek tıkla filtrele, hızlıca başla."
              right={
                <Link
                  href="/templates"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 transition"
                >
                  Kataloğa git →
                </Link>
              }
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <CategoryGrid templates={templates} />
          </motion.div>
        </motion.section>

        {/* TREND */}
        {settings.flags.enableTrending ? (
          <motion.section
            className="mt-12"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <TrendingStrip templates={templates} analytics={analytics} limit={6} />
            </motion.div>
          </motion.section>
        ) : null}

        {/* ÖNE ÇIKANLAR */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Section
              eyebrow="Seçkiler"
              title="Öne çıkan şablonlar"
              desc="Hızlı başlangıç için seçilmiş, dili oturmuş şablonlar."
              right={
                <Link
                  href="/templates"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 transition"
                >
                  Tümünü gör →
                </Link>
              }
            />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={reduceMotion ? {} : { y: -6 }}
              >
                <TemplateCard t={t} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* KOLEKSİYONLAR */}
        {settings.flags.enableCollections ? (
          <motion.section
            className="mt-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Section
                eyebrow="Paketler"
                title="Koleksiyonlar"
                desc="Tatil Paketi, Ekip Paketi, Etkinlik Paketi gibi hızlı setler."
                right={
                  <Link
                    href="/collections"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 transition"
                  >
                    Koleksiyonlar →
                  </Link>
                }
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 grid gap-4 md:grid-cols-3">
              {collections.slice(0, 3).map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={reduceMotion ? {} : { y: -6 }}
                >
                  <CollectionCard c={c} count={c.templateSlugs.length} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ) : null}

        {/* CANLI ÖNİZLEME */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Section
              eyebrow="Dene"
              title="Canlı önizleme"
              desc="Şablon seç, alanları doldur, tema değiştir — anında gör."
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <LivePreview templates={templates} themes={themes} />
          </motion.div>
        </motion.section>

        {/* EYLEM ÇAĞRISI */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div className="rounded-[2.25rem] border border-black/10 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-sm overflow-hidden relative">
            <motion.div
              aria-hidden
              className="absolute -left-40 top-0 h-full w-40 bg-linear-to-r from-transparent via-white/45 to-transparent rotate-12"
              animate={reduceMotion ? {} : { x: [-220, 980] }}
              transition={{ duration: 2.7, repeat: Infinity, repeatDelay: 2.3, ease: "easeInOut" }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs text-zinc-500">Relay</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">Bir deneyim üret, linki paylaş.</div>
                <div className="mt-2 text-sm text-zinc-600">Şablon → Tema → İçerik → Paylaş</div>
              </div>

              <div className="flex gap-3">
                <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/create"
                    className="rounded-2xl bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition"
                  >
                    Başla
                  </Link>
                </motion.div>
                <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/templates"
                    className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 transition"
                  >
                    Kataloğu aç
                  </Link>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-8 h-2 rounded-full bg-linear-to-r from-amber-400 via-fuchsia-500 to-cyan-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Footer */}
          <motion.div
            className="mt-8 pb-10 text-xs text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={fade}
            transition={{ duration: 0.5 }}
          >
            <span>© {new Date().getFullYear()} Relay</span>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
