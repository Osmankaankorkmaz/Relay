import CreateClient from "./ui";
import { readJSON } from "@/lib/store";
import type { Settings, Template, ThemePreset } from "@/lib/types";

export default async function CreatePage({
  searchParams
}: {
  searchParams: { template?: string; ref?: string };
}) {
  const settings = await readJSON<Settings>("settings.json");
  const templates = await readJSON<Template[]>("templates.json");
  const themes = await readJSON<ThemePreset[]>("themes.json");

  const initialTemplateSlug = searchParams.template || settings.defaults.defaultTemplateSlug;
  const ref = searchParams.ref || "";

  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <CreateClient
          settings={settings}
          templates={templates}
          themes={themes}
          initialTemplateSlug={initialTemplateSlug}
          refParam={ref}
        />
      </div>
    </main>
  );
}
