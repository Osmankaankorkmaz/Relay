import fs from "fs/promises";
import path from "path";
import type { Analytics } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

function filePath(name: string) {
  return path.join(DATA_DIR, name);
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJSON<T>(name: string): Promise<T> {
  await ensureDataDir();
  const p = filePath(name);
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw) as T;
}

export async function readJSONSafe<T>(name: string, fallback: T): Promise<T> {
  try {
    return await readJSON<T>(name);
  } catch {
    return fallback;
  }
}

export async function writeJSON(name: string, data: any) {
  await ensureDataDir();
  const p = filePath(name);
  const tmp = p + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, p);
}

export function ensureArray<T>(raw: any): T[] {
  return Array.isArray(raw) ? (raw as T[]) : [];
}

export function ensureAnalyticsShape(raw: any): Analytics {
  const base: Analytics = {
    templates: {},
    experiences: { created: 0, opened: 0 }
  };

  if (!raw || typeof raw !== "object") return base;

  const templates = raw.templates && typeof raw.templates === "object" ? raw.templates : {};
  const experiences = raw.experiences && typeof raw.experiences === "object" ? raw.experiences : {};

  base.templates = templates;
  base.experiences.created = typeof experiences.created === "number" ? experiences.created : 0;
  base.experiences.opened = typeof experiences.opened === "number" ? experiences.opened : 0;

  for (const k of Object.keys(base.templates)) {
    const row = base.templates[k] ?? {};
    base.templates[k] = {
      views: typeof row.views === "number" ? row.views : 0,
      uses: typeof row.uses === "number" ? row.uses : 0,
      shares: typeof row.shares === "number" ? row.shares : 0
    };
  }

  return base;
}
