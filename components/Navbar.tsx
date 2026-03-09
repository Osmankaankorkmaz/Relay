"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Menu, X, Command } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LINKS = [
  { href: "/templates", label: "Şablonlar" },
  { href: "/collections", label: "Koleksiyonlar" },
  { href: "/create", label: "Oluştur" },
  { href: "/changelog", label: "Güncellemeler" },
  { href: "/submit-template", label: "Öner" }
];

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function Navbar({ onCommandPalette }: { onCommandPalette?: () => void }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 120], [0, -6]);
  const scale = useTransform(scrollY, [0, 140], [1, 0.985]);
  const bgOpacity = useTransform(scrollY, [0, 140], [0.55, 0.82]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!onCommandPalette) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && isK) {
        e.preventDefault();
        onCommandPalette();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCommandPalette]);

  const activeHref = useMemo(() => {
    const found = LINKS.find((l) => pathname === l.href || pathname.startsWith(l.href + "/"));
    return found?.href ?? "";
  }, [pathname]);

  return (
    <motion.header className="sticky top-0 z-50" style={{ y: reduceMotion ? 0 : (y as any), scale: reduceMotion ? 1 : (scale as any) }}>
      {/* üst mini glow çizgisi */}
      <div className="h-px bg-linear-to-r from-transparent via-black/15 to-transparent" />

      <motion.div
        className="border-b border-black/10 backdrop-blur-2xl"
        style={{
          backgroundColor: reduceMotion ? "rgba(255,255,255,0.8)" : (bgOpacity as any)
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-3">
          {/* 2 satırlı layout */}
          <div className="flex items-center justify-between gap-4">
            {/* Sol: marka */}
            <Link href="/" className="group flex items-center gap-3">
              <motion.div
                className="relative h-10 w-10 rounded-2xl bg-zinc-900 text-white grid place-items-center overflow-hidden"
                whileHover={reduceMotion ? {} : { rotate: -2, y: -1, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {/* gradient glow */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-fuchsia-300/25 blur-2xl" />
                  <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan-300/25 blur-2xl" />
                </motion.div>

                {/* shine sweep */}
                <motion.div
                  aria-hidden
                  className="absolute -left-12 top-0 h-full w-12 bg-linear-to-r from-transparent via-white/35 to-transparent rotate-12"
                  animate={reduceMotion ? {} : { x: [-60, 170] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
                />
                <span className="relative font-semibold">R</span>
              </motion.div>

              <div className="leading-tight">
                <div className="font-semibold text-zinc-900">Relay</div>
                <div className="text-xs text-zinc-500">Şablon • Tema • Paylaş</div>
              </div>
            </Link>

            {/* Sağ: aksiyonlar */}
            <div className="flex items-center gap-2">
              {/* Komut kısayolu */}
              <motion.button
                type="button"
                onClick={onCommandPalette}
                className={cx(
                  "hidden sm:inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-xs text-zinc-700",
                  onCommandPalette ? "hover:bg-black/5" : "cursor-default"
                )}
                whileHover={onCommandPalette && !reduceMotion ? { y: -1 } : {}}
                whileTap={onCommandPalette ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Command className="h-4 w-4 opacity-70" />
                <span className="opacity-80">Komut</span>
                <span className="rounded-xl border border-black/10 bg-white px-2 py-1 text-[11px]">⌘K</span>
              </motion.button>

              {/* CTA */}
              <motion.div whileHover={reduceMotion ? {} : { scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/create"
                  className="relative inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white overflow-hidden"
                >
                  {/* gradient border */}
                  <span className="absolute inset-0 rounded-2xl bg-linear-to-r from-fuchsia-500 via-cyan-400 to-emerald-400" />
                  <span className="absolute inset-px rounded-2xl bg-zinc-900" />

                  {/* shine */}
                  <motion.span
                    aria-hidden
                    className="absolute -left-12 top-0 h-full w-12 bg-linear-to-r from-transparent via-white/30 to-transparent rotate-12"
                    animate={reduceMotion ? {} : { x: [-60, 260] }}
                    transition={{ duration: 2.1, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
                  />

                  <span className="relative inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Oluştur
                  </span>
                </Link>
              </motion.div>

              {/* Mobil menü */}
              <motion.button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-2 hover:bg-black/5 transition"
                onClick={() => setOpen((v) => !v)}
                whileTap={{ scale: 0.98 }}
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>

          {/* ORTA: Floating pill menü (desktop) */}
          <div className="mt-3 hidden md:flex justify-center">
            <motion.div
              className="relative inline-flex items-center gap-1 rounded-[999px] border border-black/10 bg-white/70 backdrop-blur-xl p-1 shadow-sm"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* active glow pill */}
              <AnimatePresence initial={false}>
                {activeHref ? (
                  <motion.div
                    key={activeHref}
                    layoutId="active-pill"
                    className="absolute top-1 bottom-1 rounded-[999px] bg-black/5"
                    style={{
                      // genişliği/konumu linke göre ayarlamak için “layoutId” yeterli,
                      // aynı wrapper içinde her item aynı padding’le olduğunda otomatik kayar.
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </AnimatePresence>

              {LINKS.map((l) => {
                const isActive = l.href === activeHref;
                return (
                  <motion.div key={l.href} className="relative">
                    <Link
                      href={l.href}
                      className={cx(
                        "relative z-1 inline-flex items-center justify-center rounded-[999px] px-4 py-2 text-sm transition",
                        isActive ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                      )}
                    >
                      {l.label}
                    </Link>
                    {/* küçük alt çizgi (aktif) */}
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-zinc-900/70"
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -2 }}
                          transition={{ duration: 0.18 }}
                        />
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* MOBİL: Tam ekran cam drawer */}
        <AnimatePresence>
          {open ? (
            <motion.div
              className="md:hidden fixed inset-0 z-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* arka overlay */}
              <motion.button
                type="button"
                className="absolute inset-0 bg-black/20"
                onClick={() => setOpen(false)}
                aria-label="Menüyü kapat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* panel */}
              <motion.div
                className="absolute left-0 right-0 top-0 border-b border-black/10 bg-white/80 backdrop-blur-2xl"
                initial={{ y: -18, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -18, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-zinc-900 text-white grid place-items-center font-semibold">
                      R
                    </div>
                    <div className="leading-tight">
                      <div className="font-semibold">Relay</div>
                      <div className="text-xs text-zinc-500">Menü</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-2"
                    onClick={() => setOpen(false)}
                    aria-label="Menüyü kapat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <motion.nav
                  className="mx-auto max-w-6xl px-6 pb-6 pt-2 grid gap-2"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } }
                  }}
                >
                  {LINKS.map((l) => {
                    const isActive = l.href === activeHref;
                    return (
                      <motion.div
                        key={l.href}
                        variants={{
                          hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
                          show: { opacity: 1, y: 0, filter: "blur(0px)" }
                        }}
                      >
                        <Link
                          href={l.href}
                          className={cx(
                            "flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm",
                            isActive ? "text-zinc-900" : "text-zinc-700"
                          )}
                        >
                          <span>{l.label}</span>
                          {isActive ? <span className="text-xs text-zinc-500">Aktif</span> : null}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)" }
                    }}
                    className="pt-2"
                  >
                    <Link
                      href="/create"
                      className="relative flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white overflow-hidden"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute -left-12 top-0 h-full w-12 bg-linear-to-r from-transparent via-white/25 to-transparent rotate-12"
                        animate={reduceMotion ? {} : { x: [-60, 340] }}
                        transition={{ duration: 2.0, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
                      />
                      <Sparkles className="h-4 w-4 relative" />
                      <span className="relative">Hemen oluştur</span>
                    </Link>
                  </motion.div>
                </motion.nav>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
