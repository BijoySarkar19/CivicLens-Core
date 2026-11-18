"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Filter, Search, TrendingUp, Clock } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Incident, DEMO_INCIDENTS } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

const SEVERITY_STYLES: Record<string, string> = {
  critical: "text-red-300 border-red-400/30 bg-red-400/10",
  high: "text-orange-300 border-orange-400/30 bg-orange-400/10",
  medium: "text-yellow-300 border-yellow-400/30 bg-yellow-400/10",
  low: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
};

const SEVERITY_STYLES_GOVT: Record<string, string> = {
  critical: "text-red-800 border-red-200 bg-red-50",
  high: "text-orange-800 border-orange-200 bg-orange-50",
  medium: "text-yellow-800 border-yellow-200 bg-yellow-50",
  low: "text-green-800 border-green-200 bg-green-50",
};

const STATUS_STYLES: Record<string, string> = {
  reported: "text-blue-300 border-blue-400/30 bg-blue-400/10",
  verified: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  in_progress: "text-purple-300 border-purple-400/30 bg-purple-400/10",
  resolved: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  closed: "text-slate-400 border-slate-400/30 bg-slate-400/10",
  rejected: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function IncidentsPage() {
  const [rows, setRows] = useState<Incident[]>(DEMO_INCIDENTS);
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: Incident[] }>("/incidents/")
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setRows(data.items);
        }
      })
      .catch(() => {
        setRows(DEMO_INCIDENTS);
      });

    try {
      const local = localStorage.getItem("cl-user-grievances");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRows((prev) => {
            const existingCodes = new Set(prev.map((i) => i.incident_code));
            const newOnes: Incident[] = parsed
              .filter((p: any) => p && p.code && !existingCodes.has(p.code))
              .map((p: any, idx: number) => ({
                id: 9700 + idx,
                incident_code: p.code,
                title: p.title || "Citizen Grievance",
                description: p.description || `Citizen complaint for ${p.category || "civic infrastructure"}.`,
                category: p.category || "General",
                severity: (p.severity as any) || "high",
                priority: (p.severity === "critical" ? "P1" : p.severity === "high" ? "P2" : "P3") as any,
                status: (p.status as any) || "reported",
                reporter_email: p.email || "citizen@tripura.gov.in",
                reporter_phone: (() => {
                  const ph = p.phone && typeof p.phone === "string" ? p.phone.trim() : "";
                  return ph && ph !== "+91 98621 44520" && ph !== "9862144520" && ph !== "+91 9876543210" ? ph : null;
                })(),
                photo_url: p.photo || p.photo_url || null,
                district: p.district || "West Tripura",
                city: p.city || "Agartala",
                landmark: p.landmark || "Tripura",
                assigned_department: "Public Works Department & DWS",
                verified_by: "Pending Verification",
                created_at: p.date || new Date().toISOString(),
              }));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch {}
  }, []);

  const filtered = rows.filter((x) => {
    const matchSearch = `${x.incident_code} ${x.title} ${x.category} ${x.assigned_department ?? ""}`.toLowerCase().includes(query.toLowerCase());
    const matchSeverity = severityFilter === "all" || x.severity === severityFilter;
    const matchStatus = statusFilter === "all" || x.status === statusFilter;
    return matchSearch && matchSeverity && matchStatus;
  });

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-500";
  const cardBg = isGovt ? "border-gray-200 bg-white" : "glass border-white/8";
  const inputBg = isGovt ? "border-gray-200 bg-white" : "border-white/10 bg-white/[.03]";

  const sevStyles = isGovt ? SEVERITY_STYLES_GOVT : SEVERITY_STYLES;

  const severities = ["all", "critical", "high", "medium", "low"];
  const statuses = ["all", "reported", "verified", "in_progress", "resolved", "closed", "rejected"];

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        aria-label="Incident management"
      >
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <div className="flex items-end gap-3">
            <AlertTriangle className={accent} size={22} aria-hidden="true" />
            <div>
              <p className={`text-xs uppercase tracking-[.2em] ${muteColor}`}>
                Operations
              </p>
              <h1 className={`mt-1 text-4xl font-black ${headingColor}`}>
                Incident Desk
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 md:ml-auto">
            {/* Stats pills */}
            {[
              { label: "Total", value: rows.length },
              {
                label: "Critical",
                value: rows.filter((r) => r.severity === "critical").length,
              },
              {
                label: "Open",
                value: rows.filter(
                  (r) => !["closed", "resolved", "rejected"].includes(r.status)
                ).length,
              },
            ].map((s) => (
              <span
                key={s.label}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm ${
                  isGovt
                    ? "border-gray-200 bg-white text-gray-700"
                    : "border-white/10 bg-white/[.03] text-slate-300"
                }`}
              >
                <TrendingUp size={13} aria-hidden="true" />
                {s.label}:{" "}
                <strong
                  className={accent}
                >
                  {s.value}
                </strong>
              </span>
            ))}
          </div>
        </div>

        <p className={`mt-3 ${muteColor}`}>
          Every incident moves through a controlled workflow and produces an
          audit event at each transition.
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <label
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm flex-1 min-w-[220px] ${inputBg}`}
            aria-label="Search incidents"
          >
            <Search size={15} className={muteColor} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search incidents…"
              className={`w-full bg-transparent outline-none ${
                isGovt ? "text-gray-800 placeholder-gray-400" : "text-slate-100 placeholder-slate-600"
              }`}
              aria-label="Search incidents by code, title, or category"
            />
          </label>

          {/* Severity filter */}
          <label className="sr-only" htmlFor="severity-filter">
            Filter by severity
          </label>
          <select
            id="severity-filter"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
              isGovt
                ? "border-gray-200 bg-white text-gray-700"
                : "border-white/10 bg-[#07111f] text-slate-300"
            }`}
            aria-label="Filter by severity"
          >
            {severities.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All severities" : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <label className="sr-only" htmlFor="status-filter">
            Filter by status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
              isGovt
                ? "border-gray-200 bg-white text-gray-700"
                : "border-white/10 bg-[#07111f] text-slate-300"
            }`}
            aria-label="Filter by status"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div
          className="mt-6 grid gap-4 lg:grid-cols-2"
          role="list"
          aria-label={`${filtered.length} incidents`}
        >
          {filtered.map((x, i) => (
            <motion.article
              key={x.id}
              role="listitem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl border p-6 transition hover:-translate-y-0.5 ${cardBg} ${
                isGovt ? "hover:shadow-md" : "hover:border-cyan-300/20"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div
                    className={`font-mono text-xs ${muteColor}`}
                  >
                    {x.incident_code}
                  </div>
                  <h2
                    className={`mt-1 text-lg font-semibold ${headingColor}`}
                  >
                    {x.title}
                  </h2>
                </div>
                <span
                  className={`badge text-xs ${
                    sevStyles[x.severity] ?? (isGovt ? "text-gray-700 border-gray-200 bg-gray-50" : "text-slate-300 border-white/10 bg-white/5")
                  }`}
                >
                  {x.severity}
                </span>
              </div>

              <p
                className={`mt-4 text-sm leading-6 line-clamp-2 ${
                  isGovt ? "text-gray-600" : "text-slate-400"
                }`}
              >
                {x.description}
              </p>

              {x.photo_url && (
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 max-h-48 bg-black/40">
                  <img
                    src={x.photo_url}
                    alt="Citizen Evidence"
                    className="w-full h-36 object-cover"
                  />
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`badge ${
                    STATUS_STYLES[x.status] ??
                    (isGovt ? "text-gray-600 border-gray-200 bg-gray-50" : "text-slate-300")
                  }`}
                >
                  {x.status.replace(/_/g, " ")}
                </span>
                <span className={`badge ${isGovt ? "border-gray-200 bg-gray-50 text-gray-600" : ""}`}>
                  {x.category}
                </span>
                <span className={`badge ${isGovt ? "border-gray-200 bg-gray-50 text-gray-600" : ""}`}>
                  Priority: {x.priority}
                </span>
                {x.assigned_department && (
                  <span className={`badge ${isGovt ? "border-blue-200 bg-blue-50 text-blue-700" : "text-cyan-200"}`}>
                    {x.assigned_department}
                  </span>
                )}
                <span
                  className={`ml-auto flex items-center gap-1 ${muteColor}`}
                >
                  <Clock size={11} aria-hidden="true" />
                  {new Date(x.created_at).toLocaleDateString("en-IN", {
                    dateStyle: "medium",
                  })}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {!filtered.length && (
          <div
            className={`mt-8 rounded-2xl border border-dashed p-16 text-center ${
              isGovt ? "border-gray-300 text-gray-400" : "border-white/10 text-slate-500"
            }`}
          >
            <AlertTriangle size={28} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p>No incidents match the current filters.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
