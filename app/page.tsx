export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <div className="inline-block rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400 mb-6">
          Smart Review Solutions
        </div>

        <h1 className="text-6xl font-bold tracking-tight mb-4">
          REV<span className="text-blue-500">tap</span>
        </h1>

        <p className="text-2xl text-slate-300 mb-4">
          Tap. Review. Grow.
        </p>

        <p className="text-slate-400 max-w-lg mx-auto">
          Make it easier for your customers to leave genuine reviews
          with one simple tap or scan.
        </p>
      </div>
    </main>
  );
}