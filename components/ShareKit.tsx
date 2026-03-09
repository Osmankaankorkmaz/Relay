"use client";

import { useMemo, useState } from "react";

export default function ShareKit({
  url,
  onShare
}: {
  url: string;
  onShare?: () => void | Promise<void>;
}) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = useMemo(() => {
    if (!url) return "";
    if (typeof window === "undefined") return url;
    const base = window.location.origin;
    return url.startsWith("http") ? url : `${base}${url}`;
  }, [url]);

  async function copy() {
    if (!absoluteUrl) return;
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  async function nativeShare() {
    if (!absoluteUrl) return;
    try {
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share({ title: "Relay", url: absoluteUrl });
      } else {
        await copy();
      }
      await onShare?.();
    } catch {}
  }

  return (
    <div className="rounded-4xl border border-black/10 bg-white/80 backdrop-blur p-6">
      <div className="text-sm font-semibold">Paylaş</div>
      <div className="mt-2 text-sm text-zinc-600">
        Linki kopyala veya cihazın paylaş menüsünü kullan.
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm break-all">
          {absoluteUrl || "—"}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copy}
            disabled={!absoluteUrl}
            className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm hover:bg-black/5 transition disabled:opacity-50"
          >
            {copied ? "Kopyalandı ✓" : "Linki kopyala"}
          </button>

          <button
            type="button"
            onClick={nativeShare}
            disabled={!absoluteUrl}
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm text-white hover:bg-zinc-800 transition disabled:opacity-50"
          >
            Paylaş
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-zinc-500">
        Gizlilik: Relay minimum veri ilkesiyle çalışır.
      </div>
    </div>
  );
}
