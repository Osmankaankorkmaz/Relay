"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronUp, Shield, Sparkles, Zap } from "lucide-react";

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const LINKS = [
  { href: "/templates", label: "Şablonlar" },
  { href: "/collections", label: "Koleksiyonlar" },
  { href: "/create", label: "Oluştur" },
  { href: "/submit-template", label: "Öner" },
  { href: "/about", label: "Hakkında" },
  { href: "/contact", label: "İletişim" }
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const scrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-black/10 bg-white overflow-hidden">
      {/* Soft arka plan ışıkları */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute -top-24 left-1/2 h-64 w-4xl -translate-x-1/2 rounded-full bg-fuchsia-200/25 blur-3xl"
          animate={reduceMotion ? {} : { x: [-12, 12, -12], y: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-40 -right-40 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl"
          animate={reduceMotion ? {} : { x: [0, -12, 0], y: [0, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]" />
      </div>

      {/* Üstte dekoratif gradient çizgi */}
      <motion.div
        className="h-0.5 w-full bg-linear-to-r from-transparent via-black/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        {/* ÜST: CTA kartı */}
        <motion.div
          className="rounded-[2.25rem] border border-black/10 bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          {/* shine */}
          <motion.div
            aria-hidden
            className="absolute -left-40 top-0 h-full w-40 bg-linear-to-r from-transparent via-white/45 to-transparent rotate-12"
            animate={reduceMotion ? {} : { x: [-220, 980] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
          />

          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-xs text-zinc-500">Relay</div>
              <div className="mt-2 text-2xl md:text-3xl font-semibold text-zinc-900">
                Bir deneyim üret, linki paylaş.
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                Şablon → Tema → İçerik → Paylaş
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {[
                  { icon: <Shield className="h-3.5 w-3.5" />, text: "Gizlilik odaklı", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
                  { icon: <Zap className="h-3.5 w-3.5" />, text: "Hızlı", cls: "border-amber-200 bg-amber-50 text-amber-700" },
                  { icon: <Sparkles className="h-3.5 w-3.5" />, text: "Şık temalar", cls: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700" }
                ].map((b) => (
                  <span
                    key={b.text}
                    className={cx(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 border",
                      b.cls
                    )}
                  >
                    {b.icon}
                    {b.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/create"
                  className="relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white overflow-hidden"
                >
                  <span className="absolute inset-0 rounded-2xl bg-linear-to-r from-fuchsia-500 via-cyan-400 to-emerald-400" />
                  <span className="absolute inset-px rounded-2xl bg-zinc-900" />
                  <span className="relative inline-flex items-center gap-2">
                    Hemen oluştur <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={reduceMotion ? {} : { y: -1 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="button"
                  onClick={scrollTop}
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-black/5 transition"
                >
                  Yukarı çık <ChevronUp className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </div>

          <div className="h-2 bg-linear-to-r from-amber-400 via-fuchsia-500 to-cyan-400" />
        </motion.div>

        {/* ALT: 3 kolon */}
        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Marka */}
          <motion.div variants={fadeUp}>
            <div className="font-semibold text-zinc-900">Relay</div>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Şablonlar + Temalar + Oluşturucu + Paylaşım.
              Ücretsiz, ürün standardında bir mikro-deneyim platformu.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                Reklam yok
              </span>
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                Veri satışı yok
              </span>
              <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
                Minimum veri
              </span>
            </div>
          </motion.div>

          {/* Linkler */}
          <motion.div variants={fadeUp} className="text-sm">
            <div className="font-medium text-zinc-900">Bağlantılar</div>
            <div className="mt-3 grid gap-2 text-zinc-600">
              {LINKS.map((l) => (
                <motion.div
                  key={l.href}
                  whileHover={reduceMotion ? {} : { x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <Link className="group inline-flex items-center gap-2 hover:text-zinc-900" href={l.href}>
                    <span className="relative">
                      {l.label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-70 transition" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Politika */}
          <motion.div variants={fadeUp} className="text-sm">
            <div className="font-medium text-zinc-900">Gizlilik</div>
            <div className="mt-3 text-zinc-600 leading-relaxed">
              Minimum veri. Reklam yok. Veri satışı yok.
              <div className="mt-2 text-xs text-zinc-500">
                Analitikler anonim sayaç mantığındadır (görüntülenme/kullanım/paylaşım).
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-4 py-3 text-xs text-zinc-600">
                <div className="font-medium text-zinc-800">Kısa not</div>
                <div className="mt-1">
                  Relay, içerikleri “paylaşılabilir link” yaklaşımıyla sunar.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* En alt bar */}
      <div className="relative border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-zinc-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Relay</span>
          <span>Relay • Ücretsiz • Gizlilik odaklı</span>
        </div>
      </div>
    </footer>
  );
}
