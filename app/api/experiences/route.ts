import { NextResponse } from "next/server";
import { readJSON, writeJSON, ensureArray } from "@/lib/store";
import { makeId } from "@/lib/ids";
import type { Experience } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });

    const { templateSlug, theme, vars, ref } = body as {
      templateSlug?: string;
      theme?: string;
      vars?: Record<string, string>;
      ref?: string;
    };

    if (!templateSlug || !theme || !vars || typeof vars !== "object") {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const raw = await readJSON<any>("experiences.json");
    const exps: Experience[] = ensureArray<Experience>(raw);

    const id = makeId("x");

    const exp: Experience = {
      id,
      templateSlug,
      theme,
      vars,
      ref,
      createdAt: new Date().toISOString()
    };

    exps.push(exp);

    await writeJSON("experiences.json", exps);
    return NextResponse.json({ ok: true, id });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "server_error", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
