"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Boxes, Search, MapPin, TrendingUp, Layers } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Asset, TRIPURA_SEED_ASSETS } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

const TRIPURA_DISTRICTS = [
  "All Districts",
  "West Tripura",
  "Sepahijala",
  "Khowai",
  "Gomati",
  "South Tripura",
  "Dhalai",
  "Unakoti",
  "North Tripura",
];

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
  const [rows, setRows] = useState<Asset[]>(TRIPURA_SEED_ASSETS);
  const [query, setQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [view, setView] = useState<"table" | "grid">("table");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: Asset[] }>("/assets/?limit=200")
      .then((data) => {
        if (data.items && data.items.length > 0) {
          // If backend has items, prefer them or merge
          setRows(data.items);
        }
      })
      .catch(() => {
        // Fallback to Tripura assets seed seamlessly
        setRows(TRIPURA_SEED_ASSETS);
      });
  }, []);

  const filtered = rows.filter((x) => {
    const matchSearch = `${x.asset_code} ${x.name} ${x.asset_type} ${x.district ?? ""} ${x.city ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchDistrict =
      districtFilter === "All Districts" || x.district === districtFilter;
    const matchCond =
      conditionFilter === "all" || x.condition === conditionFilter;
    return matchSearch && matchDistrict && matchCond;
  });

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-400";
  const cardBg = isGovt ? "border-gray-200 bg-white" : "glass border-white/8";
  const inputBg = isGovt ? "border-gray-200 bg-white" : "border-white/10 bg-white/[.03]";
  const condStyles = isGovt ? CONDITION_STYLES_GOVT : CONDITION_STYLES;

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        aria-label="Tripura Infrastructure asset registry"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
          <div>
            <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider ${accent}`}>
              <Boxes size={18} aria-hidden="true" />
              Tripura Public Infrastructure Registry (8 Districts)
            </div>
            <h1 className={`mt-2 text-3xl sm:text-4xl font-black ${headingColor}`}>
              Tripura Assets
            </h1>
            <p className={`mt-1 text-sm ${muteColor}`}>
              Verified municipal assets across Agartala, Udaipur, Dharmanagar, Kailashahar, Belonia, Khowai, Ambassa &amp; Melaghar.
            </p>
          </div>

          <div className={`flex flex-wrap gap-2 text-xs sm:text-sm ${muteColor}`}>
            <span className="flex items-center gap-1.5 rounded-xl border px-3 py-1.5 bg-white/5 border-white/10">
              <TrendingUp size={13} aria-hidden="true" />
              Tripura Assets: <strong className={accent}>{rows.length}</strong>
            </span>
            <span className="flex items-center gap-1.5 rounded-xl border px-3 py-1.5 bg-white/5 border-white/10">
              Showing: <strong className={accent}>{filtered.length}</strong>
            </span>
          </div>
        </div>

        {/* Filters bar */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <label
            className={`flex flex-1 min-w-[200px] items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${inputBg}`}
            aria-label="Search Tripura assets"
          >
            <Search size={15} className={muteColor} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, code, district or city (e.g. Agartala, Udaipur)…"
              className={`w-full bg-transparent outline-none ${
                isGovt ? "text-gray-800 placeholder-gray-400" : "text-slate-100 placeholder-slate-500"
              }`}
              aria-label="Search Tripura assets"
            />
          </label>

          {/* District filter */}
          <label className="sr-only" htmlFor="district-filter">Filter by Tripura district</label>
          <select
            id="district-filter"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
              isGovt ? "border-gray-200 bg-white text-gray-700" : "border-white/10 bg-[#07111f] text-slate-200"
            }`}
            aria-label="Filter by district"
          >
            {TRIPURA_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Condition filter */}
          <label className="sr-only" htmlFor="condition-filter">Filter by condition</label>
          <select
            id="condition-filter"
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
              isGovt ? "border-gray-200 bg-white text-gray-700" : "border-white/10 bg-[#07111f] text-slate-200"
            }`}
            aria-label="Filter by condition"
          >
            <option value="all">All Conditions</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="critical">Critical</option>
          </select>

          {/* View toggle */}
          <div
            className={`flex rounded-xl border p-1 ${inputBg}`}
            role="group"
            aria-label="Choose display view"
          >
            <button
              onClick={() => setView("table")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                view === "table"
                  ? isGovt
                    ? "bg-[#0a5c9e] text-white"
                    : "bg-white/15 text-white"
                  : muteColor
              }`}
              aria-pressed={view === "table"}
            >
              Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                view === "grid"
                  ? isGovt
                    ? "bg-[#0a5c9e] text-white"
                    : "bg-white/15 text-white"
                  : muteColor
              }`}
              aria-pressed={view === "grid"}
            >
              Grid
            </button>
          </div>
        </div>

        {/* Table view */}
        {view === "table" && (
          <div className={`mt-6 overflow-hidden rounded-2xl border ${cardBg}`}>
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-[760px] text-left text-sm"
                role="table"
                aria-label="Tripura assets table"
              >
                <thead>
                  <tr
                    className={
                      isGovt
                        ? "bg-gray-50 text-gray-500 text-xs uppercase tracking-wider"
                        : "bg-white/[.04] text-xs uppercase tracking-wider text-slate-400"
                    }
                  >
                    <th className="px-5 py-4" scope="col">Asset Name &amp; Code</th>
                    <th className="px-4 py-4" scope="col">Utility Type</th>
                    <th className="px-4 py-4" scope="col">Tripura District</th>
                    <th className="px-4 py-4" scope="col">City / Locality</th>
                    <th className="px-4 py-4" scope="col">Condition</th>
                    <th className="px-4 py-4" scope="col">Coordinates</th>
                    <th className="px-4 py-4" scope="col">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((x) => (
                    <tr
                      key={x.id}
                      className={`border-t transition ${
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
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>
                          <MapPin size={12} aria-hidden="true" />
                          {x.district}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-sm ${muteColor}`}>
                        {x.city ?? "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`badge text-xs uppercase font-bold ${
                            condStyles[x.condition] ?? "text-slate-300"
                          }`}
                        >
                          {x.condition}
                        </span>
                      </td>
                      <td className={`px-4 py-4 font-mono text-xs ${muteColor}`}>
                        {x.latitude && x.longitude
                          ? `${x.latitude.toFixed(4)}, ${x.longitude.toFixed(4)}`
                          : "—"}
                      </td>
                      <td className={`px-4 py-4 text-xs ${muteColor}`}>
                        {x.source_name ?? "Tripura PWD"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!filtered.length && (
              <div className={`p-12 text-center text-sm ${muteColor}`}>
                No Tripura assets match the selected filter criteria.
              </div>
            )}
          </div>
        )}

        {/* Grid view */}
        {view === "grid" && (
          <div
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label={`${filtered.length} Tripura assets`}
          >
            {filtered.map((x) => (
              <div
                key={x.id}
                role="listitem"
                className={`rounded-2xl border p-5 transition hover:shadow-lg ${cardBg}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className={`font-mono text-xs ${muteColor}`}>
                      {x.asset_code}
                    </div>
                    <h3 className={`mt-1 font-bold ${headingColor}`}>
                      {x.name}
                    </h3>
                  </div>
                  <span
                    className={`badge text-xs uppercase font-bold shrink-0 ${
                      condStyles[x.condition] ?? "text-slate-300"
                    }`}
                  >
                    {x.condition}
                  </span>
                </div>
                <p className={`mt-3 text-xs leading-relaxed ${muteColor}`}>
                  {x.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className={`badge ${isGovt ? "border-blue-200 bg-blue-50 text-[#0a5c9e]" : "text-cyan-300"}`}>
                    <MapPin size={11} aria-hidden="true" /> {x.district} ({x.city})
                  </span>
                  <span className="badge">
                    {x.asset_type}
                  </span>
                </div>
                <div className={`mt-3 border-t border-white/5 pt-2 text-xs flex justify-between ${muteColor}`}>
                  <span>{x.source_name}</span>
                  <span className="font-mono">
                    {x.latitude?.toFixed(2)}°N, {x.longitude?.toFixed(2)}°E
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
