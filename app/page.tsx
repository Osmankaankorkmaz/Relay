import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-zinc-100 blur-3xl opacity-70" />
        <div className="absolute top-40 right-[-10rem] h-72 w-72 rounded-full bg-zinc-100 blur-3xl opacity-60" />
        <div className="absolute bottom-[-12rem] left-[-10rem] h-80 w-80 rounded-full bg-zinc-100 blur-3xl opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-semibold">
              R
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Relay</div>
              <div className="text-xs text-zinc-500">by Argena Tech Labs</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <span className="hover:text-zinc-900 cursor-default">Hakkımızda</span>
            <span className="hover:text-zinc-900 cursor-default">İletişim</span>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-14 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-zinc-700">
              <span className="font-medium">Relay</span>
              <span className="text-zinc-400">•</span>
              <span>Kurumsal vitrin ürünü</span>
            </div>

            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              Anlamlı anları profesyonel bir deneyime dönüştür.
            </h1>

            <p className="mt-4 text-lg text-zinc-700 leading-relaxed max-w-xl">
              Özel günler, etkinlikler ve zamansız mesajlar için tema bazlı,
              zincirleme dijital deneyimler. Paylaşımı kolaylaştırır, bağı güçlendirir.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {/* Şimdilik linkleri dummy bıraktım */}
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
              >
                Deneyim Oluştur
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-black/5 transition"
              >
                Neden ücretsiz?
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Ücretsiz • Satış yok
              </span>
              <span className="hidden sm:inline text-zinc-300">|</span>
              <span className="hidden sm:inline">Kişisel veriler satılmaz</span>
            </div>
          </div>

          {/* Preview Card */}
          <div className="rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Örnek Deneyim</div>
                <div className="text-xs text-zinc-500">Preview</div>
              </div>

              <div className="mt-5 rounded-2xl border border-black/10 bg-zinc-50 p-5">
                <div className="text-xs text-zinc-500">Tebrik • Minimal Dark</div>
                <div className="mt-2 text-xl font-semibold">Tebrikler, Osman!</div>
                <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                  Bu mesaj sana Bedirhan tarafından gönderildi. Yeni adımın hayırlı olsun —
                  bu yıl daha da büyü.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700">
                    Kimden geldi: Bedirhan
                  </span>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700">
                    Zincir: Devam et
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  { k: "1", t: "Etkinlik seç", d: "Bağlamı belirle." },
                  { k: "2", t: "Tema seç", d: "Kurumsal görünüm." },
                  { k: "3", t: "Paylaş", d: "Zincir büyüsün." }
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-black/10 p-4">
                    <div className="text-xs text-zinc-500">Adım {s.k}</div>
                    <div className="mt-1 text-sm font-medium">{s.t}</div>
                    <div className="mt-2 text-xs text-zinc-600">{s.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">1 dakikada hazır</div>
                  <div className="text-xs text-zinc-500">Etkinlik + tema + mesaj</div>
                </div>
                <Link
                  href="#"
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 transition"
                >
                  Başla
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 text-xs text-zinc-500">
          This experience is built by <span className="font-medium">Argena Tech Labs</span>. Personal data is not sold.
        </footer>
      </div>
    </main>
  );
}
