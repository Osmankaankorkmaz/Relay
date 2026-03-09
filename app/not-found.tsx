import Link from "next/link";
import { ArrowRight, Home, LayoutGrid, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-aurora min-h-[calc(100vh-80px)]">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="glass rounded-[2.25rem] p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-600">
                <Sparkles className="h-3.5 w-3.5" />
                Relay • by Argena Tech Labs
              </div>

              <div className="mt-5 text-6xl font-semibold tracking-tight leading-none">404</div>

              <h1 className="mt-3 text-2xl md:text-3xl font-semibold">Sayfa bulunamadı</h1>

              <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed max-w-xl">
                Link hatalı olabilir ya da sayfa taşınmış olabilir. Katalogdan devam edebilir
                veya ana sayfaya dönebilirsin.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
                >
                  <Home className="h-4 w-4" />
                  Ana sayfa
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 transition"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Templates
                </Link>

                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  Create
                </Link>
              </div>

              <div className="mt-8 text-xs text-zinc-500">
                Eğer bu sayfaya bir yerden yönlendirildiysen, linki gönderen kişiye yazıp
                doğru linki isteyebilirsin.
              </div>
            </div>

            <div className="w-full md:w-[20rem]">
              <div className="rounded-4xl border border-black/10 bg-white/80 backdrop-blur p-5 shadow-sm">
                <div className="text-sm font-semibold">Hızlı öneriler</div>
                <div className="mt-3 grid gap-3 text-sm">
                  <Link
                    href="/templates?cat=Holiday"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 hover:bg-black/5 transition"
                  >
                    🎉 Holiday templates
                  </Link>
                  <Link
                    href="/templates?cat=Work"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 hover:bg-black/5 transition"
                  >
                    💼 Work / Professional
                  </Link>
                  <Link
                    href="/templates?cat=Greetings"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 hover:bg-black/5 transition"
                  >
                    👋 Greetings / Selam
                  </Link>
                </div>

                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-xs text-zinc-500">İpucu</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    ⌘K ile arama açıp template/collection bulabilirsin.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-black/10 pt-6 text-xs text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>© {new Date().getFullYear()} Argena Tech Labs</span>
            <span>Relay • Free forever • Privacy-first</span>
          </div>
        </div>
      </div>
    </main>
  );
}
