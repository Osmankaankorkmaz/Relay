"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Collection, Template } from "@/lib/types";
import { Search } from "lucide-react";

type Item =
  | { kind: "template"; title: string; href: string; subtitle: string }
  | { kind: "collection"; title: string; href: string; subtitle: string }
  | { kind: "page"; title: string; href: string; subtitle: string };

export default function CommandPalette({
  templates,
  collections
}: {
  templates: Template[];
  collections: Collection[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const pages: Item[] = [
    { kind: "page", title: "Create", href: "/create", subtitle: "Experience builder" },
    { kind: "page", title: "Templates", href: "/templates", subtitle: "Catalog" },
    { kind: "page", title: "Collections", href: "/collections", subtitle: "Packs" },
    { kind: "page", title: "Submit template", href: "/submit-template", subtitle: "Suggest a template" },
    { kind: "page", title: "Changelog", href: "/changelog", subtitle: "Updates" }
  ];

  const items = useMemo(() => {
    const base: Item[] = [
      ...pages,
      ...collections.map((c) => ({
        kind: "collection" as const,
        title: c.title,
        href: "/collections",
        subtitle: c.desc
      })),
      ...templates.map((t) => ({
        kind: "template" as const,
        title: t.title,
        href: `/templates/${t.slug}`,
        subtitle: t.short
      }))
    ];

    const qq = q.trim().toLowerCase();
    const filtered = qq
      ? base.filter((x) => (x.title + " " + x.subtitle).toLowerCase().includes(qq))
      : base;

    return filtered.slice(0, 20);
  }, [q, templates, collections]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (!open) return;

      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") setIdx((i) => Math.min(i + 1, items.length - 1));
      if (e.key === "ArrowUp") setIdx((i) => Math.max(i - 1, 0));
      if (e.key === "Enter") {
        const it = items[idx];
        if (it) {
          setOpen(false);
          router.push(it.href);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, idx, router]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100">
      <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
      <div className="absolute left-1/2 top-20 w-[92vw] max-w-xl -translate-x-1/2 rounded-[1.75rem] border border-black/10 bg-white p-3 shadow-2xl">
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            placeholder="Search templates, collections, pages…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            autoFocus
          />
          <kbd className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs text-zinc-500">
            ESC
          </kbd>
        </div>

        <div className="mt-2 max-h-[52vh] overflow-auto">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-zinc-600">No results.</div>
          ) : (
            <ul className="p-1">
              {items.map((it, i) => (
                <li key={`${it.kind}-${it.href}-${i}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push(it.href);
                    }}
                    className={[
                      "w-full text-left rounded-2xl px-4 py-3 transition",
                      i === idx ? "bg-zinc-900 text-white" : "hover:bg-black/5"
                    ].join(" ")}
                  >
                    <div className="text-sm font-medium">{it.title}</div>
                    <div className={`mt-1 text-xs ${i === idx ? "text-white/80" : "text-zinc-500"}`}>
                      {it.subtitle}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-4 py-2 text-xs text-zinc-500">Navigate: ↑↓ • Open: Enter • Toggle: ⌘K</div>
      </div>
    </div>
  );
}
