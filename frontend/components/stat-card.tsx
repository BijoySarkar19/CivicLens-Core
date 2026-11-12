"use client";

import { motion } from "framer-motion";
import { useGovtMode } from "@/lib/govt-mode";

interface StatCardProps {
  label: string;
  value: number | string;
  hint: string;
  index: number;
  variant?: "default" | "warning" | "danger" | "success";
}

export function StatCard({
  label,
  value,
  hint,
  index,
  variant = "default",
}: StatCardProps) {
  const { isGovt } = useGovtMode();

  const variantStyles = {
    default: isGovt
      ? "border-gray-200 bg-white"
      : "border-white/8 bg-white/[.03]",
    warning: isGovt
      ? "border-amber-200 bg-amber-50"
      : "border-amber-400/15 bg-amber-400/5",
    danger: isGovt
      ? "border-red-200 bg-red-50"
      : "border-red-400/15 bg-red-400/5",
    success: isGovt
      ? "border-green-200 bg-green-50"
      : "border-emerald-400/15 bg-emerald-400/5",
  };

  const valueStyles = {
    default: isGovt ? "text-[#0a5c9e]" : "text-cyan-300",
    warning: isGovt ? "text-amber-700" : "text-amber-300",
    danger: isGovt ? "text-red-700" : "text-red-300",
    success: isGovt ? "text-green-700" : "text-emerald-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.5 }}
      className={`rounded-2xl border p-5 transition ${variantStyles[variant]}`}
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-wider ${
          isGovt ? "text-gray-500" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-2 text-3xl font-black tabular-nums ${valueStyles[variant]}`}
        aria-live="polite"
      >
        {value}
      </p>
      <p
        className={`mt-1 text-xs ${isGovt ? "text-gray-400" : "text-slate-600"}`}
      >
        {hint}
      </p>
    </motion.div>
  );
}
