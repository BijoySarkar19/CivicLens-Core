"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, MapPin, AlertCircle, Search, ShieldCheck } from "lucide-react";
import { useGovtMode } from "@/lib/govt-mode";

export default function NotFound() {
  const { isGovt } = useGovtMode();

  return (
    <main
      className={`relative grid min-h-screen place-items-center overflow-hidden px-4 py-12 text-center sm:px-6 lg:px-8 transition-colors ${
        isGovt ? "bg-[#f4f7fb] text-[#0d1b2a]" : "bg-[#07111f] text-slate-100"
      }`}
      id="main-content"
      role="main"
      aria-label="404 Page Not Found"
    >
      {/* Decorative Tricolour for Govt Mode */}
      {isGovt && (
        <div
          className="govt-stripe absolute top-0 left-0 w-full"
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Modern ambient animated background blobs */}
      {!isGovt && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-blob w-80 h-80 sm:w-96 sm:h-96 bg-cyan-400/10 left-[-50px] top-[10%]" />
          <div className="hero-blob w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 right-[-40px] bottom-[15%]" style={{ animationDelay: "3s" }} />
          <div className="hero-blob w-64 h-64 bg-purple-500/10 left-[45%] bottom-[-50px]" style={{ animationDelay: "6s" }} />
          <div className="grid-bg absolute inset-0 opacity-40" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-xl">
        {/* Animated Icon badge */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className={`mx-auto grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-3xl shadow-xl ${
            isGovt
              ? "border border-blue-200 bg-white text-[#0a5c9e] shadow-blue-900/10"
              : "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-cyan-500/10"
          }`}
          aria-hidden="true"
        >
          {isGovt ? <ShieldCheck size={42} /> : <AlertCircle size={44} />}
        </motion.div>

        {/* 404 Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`mt-6 text-7xl font-black tracking-tighter sm:text-8xl md:text-9xl ${
            isGovt ? "text-[#0a5c9e]" : "bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          }`}
          aria-label="Error code 404"
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl ${
            isGovt ? "text-[#0d1b2a]" : "text-white"
          }`}
        >
          {isGovt ? "पृष्ठ नहीं मिला · Page Not Found" : "Infrastructure Record Not Found"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className={`mx-auto mt-4 max-w-md text-sm leading-6 sm:text-base ${
            isGovt ? "text-gray-600" : "text-slate-400"
          }`}
        >
          {isGovt
            ? "यह वेब पृष्ठ या संसाधन उपलब्ध नहीं है। कृपया यूआरएल की जाँच करें या मुख्य पृष्ठ पर वापस जाएँ।"
            : "The requested coordinate, asset route or operational entity does not exist or has been relocated within the municipal boundary."}
        </motion.p>

        {/* Navigation Action Buttons (Mobile, Tablet, Desktop, TV friendly touch targets) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg transition active:scale-95 ${
              isGovt
                ? "bg-[#0a5c9e] text-white hover:bg-[#084d87] shadow-blue-900/20"
                : "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:shadow-cyan-400/25"
            }`}
          >
            <Home size={18} aria-hidden="true" />
            {isGovt ? "मुख्य पृष्ठ (Home)" : "Return Home"}
          </Link>

          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm sm:text-base font-semibold transition active:scale-95 ${
              isGovt
                ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                : "border-white/15 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            <Search size={18} aria-hidden="true" />
            Command Center
          </Link>

          <Link
            href="/report"
            className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm sm:text-base font-semibold transition active:scale-95 ${
              isGovt
                ? "border-blue-300 bg-blue-50 text-[#0a5c9e] hover:bg-blue-100"
                : "border-cyan-300/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20"
            }`}
          >
            <MapPin size={18} aria-hidden="true" />
            File Grievance
          </Link>
        </motion.div>

        {/* Helpful status notice */}
        <div
          className={`mt-10 rounded-2xl border p-4 text-xs ${
            isGovt
              ? "border-gray-200 bg-white text-gray-500"
              : "border-white/5 bg-white/[.02] text-slate-500"
          }`}
        >
          CivicLens AI Platform · Smart Urban Infrastructure Operations &amp; Spatial Intelligence · Ref: 404-BOUNDARY-CHECK
        </div>
      </div>
    </main>
  );
}
