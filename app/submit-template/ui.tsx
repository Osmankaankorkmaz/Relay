"use client";

import { useState } from "react";
import { validateSubmission } from "@/lib/validators";

async function postJSON(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json().catch(() => ({}));
}

export default function SubmitClient() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [variables, setVariables] = useState("senderName, receiverName, message");
  const [done, setDone] = useState(false);

  async function submit() {
    const vars = variables.split(",").map((x) => x.trim()).filter(Boolean);
    const vr = validateSubmission({ title, category, desc, variables: vars });
    if (!vr.ok) return alert(vr.message);

    const res = await postJSON("/api/submissions", { title, category, desc, variables: vars });
    if (!res?.ok) return alert("Kaydedilemedi.");
    setDone(true);
  }

  return (
    <div className="glass rounded-4xl p-6 md:p-8">
      <div className="text-xs text-zinc-500">Community</div>
      <div className="mt-2 text-2xl font-semibold">Submit a template</div>
      <div className="mt-2 text-sm text-zinc-600">
        Yeni bir template fikri öner. JSON DB’ye kayıt atılır (submissions.json).
      </div>

      {done ? (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
          <div className="font-semibold">Teşekkürler!</div>
          <div className="mt-1 text-sm text-zinc-600">Önerin kaydedildi.</div>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-zinc-500">Title</span>
            <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-zinc-500">Category</span>
            <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Holiday / Work / Invite ..." />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-zinc-500">Description</span>
            <textarea className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm min-h-30" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-zinc-500">Variables (comma separated)</span>
            <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" value={variables} onChange={(e) => setVariables(e.target.value)} />
          </label>

          <button onClick={submit} className="mt-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition" type="button">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
