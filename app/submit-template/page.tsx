import SubmitClient from "./ui";
import { readJSON } from "@/lib/store";
import type { Settings } from "@/lib/types";

export default async function SubmitTemplatePage() {
  const settings = await readJSON<Settings>("settings.json");
  if (!settings.flags.enableSubmissions) return null;

  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <SubmitClient />
      </div>
    </main>
  );
}
