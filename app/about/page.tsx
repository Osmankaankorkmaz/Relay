export default function AboutPage() {
  return (
    <main className="bg-aurora">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="glass rounded-4xl p-6 md:p-10">
          <div className="text-xs text-zinc-500">Company</div>
          <h1 className="mt-2 text-3xl font-semibold">About Relay</h1>

          <p className="mt-4 text-sm md:text-base text-zinc-600 leading-relaxed">
            Relay, Argena Tech Labs’in “ürün standardında ücretsiz” yaklaşımını temsil eden bir vitrindir.
            Amaç: özel günlerden profesyonel akışlara kadar her bağlamda, paylaşılabilir mini deneyimler üretmek.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { t: "Free forever", d: "Ücretsiz kalır; ürün kalitesi yükselir." },
              { t: "Privacy-first", d: "Minimum veri, reklam yok, satış yok." },
              { t: "System design", d: "Template + Theme + Builder + Share motoru." }
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-zinc-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
