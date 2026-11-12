"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, Search, Filter, MapPin, TrendingUp } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Asset } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

const CONDITION_STYLES: Record<string, string> = {
  good: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  fair: "text-yellow-300 border-yellow-400/30 bg-yellow-400/10",
  poor: "text-orange-300 border-orange-400/30 bg-orange-400/10",
  critical: "text-red-300 border-red-400/30 bg-red-400/10",
  unknown: "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

const CONDITION_STYLES_GOVT: Record<string, string> = {
  good: "text-green-800 border-green-200 bg-green-50",
  fair: "text-yellow-800 border-yellow-200 bg-yellow-50",
  poor: "text-orange-800 border-orange-200 bg-orange-50",
  critical: "text-red-800 border-red-200 bg-red-50",
  unknown: "text-gray-600 border-gray-200 bg-gray-50",
};

export default function AssetsPage() {
  const [rows, setRows] = useState<Asset[]>([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [error, setError] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: Asset[] }>("/assets/?limit=200")
      .then((data) => setRows(data.items))
      .catch((e) => setError(e.message));
  }, []);

  const types = ["all", ...Array.from(new Set(rows.map((r) => r.asset_type)))];
  const conditions = ["all", "good", "fair", "poor", "critical", "unknown"];

  const filtered = rows.filter((x) => {
    const matchSearch = `${x.asset_code} ${x.name} ${x.asset_type} ${x.district ?? ""}`.toLowerCase().includes(query.toLowerCase());
    const matchType = typeFilter === "all" || x.asset_type === typeFilter;
    const matchCond = conditionFilter === "all" || x.condition === conditionFilter;
    return matchSearch && matchType && matchCond;
  });

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-500";
  const cardBg = isGovt ? "border-gray-200 bg-white" : "glass border-white/8";
  const inputBg = isGovt ? "border-gray-200 bg-white" : "border-white/10 bg-white/[.03]";
  const condStyles = isGovt ? CONDITION_STYLES_GOVT : CONDITION_STYLES;

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        aria-label="Infrastructure asset registry"
      >
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <div>
            <div className={`flex items-center gap-2 text-sm font-medium ${accent}`}>
              <Boxes size={18} aria-hidden="true" />
              Infrastructure Registry
            </div>
            <h1 className={`mt-2 text-4xl font-black ${headingColor}`}>
              Assets
            </h1>
            <p className={`mt-2 text-sm ${muteColor}`}>
              Real infrastructure records with provenance tracking — not
              dashboard placeholders.
            </p>
          </div>

          <div className={`flex flex-wrap gap-3 md:ml-auto text-sm ${muteColor}`}>
            <span className="flex items-center gap-1.5">
              <TrendingUp size={13} aria-hidden="true" />
              Total: <strong className={accent}>{rows.length}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              Shown: <strong className={accent}>{filtered.length}</strong>
            </span>
          </div>
        </div>

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

        {/* Filters bar */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <label
            className={`flex flex-1 min-w-[220px] items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${inputBg}`}
            aria-label="Search assets"
          >
            <Search size={15} className={muteColor} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, code or district…"
              className={`w-full bg-transparent outline-none ${
                isGovt ? "text-gray-800 placeholder-gray-400" : "text-slate-100 placeholder-slate-600"
              }`}
              aria-label="Search assets"
            />
          </label>

          <label className="sr-only" htmlFor="type-filter">Filter by type</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
              isGovt ? "border-gray-200 bg-white text-gray-700" : "border-white/10 bg-[#07111f] text-slate-300"
            }`}
            aria-label="Filter by asset type"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All types" : t}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="condition-filter">Filter by condition</label>
          <select
            id="condition-filter"
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
              isGovt ? "border-gray-200 bg-white text-gray-700" : "border-white/10 bg-[#07111f] text-slate-300"
            }`}
            aria-label="Filter by condition"
          >
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All conditions" : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div
            className={`flex rounded-xl border p-1 ${inputBg}`}
            role="group"
            aria-label="Choose display view"
          >
            <button
              onClick={() => setView("table")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                view === "table"
                  ? isGovt
                    ? "bg-[#0a5c9e] text-white"
                    : "bg-white/10 text-white"
                  : muteColor
              }`}
              aria-pressed={view === "table"}
              aria-label="Table view"
            >
              Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                view === "grid"
                  ? isGovt
                    ? "bg-[#0a5c9e] text-white"
                    : "bg-white/10 text-white"
                  : muteColor
              }`}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
            >
              Grid
            </button>
          </div>
        </div>

        {/* Table view */}
        {view === "table" && (
          <div
            className={`mt-6 overflow-hidden rounded-2xl border ${cardBg}`}
          >
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-[760px] text-left text-sm"
                role="table"
                aria-label="Assets table"
              >
                <thead>
                  <tr
                    className={
                      isGovt
                        ? "bg-gray-50 text-gray-500 text-xs uppercase tracking-wider"
                        : "bg-white/[.04] text-xs uppercase tracking-wider text-slate-500"
                    }
                  >
                    <th className="px-5 py-4" scope="col">Asset</th>
                    <th className="px-4 py-4" scope="col">Type</th>
                    <th className="px-4 py-4" scope="col">District</th>
                    <th className="px-4 py-4" scope="col">Condition</th>
                    <th className="px-4 py-4" scope="col">Status</th>
                    <th className="px-4 py-4" scope="col">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((x) => (
                    <tr
                      key={x.id}
                      className={`border-t ${
                        isGovt
                          ? "border-gray-100 hover:bg-gray-50"
                          : "border-white/5 hover:bg-white/[.02]"
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className={`font-semibold ${headingColor}`}>
                          {x.name}
                        </div>
                        <div className={`mt-0.5 font-mono text-xs ${muteColor}`}>
                          {x.asset_code}
                        </div>
                      </td>
                      <td className={`px-4 py-4 text-sm ${muteColor}`}>
                        {x.asset_type}
                      </td>
                      <td className={`px-4 py-4 text-sm ${muteColor}`}>
                        {x.district ? (
                          <span className="flex items-center gap-1">
                            <MapPin size={11} aria-hidden="true" />
                            {x.district}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`badge text-xs ${
                            condStyles[x.condition] ??
                            (isGovt
                              ? "text-gray-600 border-gray-200 bg-gray-50"
                              : "text-slate-300")
                          }`}
                        >
                          {x.condition}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`badge text-xs ${isGovt ? "border-gray-200 bg-gray-50 text-gray-600" : ""}`}>
                          {x.status}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-xs ${muteColor}`}>
                        {x.source_name ?? "Operational entry"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!filtered.length && (
              <div className={`p-12 text-center text-sm ${muteColor}`}>
                No assets match the current filters.
              </div>
            )}
          </div>
        )}

        {/* Grid view */}
        {view === "grid" && (
          <div
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label={`${filtered.length} assets`}
          >
            {filtered.map((x, i) => (
              <motion.div
                key={x.id}
                role="listitem"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`rounded-2xl border p-5 ${cardBg}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`font-mono text-xs ${muteColor}`}>
                      {x.asset_code}
                    </div>
                    <h3 className={`mt-1 font-semibold ${headingColor}`}>
                      {x.name}
                    </h3>
                  </div>
                  <span
                    className={`badge text-xs ${
                      condStyles[x.condition] ??
                      (isGovt
                        ? "text-gray-600 border-gray-200"
                        : "text-slate-300")
                    }`}
                  >
                    {x.condition}
                  </span>
                </div>
                <div className={`mt-3 flex flex-wrap gap-2 text-xs ${muteColor}`}>
                  <span className="flex items-center gap-1">
                    <Boxes size={11} aria-hidden="true" /> {x.asset_type}
                  </span>
                  {x.district && (
                    <span className="flex items-center gap-1">
                      <MapPin size={11} aria-hidden="true" /> {x.district}
                    </span>
                  )}
                </div>
                <div className={`mt-3 text-xs ${muteColor}`}>
                  {x.source_name ?? "Operational entry"}
                </div>
              </motion.div>
            ))}
            {!filtered.length && (
              <div
                className={`col-span-full rounded-2xl border border-dashed p-16 text-center ${
                  isGovt ? "border-gray-300 text-gray-400" : "border-white/10 text-slate-500"
                }`}
              >
                No assets match the current filters.
              </div>
            )}
          </div>
        )}
      </section>
    </PageShell>
  );
}
