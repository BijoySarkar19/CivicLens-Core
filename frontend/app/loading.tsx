export default function Loading() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-[#07111f]"
      aria-label="Loading CivicLens"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <span
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
            aria-hidden="true"
          />
          <span
            className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin"
            aria-hidden="true"
          />
        </div>
        <div className="text-sm text-slate-500" aria-live="polite">
          Loading CivicLens…
        </div>
      </div>
    </main>
  );
}
