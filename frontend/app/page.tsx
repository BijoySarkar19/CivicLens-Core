"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Database,
  MapPinned,
  ShieldCheck,
  Workflow,
  FileSearch,
  Bell,
  TrendingUp,
  Users,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useGovtMode } from "@/lib/govt-mode";
import { useRef } from "react";

const features = [
  {
    icon: MapPinned,
    title: "GIS Asset Registry",
    text: "Spatially grounded infrastructure records with PostGIS-ready geometry and OpenStreetMap integration.",
    color: "from-cyan-400/20 to-blue-500/10",
    iconColor: "text-cyan-300",
  },
  {
    icon: Workflow,
    title: "Operational Workflows",
    text: "Incidents, verification, work orders, inspections and closure in one auditable chain.",
    color: "from-purple-400/20 to-pink-500/10",
    iconColor: "text-purple-300",
  },
  {
    icon: Database,
    title: "Provenance First",
    text: "Dataset source, publisher, URL, license and import metadata stay fully traceable.",
    color: "from-emerald-400/20 to-teal-500/10",
    iconColor: "text-emerald-300",
  },
  {
    icon: ShieldCheck,
    title: "Security & Audit",
    text: "RBAC, rate limiting, request IDs, secure cookies and immutable-style audit events.",
    color: "from-amber-400/20 to-orange-500/10",
    iconColor: "text-amber-300",
  },
];

const stats = [
  { label: "Infrastructure Assets", value: "Real-time", icon: Database },
  { label: "Active Incidents", value: "Live Tracking", icon: Bell },
  { label: "Tripura Districts", value: "8 / 8 Active", icon: Globe },
  { label: "Citizen Reports", value: "24×7 Open", icon: Users },
];

const govtFeatures = [
  "Tripura State Public Utilities",
  "8 Districts Operational Monitoring",
  "Bilingual Support (EN / हिन्दी)",
  "Citizen Grievance Redressal",
  "Multi-Device Accessible (Mobile / Tablet / TV)",
  "Real-Time GIS Infrastructure Mapping",
];

