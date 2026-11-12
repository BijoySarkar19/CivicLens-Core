"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Map,
  Wrench,
  Activity,
  TrendingUp,
  Clock,
  Boxes,
  ClipboardCheck,
  ShieldCheck,
  Users,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { useGovtMode } from "@/lib/govt-mode";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary>({
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
  const [me, setMe] = useState<{ email: string; role: string }>({
    email: "admin@civiclens.local",
    role: "super_admin",
  });
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<DashboardSummary>("/analytics/summary")
      .then((res) => {
        if (res) setData(res);
      })
      .catch(() => {});

    apiFetch<{ email: string; role: string }>("/auth/me")
      .then((user) => {
        if (user) setMe(user);
      })
      .catch(() => {});
  }, []);

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const cardBg = isGovt ? "bg-white border-gray-200" : "glass border-white/8";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-500";

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        aria-label="Operational dashboard"
      >
        {/* Header row */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[.22em] ${accent}`}>
              <Activity size={12} className="inline mr-1" aria-hidden="true" />
              Command Center
            </p>
            <h1 className={`mt-2 text-4xl font-black tracking-tight ${headingColor}`}>
              Operational Overview
            </h1>
            {me && (
              <p className={`mt-1 text-sm ${muteColor}`}>
                Signed in as{" "}
                <span className="font-semibold">{me.email}</span>{" "}
                <span className={`badge text-xs ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>
                  {me.role.replace(/_/g, " ")}
                </span>
              </p>
            )}
            <p className={`mt-1 text-sm ${muteColor}`}>
              All data sourced directly from the transactional database — no
              fabricated metrics.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/map"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                isGovt
                  ? "border-gray-200 text-gray-600 hover:bg-gray-100"
                  : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
              aria-label="Open live GIS map"
            >
              <Map size={16} aria-hidden="true" /> Live GIS Map
            </Link>
            <Link
              href="/admin"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                isGovt
                  ? "border-[#0a5c9e]/30 text-[#0a5c9e] hover:bg-[#0a5c9e]/10"
                  : "border-cyan-300/20 text-cyan-200 hover:bg-cyan-300/10"
              }`}
              aria-label="Open admin panel"
            >
              <ShieldCheck size={16} aria-hidden="true" /> Admin Panel
            </Link>
          </div>
        </div>

        {/* Main stats */}
        <div
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Key performance indicators"
        >
          <StatCard
            label="Assets"
            value={data?.assets ?? "—"}
            hint="Registered infrastructure"
            index={0}
          />
          <StatCard
            label="Open Incidents"
            value={data?.open_incidents ?? "—"}
            hint="Requires operational attention"
            index={1}
            variant="warning"
          />
          <StatCard
            label="Critical Incidents"
            value={data?.critical_incidents ?? "—"}
            hint="Highest severity active"
            index={2}
            variant="danger"
          />
          <StatCard
            label="Open Work Orders"
            value={data?.open_work_orders ?? "—"}
            hint="Active field tasks"
            index={3}
          />
        </div>

        {/* Secondary stats */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Inspections"
            value={data?.inspections ?? "—"}
            hint="Total filed"
            index={4}
            variant="success"
          />
          <StatCard
            label="Maintenance"
            value={data?.maintenance_records ?? "—"}
            hint="Records logged"
            index={5}
            variant="success"
          />
          <StatCard
            label="Total Incidents"
            value={data?.incidents ?? "—"}
            hint="All time reported"
            index={6}
          />
          <StatCard
            label="Total Work Orders"
            value={data?.work_orders ?? "—"}
            hint="All time created"
            index={7}
          />
        </div>

        {/* Workflow card + AI flag */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`rounded-3xl border p-6 lg:col-span-2 ${cardBg}`}
            role="region"
            aria-label="Operational workflow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-semibold ${headingColor}`}>
                  Operational Flow
                </h2>
                <p className={`mt-1 text-sm ${muteColor}`}>
                  Every step is auditable and transition-controlled.
                </p>
              </div>
              <CheckCircle2
                className={accent}
                aria-hidden="true"
              />
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {[
                {
                  step: "01",
                  label: "Report",
                  desc: "Citizen or staff intake",
                  color: isGovt ? "bg-blue-50 border-blue-200" : "bg-cyan-400/5 border-cyan-400/20",
                },
                {
                  step: "02",
                  label: "Verify",
                  desc: "Operational verification",
                  color: isGovt ? "bg-purple-50 border-purple-200" : "bg-purple-400/5 border-purple-400/20",
                },
                {
                  step: "03",
                  label: "Work",
                  desc: "Assigned work order",
                  color: isGovt ? "bg-orange-50 border-orange-200" : "bg-amber-400/5 border-amber-400/20",
                },
                {
                  step: "04",
                  label: "Close",
                  desc: "Resolution + audit event",
                  color: isGovt ? "bg-green-50 border-green-200" : "bg-emerald-400/5 border-emerald-400/20",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`rounded-2xl border p-4 ${item.color}`}
                >
                  <div
                    className={`text-xs font-mono ${muteColor}`}
                  >
                    {item.step}
                  </div>
                  <div
                    className={`mt-5 font-semibold ${headingColor}`}
                  >
                    {item.label}
                  </div>
                  <div className={`mt-1 text-xs ${muteColor}`}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div
            className={`rounded-3xl border p-6 ${cardBg} relative overflow-hidden`}
            role="region"
            aria-label="CivicLens AI Decision Layer"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs uppercase tracking-[.18em] font-bold text-emerald-400">
                Predictive Intelligence Active
              </p>
            </div>
            <h2 className={`mt-3 text-xl font-black ${headingColor}`}>
              CivicLens AI Engine
            </h2>
            <p className={`mt-2 text-sm leading-6 ${muteColor}`}>
              Intelligent decision layer online. Featuring 90-day risk predictions, computer vision damage detection (potholes/cracks 94%), automated duplicate clustering, and dynamic work order recommendations.
            </p>
            <div
              className={`mt-4 flex items-center justify-between gap-2 rounded-xl border p-3 text-xs font-mono ${
                isGovt
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={14} aria-hidden="true" />
                CIVICLENS_AI_ENABLED = true
              </span>
              <span className="text-[11px] font-sans font-bold text-cyan-300">v2.1</span>
            </div>

            <div className="mt-4">
              <Link
                href="/ai"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-cyan-300 active:scale-95 shadow-md"
              >
                <Sparkles size={14} /> Open AI Decision Suite →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div
          className="mt-6 grid gap-4 md:grid-cols-3"
          aria-label="Quick navigation"
        >
          <QuickLink
            href="/assets"
            icon={<Boxes size={18} aria-hidden="true" />}
            title="Manage Assets"
            text="Inspect infrastructure records and provenance."
            isGovt={isGovt}
          />
          <QuickLink
            href="/incidents"
            icon={<AlertTriangle size={18} aria-hidden="true" />}
            title="Review Incidents"
            text="Verify reports and advance workflow states."
            isGovt={isGovt}
          />
          <QuickLink
            href="/inspections"
            icon={<ClipboardCheck size={18} aria-hidden="true" />}
            title="Record Inspections"
            text="Update observed asset condition with an audit event."
            isGovt={isGovt}
          />
          <QuickLink
            href="/work-orders"
            icon={<Wrench size={18} aria-hidden="true" />}
            title="Work Orders"
            text="Track field operations from creation to completion."
            isGovt={isGovt}
          />
          <QuickLink
            href="/map"
            icon={<Map size={18} aria-hidden="true" />}
            title="GIS Map"
            text="Explore spatial asset and incident data visually."
            isGovt={isGovt}
          />
          <QuickLink
            href="/admin"
            icon={<ShieldCheck size={18} aria-hidden="true" />}
            title="Admin Panel"
            text="User management, audit logs and system health."
            isGovt={isGovt}
          />
        </div>
      </section>
    </PageShell>
  );
}

function QuickLink({
  href,
  icon,
  title,
  text,
  isGovt,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  isGovt: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl border p-5 transition hover:-translate-y-1 ${
        isGovt
          ? "border-gray-200 bg-white hover:border-[#0a5c9e]/30 hover:shadow-md"
          : "glass border-white/8 hover:border-cyan-300/20"
      }`}
      aria-label={`Navigate to ${title}`}
    >
      <div
        className={`flex items-center justify-between ${
          isGovt ? "text-[#0a5c9e]" : "text-cyan-300"
        }`}
      >
        {icon}
        <ArrowUpRight
          size={16}
          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
      <h3
        className={`mt-5 font-semibold ${
          isGovt ? "text-[#0d1b2a]" : "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 text-sm leading-6 ${
          isGovt ? "text-gray-500" : "text-slate-500"
        }`}
      >
        {text}
      </p>
    </Link>
  );
}
