export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 overflow-hidden">

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">
          REV<span className="text-blue-600">tap</span>
        </div>

        <a
          href="/admin"
          className="rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-600 transition"
        >
          Business Login
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24">

        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-blue-600 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Smart Review & Ordering Solutions
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            REV<span className="text-blue-600">tap</span>
          </h1>

          <p className="text-3xl md:text-4xl font-semibold mt-6 text-slate-800">
            Tap. Review. Grow.
          </p>

          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-slate-500 leading-relaxed">
            One simple tap or scan connects your customers directly
            to your Google reviews, products and ordering experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

            <a
              href="/admin"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition"
            >
              Open Dashboard
            </a>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold shadow-sm hover:border-blue-300 hover:text-blue-600 transition"
            >
              How It Works
            </a>

          </div>
        </div>

        {/* Product preview */}
        <div
          id="how-it-works"
          className="mt-24 grid md:grid-cols-3 gap-6"
        >

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-6">
              📱
            </div>

            <h2 className="text-xl font-bold">
              1. Tap or Scan
            </h2>

            <p className="text-slate-500 mt-3 leading-relaxed">
              Customers tap the NFC tag or scan the QR code placed
              at your business.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-6">
              ⭐
            </div>

            <h2 className="text-xl font-bold">
              2. Review or Order
            </h2>

            <p className="text-slate-500 mt-3 leading-relaxed">
              Send customers directly to your Google review page
              or let them browse products and place an order.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-6">
              📈
            </div>

            <h2 className="text-xl font-bold">
              3. Grow
            </h2>

            <p className="text-slate-500 mt-3 leading-relaxed">
              Make it easier for customers to interact with your
              business and increase repeat orders and reviews.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-slate-900 text-white p-10 md:p-14 text-center shadow-2xl">

          <p className="text-blue-400 font-semibold">
            REVtap
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            One tap. Multiple possibilities.
          </h2>

          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Reviews, products and customer orders — all connected
            through one simple QR or NFC experience.
          </p>

          <a
            href="/admin"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 px-7 py-3.5 rounded-xl font-bold transition"
          >
            Manage RevTap
          </a>

        </div>

      </section>

      <footer className="relative z-10 border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} RevTap. Smart Review Solutions.
      </footer>

    </main>
  );
}