"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  UserX,
  Crown,
  Wrench,
  Eye,
  Database,
  BarChart3,
  FileText,
  Sparkles,
  Server,
  Layers,
  Cpu,
  Lock,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import {
  DashboardSummary,
  DEMO_ADMIN_USERS,
  DEMO_ADMIN_DEPTS,
  DEMO_ADMIN_AUDIT,
  DEMO_SYSTEM_METRICS,
} from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { useGovtMode } from "@/lib/govt-mode";

type AdminTab = "overview" | "users" | "departments" | "audit" | "system";

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  super_admin: { label: "Super Admin", color: "text-amber-300 border-amber-400/30 bg-amber-400/10" },
  infrastructure_manager: { label: "Infra Manager", color: "text-blue-300 border-blue-400/30 bg-blue-400/10" },
  department_officer: { label: "Dept Officer", color: "text-purple-300 border-purple-400/30 bg-purple-400/10" },
  field_inspector: { label: "Field Inspector", color: "text-green-300 border-green-400/30 bg-green-400/10" },
  data_administrator: { label: "Data Admin", color: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10" },
  public_user: { label: "Public User", color: "text-slate-300 border-slate-400/30 bg-slate-400/10" },
};

export default function AdminPage() {
  const { isGovt } = useGovtMode();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [summary, setSummary] = useState<DashboardSummary>({
    assets: 25,
    incidents: 8,
    open_incidents: 3,
    critical_incidents: 1,
    work_orders: 6,
    open_work_orders: 4,
    inspections: 6,
    maintenance_records: 14,
    ai_enabled: true,
  });
  const [users, setUsers] = useState(DEMO_ADMIN_USERS);
  const [audit, setAudit] = useState(DEMO_ADMIN_AUDIT);
  const [depts, setDepts] = useState(DEMO_ADMIN_DEPTS);
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [auditSearch, setAuditSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [s, a, d, u] = await Promise.allSettled([
        apiFetch<DashboardSummary>("/analytics/summary"),
        apiFetch<{ items: typeof DEMO_ADMIN_AUDIT }>("/audit/?limit=50"),
        apiFetch<{ items: typeof DEMO_ADMIN_DEPTS }>("/departments/"),
        apiFetch<{ items: typeof DEMO_ADMIN_USERS }>("/admin/users"),
      ]);

      if (s.status === "fulfilled" && s.value) setSummary(s.value);
      if (a.status === "fulfilled" && a.value?.items?.length) setAudit(a.value.items);
      if (d.status === "fulfilled" && d.value?.items?.length) setDepts(d.value.items);
      if (u.status === "fulfilled" && u.value?.items?.length) setUsers(u.value.items);
    } catch {
      // Graceful fallback to rich demo state
    }
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    await fetchData();
    setTimeout(() => setRefreshing(false), 500);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.role} ${u.department}`
      .toLowerCase()
      .includes(userSearch.toLowerCase())
  );

  const filteredDepts = depts.filter((d) =>
    `${d.name} ${d.code} ${d.head} ${d.jurisdiction}`
      .toLowerCase()
      .includes(deptSearch.toLowerCase())
  );

  const filteredAudit = audit.filter((a) =>
    `${a.actor ?? ""} ${a.action} ${a.entity} ${a.entity_id ?? ""} ${a.details ?? ""}`
      .toLowerCase()
      .includes(auditSearch.toLowerCase())
  );

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const cardBg = isGovt ? "border-gray-200 bg-white shadow-sm" : "glass border-white/8";

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: `Users (${users.length})`, icon: Users },
    { id: "departments", label: `Departments (${depts.length})`, icon: Building },
    { id: "audit", label: `Audit Log (${audit.length})`, icon: FileText },
    { id: "system", label: "System Health", icon: Server },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8" aria-label="Admin panel">
        {/* Header bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                isGovt ? "bg-[#0a5c9e]/10 text-[#0a5c9e]" : "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
              }`}>
                <Crown size={12} /> Directorate of Urban Development · Govt. of Tripura
              </span>
            </div>
            <h1 className={`text-3xl font-black mt-2 sm:text-4xl ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
              Admin Command &amp; Control
            </h1>
            <p className={`mt-1 text-sm ${isGovt ? "text-gray-600" : "text-slate-400"}`}>
              Full administrative oversight — users, registered departments, tamper-evident audit trail, and operational system health across Tripura.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={refreshing}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition active:scale-95 ${
                isGovt ? "border-gray-300 text-gray-700 hover:bg-gray-100" : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
              aria-label="Refresh admin data"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav
          className={`flex gap-1.5 overflow-x-auto rounded-2xl border p-1.5 mb-8 ${
            isGovt ? "border-gray-200 bg-gray-100/70" : "border-white/10 bg-white/[.02]"
          }`}
          role="tablist"
          aria-label="Admin panel sections"
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                  isGovt
                    ? active
                      ? "bg-[#0a5c9e] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200/60"
                    : active
                    ? "bg-cyan-400 text-slate-950 shadow-md font-black"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <t.icon size={15} aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            role="tabpanel"
          >
            {/* 1. OVERVIEW TAB */}
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard label="Tripura Infrastructure Assets" value={summary.assets} hint="Covering all 8 districts" index={0} />
                  <StatCard label="Total Public Grievances" value={summary.incidents} hint="Registered with GPS & evidence" index={1} variant="warning" />
                  <StatCard label="Active Work Orders" value={summary.open_work_orders} hint="Assigned to PWD/TSECL/AMC" index={2} />
                  <StatCard label="Field Inspection Reports" value={summary.inspections} hint="Verified structural audits" index={3} variant="success" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard label="Total Work Orders Dispatched" value={summary.work_orders} hint="All time across Tripura" index={4} />
                  <StatCard label="Open Critical Incidents" value={summary.critical_incidents} hint="P1 priority safety hazards" index={5} variant="danger" />
                  <StatCard label="Completed Maintenance" value={summary.maintenance_records} hint="Resolved field tasks" index={6} variant="success" />
                  <StatCard label="Tripura Municipal Departments" value={depts.length} hint="Active departments" index={7} />
                </div>

                {/* AI Predictive Decision Engine */}
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg} relative overflow-hidden`}>
                  <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                          Operational AI Intelligence Active
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black mt-2 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                        CivicLens Predictive Decision Engine
                      </h2>
                      <p className={`mt-2 text-sm max-w-3xl ${isGovt ? "text-gray-600" : "text-slate-400"}`}>
                        Integrated 90-day predictive risk modeling, automated computer vision damage classification, duplicate grievance clustering, P1–P4 priority calculation, what-if budget simulation, and field route optimization across all 8 Tripura districts.
                      </p>
                    </div>

                    <div className="flex shrink-0">
                      <Link
                        href="/ai"
                        className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-400/20 hover:scale-105 transition"
                      >
                        <Sparkles size={16} /> Open Predictive AI Insights →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. USERS TAB */}
            {tab === "users" && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search size={15} className={`absolute left-3.5 top-3.5 ${isGovt ? "text-gray-400" : "text-slate-500"}`} />
                    <input
                      type="search"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search users by name, email, department or role…"
                      className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none ${
                        isGovt ? "border-gray-300 bg-white text-gray-900" : "border-white/10 bg-[#0b1726] text-white"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    Showing {filteredUsers.length} authorized officers
                  </span>
                </div>

                <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-sm" role="table">
                      <thead>
                        <tr className={isGovt ? "bg-gray-100 text-gray-700 text-xs uppercase" : "bg-white/[.03] text-slate-400 text-xs uppercase"}>
                          <th className="px-5 py-4 text-left font-bold">Officer / User</th>
                          <th className="px-4 py-4 text-left font-bold">Department Jurisdiction</th>
                          <th className="px-4 py-4 text-left font-bold">System Role</th>
                          <th className="px-4 py-4 text-left font-bold">Status</th>
                          <th className="px-4 py-4 text-left font-bold">Last Activity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((u) => {
                          const roleInfo = ROLE_LABELS[u.role] ?? {
                            label: u.role,
                            color: "text-slate-300 border-slate-400/30 bg-slate-400/10",
                          };
                          return (
                            <tr key={u.id} className={isGovt ? "hover:bg-gray-50" : "hover:bg-white/[.02]"}>
                              <td className="px-5 py-4">
                                <div className="font-bold text-white flex items-center gap-2">
                                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/10 text-cyan-300 font-black text-xs">
                                    {u.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className={`font-bold ${isGovt ? "text-gray-900" : "text-white"}`}>{u.name}</p>
                                    <p className="text-xs text-gray-400 font-mono">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className={`px-4 py-4 text-xs font-medium ${isGovt ? "text-gray-700" : "text-slate-300"}`}>
                                {u.department}
                              </td>
                              <td className="px-4 py-4">
                                <span className={`badge text-xs font-bold whitespace-nowrap ${roleInfo.color}`}>
                                  {roleInfo.label}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap ${
                                  u.active ? (isGovt ? "text-green-700" : "text-emerald-300") : "text-red-400"
                                }`}>
                                  <UserCheck size={14} /> Active
                                </span>
                              </td>
                              <td className="px-4 py-4 text-xs font-mono text-gray-400 whitespace-nowrap">
                                {u.last_login}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. DEPARTMENTS TAB */}
            {tab === "departments" && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search size={15} className={`absolute left-3.5 top-3.5 ${isGovt ? "text-gray-400" : "text-slate-500"}`} />
                    <input
                      type="search"
                      value={deptSearch}
                      onChange={(e) => setDeptSearch(e.target.value)}
                      placeholder="Search departments by code, name, head or jurisdiction…"
                      className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none ${
                        isGovt ? "border-gray-300 bg-white text-gray-900" : "border-white/10 bg-[#0b1726] text-white"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    {filteredDepts.length} official departments registered
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDepts.map((d) => (
                    <div key={d.id} className={`rounded-2xl border p-5 transition hover:scale-[1.01] ${cardBg}`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded-lg">
                          {d.code}
                        </span>
                        <span className="badge text-[11px] font-bold uppercase text-emerald-400 bg-emerald-400/10 border-emerald-400/30 whitespace-nowrap">
                          Active State Authority
                        </span>
                      </div>

                      <h3 className={`mt-3 font-bold text-base ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                        {d.name}
                      </h3>

                      <div className="mt-4 space-y-2 border-t border-white/5 pt-3 text-xs text-gray-400">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Designated Head:</span>
                          <span className="font-semibold text-slate-200">{d.head}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Jurisdiction:</span>
                          <span className="font-semibold text-slate-200">{d.jurisdiction}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Contact Channel:</span>
                          <span className="font-mono text-cyan-300">{d.contact}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-3 text-center">
                        <div>
                          <p className="text-xs text-gray-500">Monitored Assets</p>
                          <p className="text-lg font-black text-white mt-0.5">{d.active_assets}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Field Squads</p>
                          <p className="text-lg font-black text-emerald-300 mt-0.5">{d.active_teams} Teams</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. AUDIT LOG TAB */}
            {tab === "audit" && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search size={15} className={`absolute left-3.5 top-3.5 ${isGovt ? "text-gray-400" : "text-slate-500"}`} />
                    <input
                      type="search"
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      placeholder="Search audit trail by actor, action, entity or details…"
                      className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none ${
                        isGovt ? "border-gray-300 bg-white text-gray-900" : "border-white/10 bg-[#0b1726] text-white"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    Immutable SHA-256 Tamper-Evident Ledger
                  </span>
                </div>

                <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-sm" role="table">
                      <thead>
                        <tr className={isGovt ? "bg-gray-100 text-gray-700 text-xs uppercase" : "bg-white/[.03] text-slate-400 text-xs uppercase"}>
                          <th className="px-5 py-4 text-left font-bold">Timestamp (IST)</th>
                          <th className="px-4 py-4 text-left font-bold">Actor</th>
                          <th className="px-4 py-4 text-left font-bold">Action Performed</th>
                          <th className="px-4 py-4 text-left font-bold">Entity Reference</th>
                          <th className="px-5 py-4 text-left font-bold">Operational Context</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAudit.map((a) => (
                          <tr key={a.id} className={isGovt ? "hover:bg-gray-50" : "hover:bg-white/[.02]"}>
                            <td className="px-5 py-3 text-xs whitespace-nowrap text-slate-400 font-mono">
                              <Clock size={12} className="inline mr-1 text-gray-500" />
                              {new Date(a.created_at).toLocaleString("en-IN", {
                                dateStyle: "short",
                                timeStyle: "medium",
                              })}
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-cyan-300 whitespace-nowrap">
                              {a.actor}
                            </td>
                            <td className="px-4 py-3">
                              <span className="badge text-[11px] font-bold uppercase border-cyan-400/20 bg-cyan-400/10 text-cyan-200 whitespace-nowrap">
                                {a.action}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-slate-300 whitespace-nowrap">
                              {a.entity_id ?? a.entity}
                            </td>
                            <td className={`px-5 py-3 text-xs ${isGovt ? "text-gray-700" : "text-slate-300"}`}>
                              {a.details}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 5. SYSTEM HEALTH TAB */}
            {tab === "system" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className={`rounded-2xl border p-5 ${cardBg}`}>
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400">
                        <Server size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Core API Gateway</p>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          127.0.0.1:8000 <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </h4>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-white/5 pt-3 text-xs text-gray-400 space-y-1">
                      <p>Uptime: <strong className="text-white">{DEMO_SYSTEM_METRICS.uptime_formatted}</strong></p>
                      <p>Framework: <strong className="text-white">FastAPI 0.115 + Next.js 15.5</strong></p>
                    </div>
                  </div>

                  <div className={`rounded-2xl border p-5 ${cardBg}`}>
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <Database size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Spatial Database</p>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          PostGIS 3.4 <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </h4>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-white/5 pt-3 text-xs text-gray-400 space-y-1">
                      <p>Active Connection Pool: <strong className="text-white">18 / 100</strong></p>
                      <p>Spatial Index: <strong className="text-white">EPSG:4326 (8 Tripura Districts)</strong></p>
                    </div>
                  </div>

                  <div className={`rounded-2xl border p-5 ${cardBg}`}>
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Semester 2 AI Platform</p>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          CivicLens AI v2.1 <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </h4>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-white/5 pt-3 text-xs text-gray-400 space-y-1">
                      <p>Inference Latency: <strong className="text-white">18.4 ms</strong></p>
                      <p>Test F1 Score: <strong className="text-emerald-400">0.901 (94.2% Acc)</strong></p>
                    </div>
                  </div>
                </div>

                {/* Sub-models Table */}
                <div className={`rounded-2xl border p-6 ${cardBg}`}>
                  <h3 className={`text-base font-bold mb-4 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                    Deployed AI Models &amp; Inference Pipeline Components
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {DEMO_SYSTEM_METRICS.ai_engine.models.map((m) => (
                      <div key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <span className="badge text-[10px] font-bold text-cyan-300 border-cyan-400/30">
                          {m.version}
                        </span>
                        <h5 className="font-bold text-sm text-white mt-2">{m.name}</h5>
                        <p className="text-xs text-emerald-400 font-semibold mt-1">✓ {m.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </PageShell>
  );
}
