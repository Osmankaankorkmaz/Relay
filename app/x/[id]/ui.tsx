"use client";

import { useEffect, useMemo, useState } from "react";
import type { Experience, Template, ThemePreset } from "@/lib/types";
import RunnerShareClient from "@/components/RunnerShareClient";

async function postJSON(url: string, data: any) {
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  }).catch(() => null);
}

export default function RunnerClient({
  exp,
  template,
  theme
}: {
  exp: Experience;
  template?: Template;
  theme: ThemePreset;
}) {
  const [receiverName, setReceiverName] = useState(exp.vars.receiverName ?? "");

  const sender = exp.vars.senderName || exp.ref || "Birisi";
  const ref = exp.ref || "";
  const message = exp.vars.message || "";

  const title = template?.title ?? "Relay Experience";
  const slug = template?.slug;
  const shareUrl = `/x/${exp.id}`;

  useEffect(() => {
    postJSON("/api/analytics", { type: "exp_opened" });
    if (slug) postJSON("/api/analytics", { type: "view", slug });
  }, [slug]);

  const greeting = useMemo(() => {
    const name = receiverName.trim();
    return name ? `Merhaba, ${name}!` : "Merhaba!";
  }, [receiverName]);

  const pageBg = theme.bg || "bg-white";
  const card = theme.card || "bg-white/80 border border-black/10";
  const text = theme.text || "text-zinc-900";
  const muted = theme.muted || "text-zinc-600";
  const accent = theme.accent || "from-indigo-500 via-fuchsia-500 to-amber-400";

  const isMinimal = theme.id === "minimal";

  const inputClass = isMinimal
    ? "bg-white border border-black/10 text-zinc-900 placeholder:text-zinc-400"
    : "bg-white/10 border border-white/15 text-white placeholder:text-white/50";

  const messageClass = isMinimal
    ? "border border-black/10 bg-zinc-50 text-zinc-900"
    : "border border-white/12 bg-white/5 text-white";

  const chipClass = isMinimal
    ? "border border-black/10 bg-white text-zinc-800"
    : "border border-white/15 bg-white/5 text-white";

  return (
    <main className={`min-h-screen ${pageBg}`}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className={`text-xs ${muted}`}>Relay experience</div>
            <h1 className={`mt-2 text-3xl font-semibold ${text}`}>{title}</h1>
            <div className={`mt-2 text-sm ${muted}`}>
              {template?.category ? `${template.category} • ` : ""}Theme: {theme.name}
            </div>
          </div>

          <div className={["rounded-2xl p-px", `bg-linear-to-r ${accent}`].join(" ")}>
            <div
              className={`rounded-2xl px-4 py-3 text-xs ${
                isMinimal ? "bg-white text-zinc-900" : "bg-[#070712] text-white"
              }`}
            >
              Free forever • Argena Tech Labs
            </div>
          </div>
        </div>

        <div className={`mt-8 rounded-[2.25rem] p-6 md:p-8 ${card}`}>
          <div className={`text-sm ${muted}`}>{greeting}</div>

          <div className={`mt-2 text-2xl font-semibold ${text}`}>{sender} sana bir mesaj gönderdi.</div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs ${chipClass}`}>Gönderen: {sender}</span>
            {ref ? (
              <span className={`rounded-full px-3 py-1 text-xs ${chipClass}`}>Zincir: {ref} → {sender}</span>
            ) : (
              <span className={`rounded-full px-3 py-1 text-xs ${chipClass}`}>Zincir: {sender}</span>
            )}
          </div>

          {!receiverName ? (
            <div className="mt-6 grid gap-2">
              <div className={`text-xs ${muted}`}>İsmini yaz (bu cihazda kalır):</div>
              <input
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className={`rounded-2xl px-4 py-3 text-sm outline-none ${inputClass}`}
                placeholder="Adın…"
              />
              <div className={`text-xs ${muted}`}>İpucu: Yazdıktan sonra mesaj daha kişisel görünecek.</div>
            </div>
          ) : null}

          {message ? (
            <div className={`mt-6 rounded-2xl px-4 py-3 text-sm leading-relaxed ${messageClass}`}>{message}</div>
          ) : null}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`/create?ref=${encodeURIComponent(sender)}`}
              className={[
                "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition",
                isMinimal ? "bg-zinc-900 text-white hover:bg-zinc-800" : "bg-white text-zinc-900 hover:bg-white/90"
              ].join(" ")}
            >
              Ben de bir deneyim oluştur →
            </a>

            <a
              href="/templates"
              className={[
                "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm transition",
                isMinimal
                  ? "border border-black/10 bg-white hover:bg-black/5"
                  : "border border-white/15 bg-white/5 hover:bg-white/10 text-white"
              ].join(" ")}
            >
              Kataloğa göz at
            </a>
          </div>
        </div>

        <div className="mt-6">
          <RunnerShareClient url={shareUrl} slug={slug} />
        </div>

        <div className={`mt-6 text-xs ${muted}`}>
          Relay ücretsiz bir ürün deneyidir. Reklam yok • Veri satışı yok • Minimum veri ilkesi.
        </div>
      </div>
    </main>
  );
}
