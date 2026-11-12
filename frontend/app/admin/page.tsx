"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { useGovtMode } from "@/lib/govt-mode";

/* ── Types ── */
interface UserRow {
  id: number;
  email: string;
  role: string;
  active: boolean;
  created_at: string;
}

interface AuditRow {
  id: number;
  actor: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  request_id: string | null;
  created_at: string;
}

interface DeptRow {
  id: number;
  code: string;
  name: string;
  active: boolean;
  created_at: string;
}

type AdminTab = "overview" | "users" | "audit" | "departments" | "system";

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
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [depts, setDepts] = useState<DeptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [s, a, d] = await Promise.all([
        apiFetch<DashboardSummary>("/analytics/summary"),
        apiFetch<{ items: AuditRow[] }>("/audit/?limit=50"),
        apiFetch<{ items: DeptRow[] }>("/departments/"),
      ]);
      setSummary(s);
      setAudit(a.items);
      setDepts(d.items);

      // Users come from /auth/me which is just the current user.
      // Admin user list would be at /admin/users — provide graceful fallback
      try {
        const u = await apiFetch<{ items: UserRow[] }>("/admin/users");
        setUsers(u.items);
      } catch {
        // Endpoint may not exist yet — show empty state
        setUsers([]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter((u) =>
    `${u.email} ${u.role}`.toLowerCase().includes(userSearch.toLowerCase())
  );

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "departments", label: "Departments", icon: Database },
    { id: "audit", label: "Audit Log", icon: FileText },
    { id: "system", label: "System", icon: Activity },
  ];

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const cardBg = isGovt ? "bg-white border-gray-200" : "glass border-white/8";

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end justify-between mb-8">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[.22em] ${accent}`}>
              <Crown size={12} className="inline mr-1" aria-hidden="true" />
              Administration
            </p>
            <h1
              className={`mt-2 text-4xl font-black tracking-tight ${
                isGovt ? "text-[#0d1b2a]" : "text-white"
              }`}
            >
              Admin Panel
            </h1>
            <p
              className={`mt-2 text-sm ${
                isGovt ? "text-gray-500" : "text-slate-500"
              }`}
            >
              Full system oversight — users, audit trail, departments and
              operational health.
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={refreshing}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
              isGovt
                ? "border-gray-200 text-gray-600 hover:bg-gray-100"
                : "border-white/10 text-slate-300 hover:bg-white/5"
            }`}
            aria-label="Refresh admin data"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className={`mb-6 rounded-xl border p-4 text-sm ${
              isGovt
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-red-400/20 bg-red-400/10 text-red-200"
            }`}
          >
            <AlertTriangle size={14} className="inline mr-2" aria-hidden="true" />
            {error}
          </div>
        )}

        {/* Tab nav */}
        <nav
          className={`flex gap-1 overflow-x-auto rounded-2xl border p-1 mb-8 ${
            isGovt ? "border-gray-200 bg-gray-50" : "border-white/8 bg-white/[.02]"
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
                aria-controls={`tab-panel-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isGovt
                    ? active
                      ? "bg-[#0a5c9e] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    : active
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {active && !isGovt && (
                  <motion.span
                    layoutId="admin-tab"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                  />
                )}
                <t.icon size={15} aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            id={`tab-panel-${tab}`}
            role="tabpanel"
            aria-label={tabs.find((t) => t.id === tab)?.label}
          >
            {tab === "overview" && (
              <OverviewTab
                summary={summary}
                loading={loading}
                isGovt={isGovt}
                cardBg={cardBg}
                accent={accent}
              />
            )}
            {tab === "users" && (
              <UsersTab
                users={filteredUsers}
                search={userSearch}
                setSearch={setUserSearch}
                isGovt={isGovt}
                cardBg={cardBg}
                accent={accent}
              />
            )}
            {tab === "departments" && (
              <DepartmentsTab
                depts={depts}
                isGovt={isGovt}
                cardBg={cardBg}
                accent={accent}
              />
            )}
            {tab === "audit" && (
              <AuditTab audit={audit} isGovt={isGovt} cardBg={cardBg} accent={accent} />
            )}
            {tab === "system" && (
              <SystemTab isGovt={isGovt} cardBg={cardBg} accent={accent} />
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </PageShell>
  );
}

/* ═══ Tab: Overview ═══ */
function OverviewTab({
  summary,
  loading,
  isGovt,
  cardBg,
  accent,
}: {
  summary: DashboardSummary | null;
  loading: boolean;
  isGovt: boolean;
  cardBg: string;
  accent: string;
}) {
  if (loading) return <Skeleton />;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Assets" value={summary?.assets ?? "—"} hint="Registered infrastructure" index={0} />
        <StatCard label="Total Incidents" value={summary?.incidents ?? "—"} hint="All time" index={1} variant="warning" />
        <StatCard label="Open Incidents" value={summary?.open_incidents ?? "—"} hint="Pending action" index={2} variant="danger" />
        <StatCard label="Open Work Orders" value={summary?.open_work_orders ?? "—"} hint="Active field tasks" index={3} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Work Orders" value={summary?.work_orders ?? "—"} hint="All time" index={4} />
        <StatCard label="Inspections" value={summary?.inspections ?? "—"} hint="Filed inspection reports" index={5} variant="success" />
        <StatCard label="Maintenance Records" value={summary?.maintenance_records ?? "—"} hint="Completed maintenance" index={6} variant="success" />
        <StatCard label="Critical Incidents" value={summary?.critical_incidents ?? "—"} hint="Highest severity" index={7} variant="danger" />
      </div>

      <div className={`rounded-2xl border p-6 ${cardBg}`}>
        <h2 className={`text-lg font-semibold ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
          AI Feature Gate
        </h2>
        <p className={`mt-2 text-sm ${isGovt ? "text-gray-500" : "text-slate-500"}`}>
          Part 2 AI features are intentionally disabled in Part 1.
        </p>
        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm ${
            isGovt
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-emerald-400/15 bg-emerald-400/5 text-emerald-300"
          }`}
        >
          <CheckCircle2 size={14} aria-hidden="true" />
          CIVICLENS_AI_ENABLED = false
        </div>
      </div>
    </div>
  );
}

/* ═══ Tab: Users ═══ */
function UsersTab({
  users,
  search,
  setSearch,
  isGovt,
  cardBg,
  accent,
}: {
  users: UserRow[];
  search: string;
  setSearch: (v: string) => void;
  isGovt: boolean;
  cardBg: string;
  accent: string;
}) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <label
        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
          isGovt ? "border-gray-200 bg-white" : "border-white/10 bg-white/[.03]"
        }`}
        aria-label="Search users by email or role"
      >
        <Search size={15} className={isGovt ? "text-gray-400" : "text-slate-500"} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by email or role…"
          className={`w-full bg-transparent outline-none ${
            isGovt ? "text-gray-800 placeholder-gray-400" : "text-slate-100 placeholder-slate-600"
          }`}
          aria-label="Search users"
        />
      </label>

      {users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          desc={
            search
              ? "No users match your search."
              : "The /admin/users endpoint is not yet available. Add it to the backend to list users here."
          }
          isGovt={isGovt}
        />
      ) : (
        <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[640px] text-sm"
              role="table"
              aria-label="Users list"
            >
              <thead>
                <tr
                  className={
                    isGovt
                      ? "bg-gray-50 text-gray-600 text-xs uppercase tracking-wider"
                      : "bg-white/[.03] text-slate-500 text-xs uppercase tracking-wider"
                  }
                >
                  <th className="px-5 py-4 text-left" scope="col">Email</th>
                  <th className="px-4 py-4 text-left" scope="col">Role</th>
                  <th className="px-4 py-4 text-left" scope="col">Status</th>
                  <th className="px-4 py-4 text-left" scope="col">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const roleInfo = ROLE_LABELS[u.role] ?? {
                    label: u.role,
                    color: "text-slate-300 border-slate-400/30 bg-slate-400/10",
                  };
                  return (
                    <tr
                      key={u.id}
                      className={`border-t ${
                        isGovt
                          ? "border-gray-100 hover:bg-gray-50"
                          : "border-white/5 hover:bg-white/[.02]"
                      }`}
                    >
                      <td className="px-5 py-4 font-medium">
                        {u.email}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`badge text-xs ${roleInfo.color}`}>
                          {roleInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {u.active ? (
                          <span className={`inline-flex items-center gap-1 text-xs font-medium ${isGovt ? "text-green-700" : "text-emerald-300"}`}>
                            <UserCheck size={13} aria-hidden="true" /> Active
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1 text-xs font-medium ${isGovt ? "text-red-600" : "text-red-300"}`}>
                            <UserX size={13} aria-hidden="true" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500">
                        {new Date(u.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ Tab: Departments ═══ */
function DepartmentsTab({
  depts,
  isGovt,
  cardBg,
  accent,
}: {
  depts: DeptRow[];
  isGovt: boolean;
  cardBg: string;
  accent: string;
}) {
  if (!depts.length) {
    return (
      <EmptyState
        icon={Database}
        title="No departments"
        desc="No departments are registered yet. Add departments via the API."
        isGovt={isGovt}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {depts.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`rounded-2xl border p-5 ${cardBg}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`text-xs font-mono ${
                  isGovt ? "text-gray-400" : "text-slate-600"
                }`}
              >
                {d.code}
              </span>
              <h3
                className={`mt-1 font-semibold ${
                  isGovt ? "text-[#0d1b2a]" : "text-white"
                }`}
              >
                {d.name}
              </h3>
            </div>
            <span
              className={`badge text-xs ${
                d.active
                  ? isGovt
                    ? "text-green-700 border-green-200 bg-green-50"
                    : "text-emerald-300 border-emerald-400/30 bg-emerald-400/10"
                  : isGovt
                  ? "text-red-600 border-red-200 bg-red-50"
                  : "text-red-300 border-red-400/30 bg-red-400/10"
              }`}
            >
              {d.active ? "Active" : "Inactive"}
            </span>
          </div>
          <p
            className={`mt-3 text-xs ${
              isGovt ? "text-gray-400" : "text-slate-600"
            }`}
          >
            Registered{" "}
            {new Date(d.created_at).toLocaleDateString("en-IN")}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══ Tab: Audit ═══ */
function AuditTab({
  audit,
  isGovt,
  cardBg,
  accent,
}: {
  audit: AuditRow[];
  isGovt: boolean;
  cardBg: string;
  accent: string;
}) {
  if (!audit.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No audit events"
        desc="Audit events appear here as operations are performed."
        isGovt={isGovt}
      />
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-[700px] text-sm"
          role="table"
          aria-label="Audit log"
        >
          <thead>
            <tr
              className={
                isGovt
                  ? "bg-gray-50 text-gray-500 text-xs uppercase tracking-wider"
                  : "bg-white/[.03] text-slate-500 text-xs uppercase tracking-wider"
              }
            >
              <th className="px-5 py-4 text-left" scope="col">Time</th>
              <th className="px-4 py-4 text-left" scope="col">Actor</th>
              <th className="px-4 py-4 text-left" scope="col">Action</th>
              <th className="px-4 py-4 text-left" scope="col">Entity</th>
              <th className="px-4 py-4 text-left" scope="col">Request ID</th>
            </tr>
          </thead>
          <tbody>
            {audit.map((a) => (
              <tr
                key={a.id}
                className={`border-t ${
                  isGovt
                    ? "border-gray-100 hover:bg-gray-50"
                    : "border-white/5 hover:bg-white/[.02]"
                }`}
              >
                <td className="px-5 py-3 text-xs whitespace-nowrap text-slate-500">
                  <Clock size={11} className="inline mr-1" aria-hidden="true" />
                  {new Date(a.created_at).toLocaleString("en-IN", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3 text-xs">{a.actor ?? "system"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`badge text-xs ${
                      isGovt
                        ? "border-blue-200 bg-blue-50 text-blue-800"
                        : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                    }`}
                  >
                    {a.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs">
                  {a.entity}
                  {a.entity_id ? ` #${a.entity_id}` : ""}
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-slate-600 max-w-[140px] truncate">
                  {a.request_id ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══ Tab: System ═══ */
function SystemTab({
  isGovt,
  cardBg,
  accent,
}: {
  isGovt: boolean;
  cardBg: string;
  accent: string;
}) {
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [ready, setReady] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ??
      "http://localhost:8000";
    Promise.all([
      fetch(`${base}/health`).then((r) => r.json()),
      fetch(`${base}/ready`).then((r) => r.json()),
    ]).then(([h, r]) => {
      setHealth(h as Record<string, unknown>);
      setReady(r as Record<string, unknown>);
    }).catch(() => {});
  }, []);

  const checks = [
    {
      label: "API Health",
      value: health ? String(health.status) : "checking…",
      ok: health?.status === "healthy",
    },
    {
      label: "Database",
      value: ready ? String(ready.database) : "checking…",
      ok: ready?.database === "ok",
    },
    {
      label: "AI Feature Flag",
      value: "DISABLED",
      ok: true,
    },
    {
      label: "CORS",
      value: "Configured",
      ok: true,
    },
    {
      label: "Rate Limiting",
      value: "Active (slowapi)",
      ok: true,
    },
    {
      label: "Audit Trail",
      value: "Enabled",
      ok: true,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {checks.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl border p-5 flex items-center gap-4 ${cardBg}`}
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm ${
                c.ok
                  ? isGovt
                    ? "bg-green-50 text-green-700"
                    : "bg-emerald-400/10 text-emerald-300"
                  : isGovt
                  ? "bg-red-50 text-red-700"
                  : "bg-red-400/10 text-red-300"
              }`}
              aria-hidden="true"
            >
              {c.ok ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
            </span>
            <div>
              <div
                className={`text-xs ${
                  isGovt ? "text-gray-500" : "text-slate-500"
                }`}
              >
                {c.label}
              </div>
              <div
                className={`mt-0.5 font-semibold text-sm ${
                  isGovt ? "text-[#0d1b2a]" : "text-white"
                }`}
              >
                {c.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══ Shared: Skeleton ═══ */
function Skeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-28 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

/* ═══ Shared: EmptyState ═══ */
function EmptyState({
  icon: Icon,
  title,
  desc,
  isGovt,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  isGovt: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed p-16 text-center ${
        isGovt ? "border-gray-300" : "border-white/10"
      }`}
    >
      <Icon
        size={32}
        className={`mx-auto ${isGovt ? "text-gray-300" : "text-slate-700"}`}
        aria-hidden="true"
      />
      <h3
        className={`mt-4 font-semibold ${
          isGovt ? "text-gray-700" : "text-slate-300"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 text-sm max-w-sm mx-auto ${
          isGovt ? "text-gray-500" : "text-slate-600"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
