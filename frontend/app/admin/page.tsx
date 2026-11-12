"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
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
  Trash2,
  Send,
  X,
  BadgeCheck,
  Radio,
  FileCode,
} from "lucide-react";
import { apiFetch, getCurrentUser, setCurrentUser, UserRole } from "@/lib/api";
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
  const [activeRole, setActiveRole] = useState<UserRole>("super_admin");
  const [users, setUsers] = useState(DEMO_ADMIN_USERS);
  const [audit, setAudit] = useState(DEMO_ADMIN_AUDIT);
  const [depts, setDepts] = useState(DEMO_ADMIN_DEPTS);
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [auditSearch, setAuditSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Sync active logged-in officer persona
  useEffect(() => {
    const user = getCurrentUser();
    if (user?.role) {
      setActiveRole(user.role);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    setActiveRole(newRole);
    if (newRole === "super_admin") {
      setCurrentUser({
        email: "admin@civiclens.local",
        name: "Shri Debasish Roy, TCS",
        role: "super_admin",
        designation: "Chief Operations Officer & State Director",
        department: "Directorate of Urban Development, Agartala",
        avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      });
    } else if (newRole === "pwd_engineer") {
      setCurrentUser({
        email: "pwd.officer@tripura.gov.in",
        name: "Er. Arun Debnath",
        role: "pwd_engineer",
        designation: "Executive Engineer (Roads & Bridges)",
        department: "Public Works Department (Roads & Bridges)",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      });
    } else if (newRole === "dws_inspector") {
      setCurrentUser({
        email: "dws.inspector@tripura.gov.in",
        name: "Bikash Jamatia",
        role: "dws_inspector",
        designation: "Senior Water Works Field Inspector",
        department: "Drinking Water & Sanitation Directorate (DWS)",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      });
    }
  };

  // Role-Based Dataset Scoping: Only Super Admin has all details!
  const scopedUsers = users.filter((u) => {
    if (activeRole === "super_admin") return true;
    if (activeRole === "pwd_engineer") {
      return (
        u.department.toLowerCase().includes("public works") ||
        u.department.toLowerCase().includes("pwd") ||
        u.role === "infrastructure_manager" ||
        u.email.includes("pwd")
      );
    }
    if (activeRole === "dws_inspector") {
      return (
        u.department.toLowerCase().includes("drinking water") ||
        u.department.toLowerCase().includes("dws") ||
        u.role === "field_inspector" ||
        u.email.includes("dws")
      );
    }
    return true;
  });

  const scopedDepts = depts.filter((d) => {
    if (activeRole === "super_admin") return true;
    if (activeRole === "pwd_engineer") {
      return d.code === "TR-PWD" || d.name.toLowerCase().includes("public works");
    }
    if (activeRole === "dws_inspector") {
      return d.code === "TR-DWS" || d.name.toLowerCase().includes("drinking water");
    }
    return true;
  });

  const scopedAudit = audit.filter((a) => {
    if (activeRole === "super_admin") return true;
    if (activeRole === "pwd_engineer") {
      return (
        a.details?.toLowerCase().includes("road") ||
        a.details?.toLowerCase().includes("pwd") ||
        a.details?.toLowerCase().includes("bitumen") ||
        a.details?.toLowerCase().includes("bridge") ||
        a.actor?.toLowerCase().includes("pwd") ||
        a.actor?.toLowerCase().includes("arun") ||
        a.entity?.toLowerCase().includes("work_order")
      );
    }
    if (activeRole === "dws_inspector") {
      return (
        a.details?.toLowerCase().includes("water") ||
        a.details?.toLowerCase().includes("dws") ||
        a.details?.toLowerCase().includes("pipeline") ||
        a.details?.toLowerCase().includes("leak") ||
        a.actor?.toLowerCase().includes("dws") ||
        a.actor?.toLowerCase().includes("jamatia") ||
        a.entity?.toLowerCase().includes("inspection")
      );
    }
    return true;
  });

  const scopedSummary: DashboardSummary = {
    assets:
      activeRole === "super_admin" ? 96 : activeRole === "pwd_engineer" ? 26 : 18,
    incidents:
      activeRole === "super_admin" ? 8 : activeRole === "pwd_engineer" ? 3 : 2,
    open_incidents:
      activeRole === "super_admin" ? 3 : activeRole === "pwd_engineer" ? 1 : 1,
    critical_incidents:
      activeRole === "super_admin" ? 1 : activeRole === "pwd_engineer" ? 1 : 0,
    work_orders:
      activeRole === "super_admin" ? 6 : activeRole === "pwd_engineer" ? 3 : 2,
    open_work_orders:
      activeRole === "super_admin" ? 4 : activeRole === "pwd_engineer" ? 2 : 1,
    inspections:
      activeRole === "super_admin" ? 6 : activeRole === "pwd_engineer" ? 4 : 2,
    maintenance_records:
      activeRole === "super_admin" ? 14 : activeRole === "pwd_engineer" ? 8 : 6,
    ai_enabled: true,
  };

  // Employee details & dismissal management
  const [selectedOfficer, setSelectedOfficer] = useState<(typeof DEMO_ADMIN_USERS)[0] | null>(null);
  const [officerToDismiss, setOfficerToDismiss] = useState<(typeof DEMO_ADMIN_USERS)[0] | null>(null);
  const [dismissalEmailNotice, setDismissalEmailNotice] = useState<{
    officer: (typeof DEMO_ADMIN_USERS)[0];
    token: string;
    timestamp: string;
  } | null>(null);

  const handleDismissOfficer = (officer: (typeof DEMO_ADMIN_USERS)[0]) => {
    if (activeRole !== "super_admin") return;

    const token = `TR-REV-NIC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Mark as revoked/inactive in users state
    setUsers((prev) =>
      prev.map((u) => (u.id === officer.id ? { ...u, active: false, last_login: "Access Revoked" } : u))
    );

    // Record in tamper-evident audit trail
    const auditRecord = {
      id: Date.now(),
      actor: "Chief Operations Officer (Super Admin)",
      action: "OFFICER_DISMISSED_AND_ACCESS_REVOKED",
      entity: "User / Employee",
      entity_id: officer.employee_id || String(officer.id),
      request_id: `req-dismiss-${token}`,
      details: `Official dismissal order executed. Access credentials revoked. Automated termination notice dispatched to ${officer.email} via NIC SMTP Gateway. Security Token: ${token}`,
      created_at: new Date().toISOString(),
    };
    setAudit((prev) => [auditRecord, ...prev]);

    // Close confirmation and trigger automated email notification modal
    setOfficerToDismiss(null);
    if (selectedOfficer?.id === officer.id) setSelectedOfficer(null);
    setDismissalEmailNotice({
      officer,
      token,
      timestamp,
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const [s, a, d, u] = await Promise.allSettled([
        apiFetch<DashboardSummary>("/analytics/summary"),
        apiFetch<{ items: typeof DEMO_ADMIN_AUDIT }>("/audit/?limit=50"),
        apiFetch<{ items: typeof DEMO_ADMIN_DEPTS }>("/departments/"),
        apiFetch<{ items: typeof DEMO_ADMIN_USERS }>("/admin/users"),
      ]);

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

  const filteredUsers = scopedUsers.filter((u) =>
    `${u.name} ${u.email} ${u.role} ${u.department}`
      .toLowerCase()
      .includes(userSearch.toLowerCase())
  );

  const filteredDepts = scopedDepts.filter((d) =>
    `${d.name} ${d.code} ${d.head} ${d.jurisdiction}`
      .toLowerCase()
      .includes(deptSearch.toLowerCase())
  );

  const filteredAudit = scopedAudit.filter((a) =>
    `${a.actor ?? ""} ${a.action} ${a.entity} ${a.entity_id ?? ""} ${a.details ?? ""}`
      .toLowerCase()
      .includes(auditSearch.toLowerCase())
  );

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const cardBg = isGovt ? "border-gray-200 bg-white shadow-sm" : "glass border-white/8";

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: `Users (${filteredUsers.length})`, icon: Users },
    { id: "departments", label: `Departments (${filteredDepts.length})`, icon: Building },
    { id: "audit", label: `Audit Log (${filteredAudit.length})`, icon: FileText },
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
                <Crown size={12} /> Directorate of Urban Development · Demo Operations Portal
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

        {/* Active Persona Banner & Interactive Role Switcher */}
        <div
          className={`mb-8 rounded-2xl border p-4 sm:p-5 transition-all shadow-sm ${
            activeRole === "super_admin"
              ? isGovt
                ? "border-amber-300 bg-amber-50/80 text-slate-900"
                : "border-amber-400/30 bg-amber-500/10 text-white"
              : activeRole === "pwd_engineer"
              ? isGovt
                ? "border-blue-300 bg-blue-50/80 text-slate-900"
                : "border-blue-400/30 bg-blue-500/10 text-white"
              : isGovt
              ? "border-emerald-300 bg-emerald-50/80 text-slate-900"
              : "border-emerald-400/30 bg-emerald-500/10 text-white"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-inner ${
                  activeRole === "super_admin"
                    ? "bg-amber-400/20 text-amber-500 border border-amber-400/30"
                    : activeRole === "pwd_engineer"
                    ? "bg-blue-400/20 text-blue-500 border border-blue-400/30"
                    : "bg-emerald-400/20 text-emerald-500 border border-emerald-400/30"
                }`}
              >
                {activeRole === "super_admin" ? "👑" : activeRole === "pwd_engineer" ? "🏗️" : "💧"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`badge text-[11px] font-black uppercase tracking-wider ${
                      activeRole === "super_admin"
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                        : activeRole === "pwd_engineer"
                        ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30"
                        : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {activeRole === "super_admin"
                      ? "👑 Super Admin (Full Statewide Authority)"
                      : activeRole === "pwd_engineer"
                      ? "🏗️ PWD Executive Engineer (Roads & Bridges)"
                      : "💧 DWS Senior Field Inspector (Water & Sanitation)"}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isGovt ? "text-slate-600" : "text-slate-400"}`}>
                    {activeRole === "super_admin"
                      ? "admin@civiclens.local"
                      : activeRole === "pwd_engineer"
                      ? "pwd.officer@tripura.gov.in"
                      : "dws.inspector@tripura.gov.in"}
                  </span>
                </div>
                <p className={`text-xs mt-1.5 font-medium leading-relaxed ${isGovt ? "text-slate-700" : "text-slate-300"}`}>
                  {activeRole === "super_admin" ? (
                    <span>
                      <strong className="text-amber-600 dark:text-amber-400">Unrestricted Full Access:</strong> Viewing all 96 Tripura assets across 8 districts, all 22 administrative officers, all 5 municipal departments, complete immutable audit ledger, and exclusive executive commission revocation &amp; dismissal powers.
                    </span>
                  ) : activeRole === "pwd_engineer" ? (
                    <span>
                      <strong className="text-blue-600 dark:text-blue-400">Departmentally Scoped View:</strong> Viewing 26 PWD road/bridge infrastructure assets, 4 PWD officers/engineers, active road repair work orders, and road maintenance audit logs. Officer dismissal power is locked (Super Admin clearance required).
                    </span>
                  ) : (
                    <span>
                      <strong className="text-emerald-600 dark:text-emerald-400">Departmentally Scoped View:</strong> Viewing 18 DWS water grid assets, 3 field inspectors, pipeline repair tickets, and water purity logs. Officer dismissal power is locked (Super Admin clearance required).
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Switch Persona Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-black/10 dark:border-white/10 shrink-0">
              <span className={`text-[11px] font-bold uppercase tracking-wider mr-1 ${isGovt ? "text-slate-600" : "text-slate-400"}`}>
                Switch Persona:
              </span>
              <button
                type="button"
                onClick={() => switchRole("super_admin")}
                className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                  activeRole === "super_admin"
                    ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-105"
                    : isGovt
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                👑 Super Admin
              </button>
              <button
                type="button"
                onClick={() => switchRole("pwd_engineer")}
                className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                  activeRole === "pwd_engineer"
                    ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-400 scale-105"
                    : isGovt
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                🏗️ PWD Engineer
              </button>
              <button
                type="button"
                onClick={() => switchRole("dws_inspector")}
                className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                  activeRole === "dws_inspector"
                    ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400 scale-105"
                    : isGovt
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                💧 DWS Inspector
              </button>
            </div>
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
                {activeRole !== "super_admin" && (
                  <div
                    className={`rounded-2xl border p-4 text-xs font-medium flex items-center gap-3 ${
                      isGovt ? "bg-amber-50 border-amber-300 text-amber-900" : "bg-amber-400/10 border-amber-400/30 text-amber-200"
                    }`}
                  >
                    <ShieldAlert size={18} className="shrink-0 text-amber-500" />
                    <p>
                      <strong>Departmentally Scoped Metrics:</strong> You are viewing operational statistics filtered strictly to your jurisdiction (
                      {activeRole === "pwd_engineer"
                        ? "Public Works Department — Roads & Bridges"
                        : "Drinking Water & Sanitation Directorate"
                      }
                      ). Only the <strong>Super Admin</strong> has complete unrestricted statewide oversight across all 8 districts and municipal directorates.
                    </p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    label={
                      activeRole === "super_admin"
                        ? "Tripura Infrastructure Assets"
                        : activeRole === "pwd_engineer"
                        ? "PWD Roads & Bridges Assets"
                        : "DWS Water Grid Assets"
                    }
                    value={scopedSummary.assets}
                    hint={activeRole === "super_admin" ? "Covering all 8 districts" : "Departmental jurisdiction"}
                    index={0}
                  />
                  <StatCard
                    label="Public Grievances"
                    value={scopedSummary.incidents}
                    hint={activeRole === "super_admin" ? "Statewide registered incidents" : "Scoped to jurisdiction"}
                    index={1}
                    variant="warning"
                  />
                  <StatCard
                    label="Active Work Orders"
                    value={scopedSummary.open_work_orders}
                    hint={activeRole === "super_admin" ? "Assigned across Tripura" : "Departmental tickets"}
                    index={2}
                  />
                  <StatCard
                    label="Field Inspection Reports"
                    value={scopedSummary.inspections}
                    hint={activeRole === "super_admin" ? "Verified structural audits" : "Field engineer audits"}
                    index={3}
                    variant="success"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    label="Total Work Orders Dispatched"
                    value={scopedSummary.work_orders}
                    hint={activeRole === "super_admin" ? "All time across Tripura" : "Department execution tickets"}
                    index={4}
                  />
                  <StatCard
                    label="Critical Open Grievances"
                    value={scopedSummary.critical_incidents}
                    hint="P1 priority safety hazards"
                    index={5}
                    variant="danger"
                  />
                  <StatCard
                    label="Completed Maintenance"
                    value={scopedSummary.maintenance_records}
                    hint="Resolved field tasks"
                    index={6}
                    variant="success"
                  />
                  <StatCard
                    label={activeRole === "super_admin" ? "Tripura Municipal Departments" : "Assigned Directorate"}
                    value={scopedDepts.length}
                    hint={activeRole === "super_admin" ? "Active departments" : "Department profile"}
                    index={7}
                  />
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

            {/* 2. USERS & EMPLOYEE MANAGEMENT TAB */}
            {tab === "users" && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search size={15} className={`absolute left-3.5 top-3.5 ${isGovt ? "text-gray-400" : "text-slate-500"}`} />
                    <input
                      type="search"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search officers by name, ID, email, station or role…"
                      className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none ${
                        isGovt ? "border-gray-300 bg-white text-gray-900" : "border-white/10 bg-[#0b1726] text-white"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-400">
                      {activeRole === "super_admin" ? "Statewide Personnel: " : "Departmental Roster: "}
                      <strong className={isGovt ? "text-gray-900 font-bold" : "text-white"}>{scopedUsers.length}</strong> (Active: {scopedUsers.filter((u) => u.active).length}, Dismissed: {scopedUsers.filter((u) => !u.active).length})
                      {activeRole !== "super_admin" && (
                        <span className="ml-2 text-amber-500 font-bold">(Scoped to directorate)</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[880px] text-sm" role="table">
                      <thead>
                        <tr className={isGovt ? "bg-gray-100 text-gray-700 text-xs uppercase" : "bg-white/[.03] text-slate-400 text-xs uppercase"}>
                          <th className="px-5 py-4 text-left font-bold">Officer / Employee</th>
                          <th className="px-4 py-4 text-left font-bold">Employee ID &amp; Station</th>
                          <th className="px-4 py-4 text-left font-bold">Department &amp; Clearance</th>
                          <th className="px-4 py-4 text-left font-bold">System Role</th>
                          <th className="px-4 py-4 text-left font-bold">Status</th>
                          <th className="px-5 py-4 text-right font-bold">HR Actions</th>
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
                                <div className="flex items-center gap-3">
                                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-slate-800">
                                    {/* Officer Avatar Image */}
                                    {u.avatar ? (
                                      <img
                                        src={u.avatar}
                                        alt={u.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLElement).style.display = "none";
                                        }}
                                      />
                                    ) : null}
                                    <div className="absolute inset-0 grid place-items-center bg-cyan-500/20 text-cyan-300 font-black text-sm -z-10">
                                      {u.name.charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className={`font-bold flex items-center gap-1.5 ${isGovt ? "text-gray-900" : "text-white"}`}>
                                      {u.name}
                                      {u.role === "super_admin" && (
                                        <Crown size={13} className="text-amber-400" />
                                      )}
                                    </p>
                                    <p className={`text-xs ${isGovt ? "text-slate-600 font-semibold" : "text-gray-400"}`}>
                                      {u.designation || u.role}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                                      <span className={`px-1.5 py-0.5 rounded font-semibold ${
                                        isGovt ? "bg-slate-100 text-slate-700 border border-slate-300" : "bg-white/5 text-slate-300 border border-white/10"
                                      }`}>
                                        {u.gender || "Male"}
                                      </span>
                                      <span className={`px-1.5 py-0.5 rounded font-semibold capitalize ${
                                        isGovt ? "bg-slate-100 text-slate-700 border border-slate-300" : "bg-white/5 text-slate-300 border border-white/10"
                                      }`}>
                                        {u.marital_status || "Married"}
                                      </span>
                                    </div>
                                    <p className={`text-[11px] font-mono mt-1 ${isGovt ? "text-[#004085] font-bold" : "text-cyan-400/80"}`}>
                                      {u.email}
                                    </p>
                                    <p className={`text-[11px] font-mono ${isGovt ? "text-slate-700 font-medium" : "text-gray-400"}`}>
                                      {u.phone}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-4">
                                <span className="inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs font-mono font-bold text-slate-300 border border-white/10">
                                  {u.employee_id || `TR-EMP-${u.id}`}
                                </span>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                  <MapPin size={11} className="text-cyan-400 shrink-0" />
                                  <span className="truncate max-w-[200px]">{u.station || "Agartala, Tripura"}</span>
                                </p>
                              </td>

                              <td className="px-4 py-4">
                                <p className={`text-xs font-semibold ${isGovt ? "text-gray-800" : "text-slate-200"}`}>
                                  {u.department}
                                </p>
                                <p className="text-[11px] text-gray-400 font-mono mt-0.5 flex items-center gap-1">
                                  <ShieldCheck size={11} className="text-emerald-400" />
                                  {u.clearance || "Tier 1 — Standard Operational Access"}
                                </p>
                              </td>

                              <td className="px-4 py-4">
                                <span className={`badge text-xs font-bold whitespace-nowrap ${roleInfo.color}`}>
                                  {roleInfo.label}
                                </span>
                              </td>

                              <td className="px-4 py-4">
                                {u.active ? (
                                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap ${
                                    isGovt ? "text-emerald-700" : "text-emerald-300"
                                  }`}>
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Active Duty
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap text-red-400">
                                    <span className="h-2 w-2 rounded-full bg-red-500" /> Relieved / Revoked
                                  </span>
                                )}
                              </td>

                              <td className="px-5 py-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    onClick={() => setSelectedOfficer(u)}
                                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${
                                      isGovt
                                        ? "border-blue-300 bg-blue-50 text-blue-900 hover:bg-blue-100"
                                        : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                                    }`}
                                    title="View employee full details dossier"
                                  >
                                    View Dossier
                                  </button>
                                  {u.active ? (
                                    activeRole === "super_admin" ? (
                                      <button
                                        onClick={() => setOfficerToDismiss(u)}
                                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white transition"
                                        title="Revoke officer credentials & send automated dismissal notice"
                                      >
                                        Fire / Dismiss
                                      </button>
                                    ) : (
                                      <span
                                        className="rounded-lg border border-gray-500/20 bg-gray-500/10 px-2 py-1 text-[11px] font-semibold text-gray-400 cursor-not-allowed inline-flex items-center gap-1"
                                        title="Super Admin clearance required to dismiss personnel"
                                      >
                                        <Lock size={10} /> Locked
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-[11px] font-mono text-red-400 font-bold px-2 py-1 bg-red-500/5 rounded border border-red-500/20">
                                      Revoked
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* EMPLOYEE DOSSIER MODAL */}
                <AnimatePresence>
                  {selectedOfficer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
                          isGovt ? "bg-white border-gray-300 text-gray-900" : "bg-[#0c1827] border-white/10 text-white"
                        }`}
                      >
                        <button
                          onClick={() => setSelectedOfficer(null)}
                          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10 transition"
                          aria-label="Close dossier"
                        >
                          <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-4">
                          <span className={`badge text-xs font-bold uppercase tracking-wider ${
                            isGovt
                              ? "bg-blue-100 text-[#004085] border border-blue-200"
                              : "text-cyan-300 border-cyan-400/30 bg-cyan-400/10"
                          }`}>
                            Civic Operations Intelligence · Personnel Dossier [Demo]
                          </span>
                        </div>

                        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b pb-6 ${
                          isGovt ? "border-gray-200" : "border-white/10"
                        }`}>
                          <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 shadow-xl ${
                            isGovt ? "border-[#004085]/40 bg-slate-100" : "border-cyan-400/50 bg-slate-800"
                          }`}>
                            {selectedOfficer.avatar ? (
                              <img
                                src={selectedOfficer.avatar}
                                alt={selectedOfficer.name}
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                            <div className="absolute inset-0 grid place-items-center bg-cyan-500/20 text-cyan-300 font-black text-xl -z-10">
                              {selectedOfficer.name.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-2xl font-black ${isGovt ? "text-slate-900" : "text-white"}`}>{selectedOfficer.name}</h3>
                            <p className={`text-sm font-semibold ${isGovt ? "text-[#004085]" : "text-cyan-400"}`}>{selectedOfficer.designation || selectedOfficer.role}</p>
                            <p className={`text-xs mt-1 ${isGovt ? "text-slate-600" : "text-gray-400"}`}>{selectedOfficer.department}</p>
                          </div>
                          <div>
                            {selectedOfficer.active ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Active Commission
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400">
                                Relieved from Duty
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dossier Information Grid */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                          <div className={`rounded-xl border p-3.5 space-y-1 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Official Employee Code</span>
                            <p className={`font-mono text-sm font-black ${isGovt ? "text-[#004085]" : "text-cyan-300"}`}>
                              {selectedOfficer.employee_id || `TR-EMP-${selectedOfficer.id}`}
                            </p>
                          </div>

                          <div className={`rounded-xl border p-3.5 space-y-1 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Security Clearance</span>
                            <p className={`font-bold ${isGovt ? "text-emerald-800" : "text-emerald-300"}`}>
                              {selectedOfficer.clearance || "Tier 1 — Field Operator"}
                            </p>
                          </div>

                          <div className={`rounded-xl border p-3.5 space-y-1 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Gender &amp; Marital Status</span>
                            <p className={`font-bold flex items-center gap-2 ${isGovt ? "text-slate-900" : "text-white"}`}>
                              <span>{selectedOfficer.gender || "Male"}</span>
                              <span className="opacity-30">•</span>
                              <span className="capitalize">{selectedOfficer.marital_status || "Married"}</span>
                            </p>
                          </div>

                          <div className={`rounded-xl border p-3.5 space-y-1 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Commission Date &amp; Activity</span>
                            <p className={`font-semibold ${isGovt ? "text-slate-800" : "text-slate-200"}`}>
                              {selectedOfficer.joined_date || "15 Jan 2024"} · ({selectedOfficer.last_login})
                            </p>
                          </div>

                          <div className={`rounded-xl border p-3.5 space-y-1 sm:col-span-2 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Official Registered Email</span>
                            <p className={`font-mono text-sm font-bold break-all flex items-center gap-2 ${
                              isGovt ? "text-[#004085]" : "text-cyan-300"
                            }`}>
                              <Mail size={15} className={isGovt ? "text-[#004085] shrink-0" : "text-cyan-400 shrink-0"} />
                              {selectedOfficer.email}
                            </p>
                          </div>

                          <div className={`rounded-xl border p-3.5 space-y-1 sm:col-span-2 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Government Official Mobile</span>
                            <p className={`font-mono text-sm font-bold flex items-center gap-2 ${
                              isGovt ? "text-slate-900" : "text-white"
                            }`}>
                              <Phone size={15} className={isGovt ? "text-[#004085] shrink-0" : "text-cyan-400 shrink-0"} />
                              {selectedOfficer.phone || "+91 94361-XXXXX"}
                            </p>
                          </div>

                          <div className={`rounded-xl border p-3.5 space-y-1 sm:col-span-2 ${
                            isGovt ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                          }`}>
                            <span className={isGovt ? "text-slate-500 font-semibold" : "text-gray-400 font-medium"}>Headquarters / Station Post</span>
                            <p className={`font-semibold flex items-center gap-2 ${
                              isGovt ? "text-slate-800" : "text-slate-200"
                            }`}>
                              <MapPin size={15} className={isGovt ? "text-[#004085] shrink-0" : "text-cyan-400 shrink-0"} />
                              {selectedOfficer.station || "Agartala, Tripura"}
                            </p>
                          </div>
                        </div>

                        {/* Modal Action Footer */}
                        <div className={`mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-5 ${
                          isGovt ? "border-gray-200" : "border-white/10"
                        }`}>
                          <p className={`text-[11px] ${isGovt ? "text-slate-500" : "text-gray-400"}`}>
                            All personnel modifications are signed into the immutable PostGIS audit log.
                          </p>
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                              onClick={() => setSelectedOfficer(null)}
                              className={`w-full sm:w-auto rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                                isGovt
                                  ? "border border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 shadow-xs"
                                  : "border border-white/10 text-gray-300 hover:bg-white/5"
                              }`}
                            >
                              Close Dossier
                            </button>
                            {selectedOfficer.active && (
                              activeRole === "super_admin" ? (
                                <button
                                  onClick={() => {
                                    setOfficerToDismiss(selectedOfficer);
                                    setSelectedOfficer(null);
                                  }}
                                  className="w-full sm:w-auto rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2"
                                >
                                  <Trash2 size={14} /> Revoke &amp; Dismiss (Fire)
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-500 dark:text-amber-300">
                                  <ShieldAlert size={14} className="shrink-0" /> Super Admin clearance required to revoke commissions
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* DISMISSAL CONFIRMATION DIALOG */}
                <AnimatePresence>
                  {officerToDismiss && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg rounded-3xl border border-red-500/40 bg-[#0d141f] p-6 sm:p-8 shadow-2xl text-white"
                      >
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-500/20 border border-red-500/30">
                            <AlertTriangle size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black">Revoke Credentials &amp; Dismiss</h3>
                            <p className="text-xs text-red-300">Executive Disciplinary Action · State Operations Command</p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed">
                          Are you sure you want to dismiss <strong className="text-white">{officerToDismiss.name}</strong> ({officerToDismiss.employee_id}) from <strong className="text-white">{officerToDismiss.department}</strong>?
                        </p>

                        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs space-y-2 text-red-200">
                          <p className="font-bold flex items-center gap-1.5 text-red-300">
                            <Send size={13} /> Automated Notification Transmission:
                          </p>
                          <p>
                            Upon confirmation, an official dismissal notification will be automatically transmitted to the registered address:
                          </p>
                          <p className="font-mono font-bold text-white bg-black/40 px-2 py-1 rounded">
                            {officerToDismiss.email}
                          </p>
                          <p className="text-[11px] text-red-300">
                            • Cryptographic API bearer tokens will be invalidated immediately.<br />
                            • Biometric and portal access will be permanently revoked.<br />
                            • A cryptographic audit event will be logged in the state audit ledger.
                          </p>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                          <button
                            onClick={() => setOfficerToDismiss(null)}
                            className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-gray-300 hover:bg-white/5"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDismissOfficer(officerToDismiss)}
                            className="rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-black text-white shadow-xl shadow-red-600/30 transition flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Confirm &amp; Fire Officer
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* AUTOMATED EMAIL DISPATCH TRANSMISSION RECEIPT MODAL */}
                <AnimatePresence>
                  {dismissalEmailNotice && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-xl rounded-3xl border border-emerald-500/40 bg-[#091522] p-6 sm:p-8 shadow-2xl text-white relative"
                      >
                        <button
                          onClick={() => setDismissalEmailNotice(null)}
                          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 text-emerald-400 mb-4">
                          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
                            <CheckCircle2 size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black">Official Notice Dispatched</h3>
                            <p className="text-xs text-emerald-300">Automated State Gateway Transmission Complete</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300">
                          The officer&apos;s credentials have been permanently revoked and an official dismissal notice was fired to the registered recipient mail.
                        </p>

                        {/* Simulated Email Envelope Header */}
                        <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs font-mono">
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">SMTP Gateway:</span>
                            <span className="text-emerald-400 font-bold">mail.nic.in (Tripura Operations Relay)</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">Recipient (To):</span>
                            <span className="text-cyan-300 font-bold">{dismissalEmailNotice.officer.email}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">From:</span>
                            <span className="text-slate-300">vigilance-admin@tripura.gov.in</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">Subject:</span>
                            <span className="text-amber-300 font-bold">
                              [OFFICIAL] REVOCATION OF CIVICLENS ACCESS CREDENTIALS &amp; RELIEF FROM DUTY
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">Security Revocation Token:</span>
                            <span className="text-purple-300 font-bold">{dismissalEmailNotice.token}</span>
                          </div>
                          <div className="flex justify-between pt-1 text-[11px]">
                            <span className="text-gray-400">Dispatched At:</span>
                            <span className="text-slate-400">{dismissalEmailNotice.timestamp}</span>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-200">
                          <strong>Audit Log Updated:</strong> A permanent tamper-evident entry has been stamped into the PostGIS state audit trail under entity ID <code className="font-bold text-white">{dismissalEmailNotice.officer.employee_id}</code>.
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => setDismissalEmailNotice(null)}
                            className="rounded-xl bg-cyan-400 hover:bg-cyan-300 px-6 py-2.5 text-xs font-black text-slate-950 transition"
                          >
                            Acknowledge &amp; Return to Admin
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
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
                    {activeRole === "super_admin"
                      ? `${filteredDepts.length} official departments registered across Tripura`
                      : `${filteredDepts.length} department profile in jurisdiction`}
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
                    {activeRole === "super_admin"
                      ? `Immutable SHA-256 Ledger (${filteredAudit.length} entries statewide)`
                      : `Scoped Audit Ledger (${filteredAudit.length} departmental entries)`}
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
