import type { Template } from "@/lib/types";

export function validateVars(template: Template, vars: Record<string, string>) {
  for (const key of template.variables) {
    const v = (vars[key] ?? "").trim();
    if (!v) {
      return { ok: false as const, message: `Eksik alan: ${key}` };
    }
    if (v.length > 240) {
      return { ok: false as const, message: `Çok uzun alan: ${key}` };
    }
  }
  return { ok: true as const };
}

export function validateSubmission(input: {
  title: string;
  category: string;
  desc: string;
  variables: string[];
}) {
  if (!input.title.trim()) return { ok: false as const, message: "Başlık zorunlu." };
  if (!input.category.trim()) return { ok: false as const, message: "Kategori zorunlu." };
  if (!input.desc.trim()) return { ok: false as const, message: "Açıklama zorunlu." };
  if (!Array.isArray(input.variables) || input.variables.length === 0) {
    return { ok: false as const, message: "En az 1 variable olmalı." };
  }
  return { ok: true as const };
}
