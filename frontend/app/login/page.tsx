"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { API_BASE } from "@/lib/api";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useGovtMode } from "@/lib/govt-mode";
import { Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { isGovt } = useGovtMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const body = new URLSearchParams();
      body.set("username", email);
      body.set("password", password);

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail ?? "Unable to sign in");

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setBusy(false);
    }
  }

  const accent = isGovt ? "#0a5c9e" : "#22d3ee";
  const bg = isGovt ? "bg-[#f4f7fb]" : "bg-[#07111f]";

  return (
    <div className={`min-h-screen ${bg}`}>
      <Header publicSite />
      <main
        id="main-content"
        className="grid min-h-[80vh] place-items-center px-5 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div
            className={`rounded-3xl p-8 shadow-2xl ${
              isGovt
                ? "bg-white border border-gray-200 shadow-gray-200"
                : "glass shadow-black/50"
            }`}
          >
            {/* Logo / badge */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl ${
                  isGovt
                    ? "bg-[#0a5c9e] text-white"
                    : "bg-cyan-400/15 text-cyan-300"
                }`}
                aria-hidden="true"
              >
                <Lock size={20} />
              </div>
              <div>
                <div
                  className={`font-bold ${
                    isGovt ? "text-[#0d1b2a]" : "text-white"
                  }`}
                >
                  {isGovt ? "Officer Portal" : "CivicLens Core"}
                </div>
                <div
                  className={`text-xs ${
                    isGovt ? "text-gray-500" : "text-slate-500"
                  }`}
                >
                  {isGovt ? "Government of India" : "Part 1 Operations"}
                </div>
              </div>
            </div>

            <Link
              href="/"
              className={`text-sm transition hover:underline ${
                isGovt ? "text-[#0a5c9e]" : "text-cyan-300 hover:text-cyan-200"
              }`}
            >
              ← Back to home
            </Link>

            <h1
              className={`mt-5 text-3xl font-bold ${
                isGovt ? "text-[#0d1b2a]" : "text-white"
              }`}
            >
              Secure Sign In
            </h1>
            <p
              className={`mt-2 text-sm ${
                isGovt ? "text-gray-500" : "text-slate-500"
              }`}
            >
              {isGovt
                ? "Access the Government Operations Command Centre using authorised credentials."
                : "Access the Part 1 operations command center."}
            </p>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className={`mt-5 rounded-xl border p-3 text-sm ${
                  isGovt
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-red-400/20 bg-red-400/10 text-red-200"
                }`}
              >
                {error}
              </div>
            )}

            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-1 ${
                    isGovt ? "text-gray-700" : "text-slate-300"
                  }`}
                >
                  Email address{" "}
                  <span aria-hidden="true" className="text-red-400">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                  aria-required="true"
                  aria-describedby="email-hint"
                  placeholder="officer@example.gov.in"
                />
                <span id="email-hint" className="sr-only">
                  Enter your registered email address
                </span>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-1 ${
                    isGovt ? "text-gray-700" : "text-slate-300"
                  }`}
                >
                  Password{" "}
                  <span aria-hidden="true" className="text-red-400">
                    *
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    required
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field pr-10"
                    aria-required="true"
                    aria-describedby="pwd-hint"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${
                      isGovt ? "text-gray-400 hover:text-gray-700" : "text-slate-500 hover:text-slate-200"
                    }`}
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    aria-pressed={showPwd}
                  >
                    {showPwd ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <span id="pwd-hint" className="sr-only">
                  Enter your account password
                </span>
              </div>

              <button
                type="submit"
                disabled={busy}
                className={`w-full rounded-xl p-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isGovt
                    ? "bg-[#0a5c9e] text-white hover:bg-[#084d87]"
                    : "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-400/25"
                }`}
                aria-busy={busy}
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                      aria-hidden="true"
                    />
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div
              className={`mt-5 flex items-start gap-2 rounded-xl p-3 text-xs ${
                isGovt
                  ? "bg-blue-50 text-blue-800"
                  : "border border-white/5 bg-white/[.02] text-slate-600"
              }`}
            >
              <ShieldCheck size={13} className="shrink-0 mt-0.5" aria-hidden="true" />
              Authentication uses an HttpOnly cookie — credentials are never
              stored in localStorage.
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
