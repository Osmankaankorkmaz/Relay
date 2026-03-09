import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import { readJSON } from "@/lib/store";
import type { Collection, Template, Settings } from "@/lib/types";

export const metadata = {
  title: "Relay — by Argena Tech Labs",
  description: "Templates + Themes + Builder + Share. Free forever micro-experiences platform."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await readJSON<Settings>("settings.json");
  const templates = await readJSON<Template[]>("templates.json");
  const collections = await readJSON<Collection[]>("collections.json");

  return (
    <html lang="tr">
      <body className="min-h-screen bg-white text-zinc-900">
        <Navbar />
        {settings.flags.enableCommandPalette ? (
          <CommandPalette templates={templates} collections={collections} />
        ) : null}
        {children}
        <Footer />
      </body>
    </html>
  );
}
