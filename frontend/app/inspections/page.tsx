"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Clock, User } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

type Inspection = {
  id: number;
  asset_id: number;
  inspector_email: string;
  condition: string;
  notes?: string | null;
  status: string;
  created_at: string;
};

const CONDITION_STYLES: Record<string, string> = {
  good: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  fair: "text-yellow-300 border-yellow-400/30 bg-yellow-400/10",
  poor: "text-orange-300 border-orange-400/30 bg-orange-400/10",
  critical: "text-red-300 border-red-400/30 bg-red-400/10",
};

const CONDITION_STYLES_GOVT: Record<string, string> = {
  good: "text-green-800 border-green-200 bg-green-50",
  fair: "text-yellow-800 border-yellow-200 bg-yellow-50",
  poor: "text-orange-800 border-orange-200 bg-orange-50",
  critical: "text-red-800 border-red-200 bg-red-50",
};

export default function InspectionsPage() {
  const [rows, setRows] = useState<Inspection[]>([]);
  const [error, setError] = useState("");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: Inspection[] }>("/inspections/")
      .then((x) => setRows(x.items))
      .catch((e) => setError(e.message));
  }, []);

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-500";
  const cardBg = isGovt ? "border-gray-200 bg-white" : "glass border-white/8";
  const condStyles = isGovt ? CONDITION_STYLES_GOVT : CONDITION_STYLES;

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        aria-label="Field inspections"
      >
        <div className="flex items-center gap-3">
          <ClipboardCheck
            className={accent}
            size={22}
            aria-hidden="true"
          />
          <div>
            <p className={`text-xs uppercase tracking-[.2em] ${muteColor}`}>
              Field Operations
            </p>
            <h1 className={`text-4xl font-black ${headingColor}`}>
              Inspections
            </h1>
          </div>
        </div>
        <p className={`mt-3 text-sm ${muteColor}`}>
          Inspection reports generate domain events and update asset condition
          with a full audit trail.
        </p>

        {error && (
          <div
            role="alert"
            className={`mt-6 rounded-xl border p-4 text-sm ${
              isGovt
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-red-400/20 bg-red-400/10 text-red-200"
            }`}
          >
            {error}
          </div>
        )}

        <div
          className={`mt-8 overflow-hidden rounded-2xl border ${cardBg}`}
        >
          <div className="overflow-x-auto">
            <table
              className="w-full text-left text-sm"
              role="table"
              aria-label="Inspections table"
            >
              <thead>
                <tr
                  className={
                    isGovt
                      ? "bg-gray-50 text-gray-500 text-xs uppercase tracking-wider"
                      : "bg-white/[.04] text-xs uppercase tracking-wider text-slate-500"
                  }
                >
                  <th className="px-5 py-4" scope="col">Asset ID</th>
                  <th className="px-4 py-4" scope="col">Inspector</th>
                  <th className="px-4 py-4" scope="col">Condition</th>
                  <th className="px-4 py-4" scope="col">Notes</th>
                  <th className="px-4 py-4" scope="col">Status</th>
                  <th className="px-4 py-4" scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((x, i) => (
                  <motion.tr
                    key={x.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-t ${
                      isGovt
                        ? "border-gray-100 hover:bg-gray-50"
                        : "border-white/5 hover:bg-white/[.02]"
                    }`}
                  >
                    <td className={`px-5 py-4 font-mono text-sm ${headingColor}`}>
                      #{x.asset_id}
                    </td>
                    <td className={`px-4 py-4 text-sm`}>
                      <span className="flex items-center gap-1.5">
                        <User size={12} className={muteColor} aria-hidden="true" />
                        {x.inspector_email}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`badge text-xs ${
                          condStyles[x.condition] ??
                          `${muteColor} border-current`
                        }`}
                      >
                        {x.condition}
                      </span>
                    </td>
                    <td className={`px-4 py-4 text-sm max-w-[200px] ${muteColor}`}>
                      <span className="line-clamp-2">{x.notes ?? "—"}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`badge text-xs ${
                          isGovt
                            ? "border-blue-200 bg-blue-50 text-blue-800"
                            : "border-cyan-400/20 bg-cyan-400/5 text-cyan-200"
                        }`}
                      >
                        {x.status}
                      </span>
                    </td>
                    <td className={`px-4 py-4 text-xs ${muteColor}`}>
                      <span className="flex items-center gap-1">
                        <Clock size={11} aria-hidden="true" />
                        {new Date(x.created_at).toLocaleDateString("en-IN", {
                          dateStyle: "medium",
                        })}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {!rows.length && !error && (
            <div className={`p-12 text-center text-sm ${muteColor}`}>
              <ClipboardCheck size={28} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
              No inspections recorded yet.
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
