import { NextResponse } from "next/server";
import { readJSON, writeJSON, ensureArray } from "@/lib/store";
import { makeId } from "@/lib/ids";
import type { Submission } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });

    const { title, category, desc, variables } = body as {
      title?: string;
      category?: string;
      desc?: string;
      variables?: string[];
    };

    if (!title || !category || !desc) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const raw = await readJSON<any>("submissions.json");
    const subs: Submission[] = ensureArray<Submission>(raw);

    subs.push({
      id: makeId("s"),
      title,
      category,
      desc,
      variables: Array.isArray(variables) ? variables : [],
      createdAt: new Date().toISOString()
    });

    await writeJSON("submissions.json", subs);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "server_error", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