export default function Home() {
  const { isGovt } = useGovtMode();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  if (isGovt) return <GovtHome />;

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <Header publicSite />

      <main id="main-content">
        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center"
          aria-label="Hero section"
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-70" aria-hidden="true" />

          {/* Animated blobs */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="hero-blob w-[600px] h-[600px] bg-cyan-400/15 left-[-100px] top-[-100px]"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="hero-blob w-[500px] h-[500px] bg-blue-500/10 right-[-80px] top-[100px]"
              style={{ animationDelay: "4s" }}
            />
            <div
              className="hero-blob w-[400px] h-[400px] bg-purple-500/10 left-[40%] bottom-[-60px]"
              style={{ animationDelay: "8s" }}
            />
          </motion.div>

          <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-24 lg:px-8 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-cyan-200">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                Part 1 · Civic Operations Foundation
              </span>

              <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-tight">
                Public infrastructure{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                    intelligence
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    aria-hidden="true"
                  />
                </span>
                ,{" "}
                <span className="text-slate-300">without fabricated AI.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                CivicLens Core connects infrastructure assets, GIS, citizen
                incidents, verification, maintenance, inspections, work orders
                and audit trails into one transparent operational system.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-400/25 transition hover:shadow-cyan-400/40 hover:scale-[1.02]"
                  aria-label="Open CivicLens command center"
                >
                  Open Command Center{" "}
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/8 hover:border-white/25"
                  aria-label="Report a public infrastructure issue"
                >
                  Report an Issue
                </Link>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <s.icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <ChevronDown className="text-slate-600" size={22} />
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8"
          aria-label="Platform features"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-cyan-300">
              Platform capabilities
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Everything you need to run{" "}
              <span className="text-cyan-300">civic infrastructure</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-slate-400">
              Built on real transactional data — not dashboards filled with
              placeholder numbers or fabricated AI scores.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`glass rounded-2xl p-6 bg-gradient-to-br ${f.color} border border-white/8 cursor-default`}
              >
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl bg-white/5 ${f.iconColor}`}
                  aria-hidden="true"
                >
                  <f.icon size={20} />
                </div>
                <h3 className="mt-5 font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {f.text}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── Operational workflow visual ── */}
        <section
          className="mx-auto max-w-7xl px-5 pb-24 lg:px-8"
          aria-label="Operational workflow"
        >
          <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-cyan-300">
                Transparent workflow
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                From report to resolution — auditable at every step
              </h2>

              <div className="mt-10 grid gap-4 md:grid-cols-4">
                {[
                  {
                    step: "01",
                    label: "Report",
                    desc: "Citizen or staff intake via public form",
                    color: "border-cyan-400/30 bg-cyan-400/5",
                  },
                  {
                    step: "02",
                    label: "Verify",
                    desc: "Operational review and state transition",
                    color: "border-blue-400/30 bg-blue-400/5",
                  },
                  {
                    step: "03",
                    label: "Work Order",
                    desc: "Assigned to field team with priority",
                    color: "border-purple-400/30 bg-purple-400/5",
                  },
                  {
                    step: "04",
                    label: "Close & Audit",
                    desc: "Resolution + immutable audit event",
                    color: "border-emerald-400/30 bg-emerald-400/5",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className={`rounded-2xl border p-5 ${item.color}`}
                  >
                    <div className="text-xs font-mono text-slate-600">
                      {item.step}
                    </div>
                    <div className="mt-4 text-lg font-bold text-white">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Operational Features section ── */}
        <section
          className="mx-auto max-w-7xl px-5 pb-28 lg:px-8"
          aria-label="Features and coverage"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight">
              Built for{" "}
              <span className="text-cyan-300">Tripura Public Infrastructure</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto">
              Real-time asset tracking, field inspection workflows and citizen grievance resolution across all 8 districts of Tripura.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {govtFeatures.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"
                  aria-hidden="true"
                />
                {f}
              </motion.span>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════
   GOVERNMENT VIEW — GIGW 3.0 Compliant
   ═══════════════════════════════════════ */
function GovtHome() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#0d1b2a]">
      <Header publicSite />

      <main id="main-content">
        {/* Top banner — Tripura Civic Infrastructure Operations Demo */}
        <div className="bg-[#0a5c9e] text-white py-2 text-center text-xs sm:text-sm font-medium">
          Tripura Urban Infrastructure Operations &amp; Grievance Redressal System · Demonstration Portal
        </div>

        {/* Hero */}
        <section
          className="bg-white border-b border-gray-200 py-16"
          aria-label="Welcome section"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#0a5c9e]">
                  Government of Tripura · Urban Infrastructure Operations
                </p>
                <h1 className="mt-4 text-4xl font-bold leading-snug text-[#0d1b2a]">
                  CivicLens Core
                  <br />
                  <span className="text-[#0a5c9e]">
                    Tripura Infrastructure Operations
                  </span>
                </h1>
                <p className="mt-4 text-gray-600 leading-7">
                  Digital demonstration platform enabling transparent management
                  of public infrastructure assets, citizen grievance reporting, field
                  inspections and work orders across all 8 districts of Tripura.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0a5c9e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#084d87]"
                    aria-label="Sign in or track grievance status"
                  >
                    Sign In / Track Grievance <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/report"
                    className="inline-flex items-center gap-2 rounded-md border-2 border-[#0a5c9e] px-5 py-3 text-sm font-semibold text-[#0a5c9e] transition hover:bg-[#0a5c9e]/10"
                    aria-label="File a public grievance report"
                  >
                    File a Grievance
                  </Link>
                </div>
                {/* Accessibility shortcuts */}
                <div className="mt-6 flex gap-3 text-xs text-gray-500">
                  <span>Accessibility:</span>
                  <button
                    className="underline hover:text-[#0a5c9e]"
                    onClick={() =>
                      document.documentElement.style.setProperty(
                        "font-size",
                        "120%"
                      )
                    }
                    aria-label="Increase text size"
                  >
                    A+
                  </button>
                  <button
                    className="underline hover:text-[#0a5c9e]"
                    onClick={() =>
                      document.documentElement.style.removeProperty("font-size")
                    }
                    aria-label="Reset text size"
                  >
                    A
                  </button>
                  <button
                    className="underline hover:text-[#0a5c9e]"
                    onClick={() =>
                      document.documentElement.style.setProperty(
                        "font-size",
                        "80%"
                      )
                    }
                    aria-label="Decrease text size"
                  >
                    A−
                  </button>
                </div>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Asset Registry",
                    desc: "GIS-mapped infrastructure",
                    icon: MapPinned,
                    href: "/assets",
                  },
                  {
                    label: "Incident Desk",
                    desc: "Public grievance tracking",
                    icon: Bell,
                    href: "/incidents",
                  },
                  {
                    label: "Work Orders",
                    desc: "Field operations status",
                    icon: Workflow,
                    href: "/work-orders",
                  },
                  {
                    label: "Audit Trail",
                    desc: "Full transparency log",
                    icon: FileSearch,
                    href: "/dashboard",
                  },
                ].map((card) => (
                  <Link
                    key={card.label}
                    href={card.href}
                    className="rounded-lg border-2 border-gray-200 bg-[#f8fafc] p-4 hover:border-[#0a5c9e]/40 hover:bg-white transition"
                    aria-label={`Go to ${card.label}`}
                  >
                    <card.icon
                      size={22}
                      className="text-[#0a5c9e]"
                      aria-hidden="true"
                    />
                    <div className="mt-3 font-semibold text-sm text-[#0d1b2a]">
                      {card.label}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {card.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coverage strip */}
        <section className="bg-gray-50 border-b border-gray-200 py-6">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap gap-4 items-center justify-center text-xs text-gray-600">
              <span className="font-semibold text-[#0a5c9e]">
                Operations Scope:
              </span>
              {govtFeatures.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded border border-gray-200 bg-white px-3 py-1"
                >
                  <ShieldCheck size={11} className="text-green-600" aria-hidden="true" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-xl font-bold text-[#0d1b2a] mb-6">
            Citizen Services
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Report Infrastructure Issue",
                desc: "File a public grievance about road damage, streetlights, drainage or water supply.",
                href: "/report",
                cta: "Report Now",
              },
              {
                title: "Track Your Report",
                desc: "Login with your registered email to track the status of your submitted grievance.",
                href: "/login",
                cta: "Track Status",
              },
              {
                title: "View Infrastructure Map",
                desc: "Explore the interactive GIS map of registered public assets in your area.",
                href: "/map",
                cta: "Open Map",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h3 className="font-semibold text-[#0d1b2a]">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-6">
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0a5c9e] hover:underline"
                  aria-label={item.cta + " - " + item.title}
                >
                  {item.cta} <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Policy strip */}
        <div className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
          Tripura Civic Operations Demonstration &nbsp;|&nbsp; Website Policy &nbsp;|&nbsp; Accessibility Statement
          &nbsp;|&nbsp; Sitemap
        </div>
      </main>

      <Footer />
    </div>
  );
}
