"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wrench, AlertTriangle, Calendar, User, Building } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

import { DEMO_WORK_ORDERS } from "@/lib/types";

type WorkOrder = {
  id: number;
  work_order_code: string;
  title?: string;
  description?: string;
  asset_id?: number | null;
  asset_name?: string;
  incident_id?: number | null;
  district?: string;
  priority: string;
  status: string;
  assigned_department?: string;
  assigned_to?: string;
  cost_estimate?: string;
  estimated_cost?: number;
  due_date?: string;
  deadline?: string;
  created_at: string;
};

const PRIORITY_STYLES: Record<string, string> = {
  critical: "text-red-300 border-red-400/30 bg-red-400/10",
  high: "text-orange-300 border-orange-400/30 bg-orange-400/10",
  normal: "text-blue-300 border-blue-400/30 bg-blue-400/10",
  medium: "text-blue-300 border-blue-400/30 bg-blue-400/10",
  low: "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

const PRIORITY_STYLES_GOVT: Record<string, string> = {
  critical: "text-red-800 border-red-200 bg-red-50",
  high: "text-orange-800 border-orange-200 bg-orange-50",
  normal: "text-blue-800 border-blue-200 bg-blue-50",
  medium: "text-blue-800 border-blue-200 bg-blue-50",
  low: "text-gray-600 border-gray-200 bg-gray-50",
};

const STATUS_STYLES: Record<string, string> = {
  created: "text-slate-300 border-white/10",
  assigned: "text-blue-300 border-blue-400/30 bg-blue-400/10",
  in_progress: "text-purple-300 border-purple-400/30 bg-purple-400/10",
  completed: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  cancelled: "text-slate-500 border-slate-400/20 bg-slate-400/5",
};

export default function WorkOrdersPage() {
  const [rows, setRows] = useState<WorkOrder[]>(DEMO_WORK_ORDERS as WorkOrder[]);
  const [statusFilter, setStatusFilter] = useState("all");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: WorkOrder[] }>("/work-orders/")
      .then((x) => {
        if (x.items && x.items.length > 0) {
          setRows(x.items);
        }
      })
      .catch(() => {
        // Fallback to rich Tripura demo work orders
        setRows(DEMO_WORK_ORDERS as WorkOrder[]);
      });
  }, []);

  const filtered =
    statusFilter === "all"
      ? rows
      : rows.filter((r) => r.status === statusFilter);

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-500";
  const cardBg = isGovt ? "border-gray-200 bg-white" : "glass border-white/8";
  const priStyles = isGovt ? PRIORITY_STYLES_GOVT : PRIORITY_STYLES;
  const statuses = ["all", "created", "assigned", "in_progress", "completed", "cancelled"];

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        aria-label="Work orders"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <div className="flex items-end gap-3">
            <Wrench className={accent} size={22} aria-hidden="true" />
            <div>
              <p className={`text-xs uppercase tracking-[.2em] ${muteColor}`}>
                Execution
              </p>
              <h1 className={`text-4xl font-black ${headingColor}`}>
                Work Orders
              </h1>
            </div>
          </div>

          <div className="md:ml-auto">
            <label className="sr-only" htmlFor="wo-status-filter">
              Filter by status
            </label>
            <select
              id="wo-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`rounded-xl border px-4 py-2.5 text-sm outline-none ${
                isGovt
                  ? "border-gray-200 bg-white text-gray-700"
                  : "border-white/10 bg-[#07111f] text-slate-300"
              }`}
              aria-label="Filter work orders by status"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All statuses" : s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="mt-8 grid gap-4 lg:grid-cols-2"
          role="list"
          aria-label={`${filtered.length} work orders`}
        >
          {filtered.map((x, i) => (
            <motion.article
              key={x.id}
              role="listitem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl border p-5 ${cardBg}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={`font-mono text-xs font-semibold ${accent}`}
                  >
                    {x.work_order_code}
                  </span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span
                      className={`badge text-xs ${
                        STATUS_STYLES[x.status] ??
                        (isGovt ? "text-gray-600 border-gray-200" : "text-slate-300")
                      }`}
                    >
                      {x.status.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`badge text-xs ${
                        priStyles[x.priority] ??
                        (isGovt ? "text-gray-600 border-gray-200" : "text-slate-300")
                      }`}
                    >
                      {x.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`mt-5 grid grid-cols-2 gap-3 text-sm ${muteColor}`}
              >
                {x.asset_id && (
                  <span className="flex items-center gap-1.5">
                    <Wrench size={12} aria-hidden="true" />
                    Asset #{x.asset_id}
                  </span>
                )}
                {x.incident_id && (
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle size={12} aria-hidden="true" />
                    Incident #{x.incident_id}
                  </span>
                )}
                {x.assigned_department && (
                  <span className="flex items-center gap-1.5">
                    <Building size={12} aria-hidden="true" />
                    {x.assigned_department}
                  </span>
                )}
                {x.assigned_to && (
                  <span className="flex items-center gap-1.5">
                    <User size={12} aria-hidden="true" />
                    {x.assigned_to}
                  </span>
                )}
                {x.due_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} aria-hidden="true" />
                    Due{" "}
                    {new Date(x.due_date).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </span>
                )}
                {x.estimated_cost != null && (
                  <span>
                    Est. ₹{x.estimated_cost.toLocaleString("en-IN")}
                  </span>
                )}
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
            <Wrench size={28} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            No work orders{statusFilter !== "all" ? ` with status "${statusFilter}"` : ""} recorded yet.
          </div>
        )}
      </section>
    </PageShell>
  );
}
