"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for observability — do not expose internals to UI
    console.error("[CivicLens] Application error:", error.digest ?? error.message);
  }, [error]);

  return (
    <main
      className="grid min-h-screen place-items-center bg-[#07111f] px-6 text-center text-slate-100"
      id="main-content"
      role="main"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-300"
          aria-hidden="true"
        >
          <AlertTriangle size={28} />
        </div>
        <div className="mt-5 text-sm font-semibold uppercase tracking-[.2em] text-red-300">
          System error
        </div>
        <h1 className="mt-3 text-4xl font-black">Something went wrong</h1>
        <p className="mt-3 max-w-md text-slate-500">
          The interface could not complete this operation. Try again; if it
          persists, use the request ID from the API response.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-slate-700">
            Digest: {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-bold text-white"
            aria-label="Retry the failed operation"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/5"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Go home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
