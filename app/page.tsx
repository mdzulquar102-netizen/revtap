export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-900">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        {/* Blue glow */}
        <div className="absolute -top-40 left-1/2 h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[150px]" />

        {/* Violet glow */}
        <div className="absolute left-[-180px] top-[35%] h-[500px] w-[500px] rounded-full bg-violet-400/15 blur-[140px]" />

        {/* Cyan glow */}
        <div className="absolute bottom-[-180px] right-[-120px] h-[550px] w-[550px] rounded-full bg-cyan-400/15 blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-950"
        >
          REV<span className="text-blue-600">tap</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a
            href="#how-it-works"
            className="transition hover:text-blue-600"
          >
            How it works
          </a>

          <a
            href="#features"
            className="transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#demo"
            className="transition hover:text-blue-600"
          >
            Demo
          </a>
        </div>

        <a
          href="/admin"
          className="rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-blue-300 hover:bg-white hover:text-blue-600"
        >
          Business Login
        </a>
      </nav>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="grid w-full items-center gap-20 lg:grid-cols-2">
          {/* Hero text */}
          <div>
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
              Smart Review Solutions
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Turn happy customers into{" "}
              <span className="text-blue-600">better reviews.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              RevTap makes it ridiculously simple for customers to share
              their experience — with one tap or one scan.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#demo"
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/25"
              >
                Try the Demo
              </a>

              <a
                href="#how-it-works"
                className="rounded-xl border border-slate-200 bg-white/70 px-7 py-3.5 text-center font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:text-blue-600"
              >
                See How It Works
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span>✓ QR & NFC ready</span>
              <span>✓ Mobile first</span>
              <span>✓ Simple setup</span>
            </div>
          </div>

          {/* =====================================================
              PRODUCT PREVIEW
          ===================================================== */}
          <div
            id="demo"
            className="relative mx-auto w-full max-w-md"
          >
            {/* Glow behind phone */}
            <div className="absolute inset-0 rounded-[4rem] bg-blue-500/10 blur-3xl" />

            {/* Phone */}
            <div className="relative rounded-[2.8rem] border border-white/80 bg-white/60 p-3 shadow-[0_35px_100px_rgba(37,99,235,0.18)] backdrop-blur-2xl">
              <div className="rounded-[2.3rem] border border-slate-200 bg-white px-6 py-10 shadow-inner">
                {/* Phone speaker */}
                <div className="mx-auto mb-8 h-1.5 w-20 rounded-full bg-slate-200" />

                <div className="text-center">
                  {/* Icon */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 shadow-sm">
                    ★
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    How was your experience?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Your feedback helps us improve.
                  </p>

                  {/* Stars */}
                  <div className="mt-7 flex justify-center gap-2 text-3xl text-blue-500">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  {/* Review button */}
                  <button className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
                    Leave a Review
                  </button>

                  <p className="mt-5 text-xs text-slate-400">
                    Powered by RevTap
                  </p>
                </div>
              </div>
            </div>

            {/* Floating QR card */}
            <div className="absolute -bottom-8 -left-8 hidden rounded-2xl border border-white/80 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
                  <span className="rounded-sm bg-slate-900" />
                  <span className="rounded-sm bg-white" />
                  <span className="rounded-sm bg-slate-900" />
                  <span className="rounded-sm bg-white" />
                  <span className="rounded-sm bg-slate-900" />
                  <span className="rounded-sm bg-white" />
                  <span className="rounded-sm bg-slate-900" />
                  <span className="rounded-sm bg-white" />
                  <span className="rounded-sm bg-slate-900" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Scan to review
                  </p>

                  <p className="text-xs text-slate-500">
                    Powered by RevTap
                  </p>
                </div>
              </div>
            </div>

            {/* Floating NFC card */}
            <div className="absolute -right-8 top-16 hidden rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ))))
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Tap to review
                  </p>

                  <p className="text-xs text-slate-500">
                    NFC enabled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section
        id="how-it-works"
        className="relative z-10 border-t border-slate-200/70 bg-white/40 px-6 py-28 backdrop-blur-sm lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Simple by design
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              From customer experience to review in seconds.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              No complicated process. No long forms. Just a frictionless path
              from interaction to feedback.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Tap or Scan"
              description="Customers tap an NFC tag or scan your RevTap QR code."
            />

            <Step
              number="02"
              title="Rate the Experience"
              description="Give customers a simple and familiar way to share how they felt."
            />

            <Step
              number="03"
              title="Review & Grow"
              description="Make it easier for satisfied customers to leave genuine reviews."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section
        id="features"
        className="relative z-10 px-6 py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Built for businesses
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need to make feedback easier.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A simple review system designed around how customers actually
              behave.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon="⌁"
              title="QR + NFC"
              description="Give customers multiple frictionless ways to reach your review experience."
            />

            <Feature
              icon="↗"
              title="Review Growth"
              description="Reduce the effort required for customers to share genuine feedback."
            />

            <Feature
              icon="▦"
              title="Business Dashboard"
              description="Manage your business profile and review destinations from one place."
            />

            <Feature
              icon="◉"
              title="Fast Setup"
              description="Create your business profile and get your review system running quickly."
            />

            <Feature
              icon="◌"
              title="Mobile First"
              description="Designed around the device customers actually use — their phone."
            />

            <Feature
              icon="∞"
              title="Scalable"
              description="Built to grow from one local business to multiple locations."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative z-10 px-6 py-28 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-blue-200 bg-white/70 px-6 py-20 text-center shadow-[0_30px_100px_rgba(37,99,235,0.12)] backdrop-blur-xl sm:px-12">
          {/* CTA glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Ready to grow?
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Make every customer interaction count.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
              Give your customers a faster way to share their experience with
              RevTap.
            </p>

            <a
              href="/admin"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Get Started with RevTap
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/50 px-6 py-8 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <div className="font-bold text-slate-900">
            REV<span className="text-blue-600">tap</span>
          </div>

          <div>Tap. Review. Grow.</div>

          <div>© 2026 RevTap</div>
        </div>
      </footer>
    </main>
  );
}

/* ===============================================================
   STEP COMPONENT
=============================================================== */

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {number}
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

/* ===============================================================
   FEATURE COMPONENT
=============================================================== */

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/60 p-7 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-semibold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}