"use client";

import { useGovtMode } from "@/lib/govt-mode";
import { motion } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";

export function GovtModeToggle() {
  const { isGovt, toggle } = useGovtMode();

  return (
    <button
      onClick={toggle}
      title={
        isGovt
          ? "Switch to Modern View"
          : "Switch to Government Style View"
      }
      aria-pressed={isGovt}
      aria-label={
        isGovt
          ? "Switch to Modern View"
          : "Switch to Government Style View"
      }
      className={`relative flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 ${
        isGovt
          ? "border-[#0a5c9e]/30 bg-[#0a5c9e]/10 text-[#0a5c9e] hover:bg-[#0a5c9e]/20 focus-visible:ring-[#0a5c9e]/50"
          : "border-amber-400/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 focus-visible:ring-amber-400/50"
      }`}
    >
      <motion.span
        key={isGovt ? "govt" : "modern"}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18 }}
        aria-hidden="true"
      >
        {isGovt ? <Sparkles size={13} /> : <Building2 size={13} />}
      </motion.span>
      <span className="hidden sm:inline">
        {isGovt ? "Modern View" : "Govt View"}
      </span>
    </button>
  );
}
