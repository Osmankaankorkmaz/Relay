import type { Analytics, Collection, Settings, Template, ThemePreset } from "@/lib/types";
import { readJSONSafe } from "@/lib/store";
import HomePageClient from "@/components/HomePageClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const settings = await readJSONSafe<Settings>("settings.json", {
    brand: { productName: "Relay", byline: "" },
    defaults: { defaultTheme: "minimal", defaultTemplateSlug: "yeni-yil-snow", defaultSenderName: "Someone" },
    flags: {
      enableTrending: true,
      enableCollections: true,
      enableCommandPalette: true,
      enableChangelog: true,
      enableSubmissions: true
    }
  });

  const templates = await readJSONSafe<Template[]>("templates.json", []);
  const collections = await readJSONSafe<Collection[]>("collections.json", []);
  const themes = await readJSONSafe<ThemePreset[]>("themes.json", []);
  const analytics = await readJSONSafe<Analytics>("analytics.json", {
    templates: {},
    experiences: { created: 0, opened: 0 }
  });

  return (
    <HomePageClient
      settings={settings}
      templates={templates}
      collections={collections}
      themes={themes}
      analytics={analytics}
    />
  );
}
