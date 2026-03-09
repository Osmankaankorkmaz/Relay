import { NextResponse } from "next/server";
import { readJSON, writeJSON, ensureAnalyticsShape } from "@/lib/store";
import type { Analytics } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });

    const { type, slug } = body as {
      type: "view" | "use" | "share" | "exp_created" | "exp_opened";
      slug?: string;
    };

    const raw = await readJSON<any>("analytics.json");
    const a: Analytics = ensureAnalyticsShape(raw);

    if (type === "exp_created") a.experiences.created += 1;
    if (type === "exp_opened") a.experiences.opened += 1;

    if (slug) {
      a.templates[slug] ??= { views: 0, uses: 0, shares: 0 };
      if (type === "view") a.templates[slug].views += 1;
      if (type === "use") a.templates[slug].uses += 1;
      if (type === "share") a.templates[slug].shares += 1;
    }

    await writeJSON("analytics.json", a);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "server_error", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
