"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, X, FileText, Eye, Lock, Layers } from "lucide-react";
import { useGovtMode } from "@/lib/govt-mode";

type PolicyType = "policy" | "accessibility" | "privacy" | "sitemap" | null;

export function Footer() {
  const { isGovt } = useGovtMode();
  const year = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<PolicyType>(null);

  const policyContent: Record<
    Exclude<PolicyType, null>,
    { title: string; subtitle: string; icon: React.ComponentType<{ size?: number; className?: string }>; content: React.ReactNode }
  > = {
    policy: {
      title: "Website & Demonstration Terms Policy",
      subtitle: "Operational Terms of Use & Demonstration Guidelines",
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs leading-relaxed">
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-[#004085]" : "text-cyan-400"}`}>
              1. Demonstration &amp; Evaluation Purpose
            </h4>
            <p>
              CivicLens AI is an academic and operational proof-of-concept platform developed to demonstrate smart civic governance, computer vision defect mensuration, and predictive infrastructure maintenance across Tripura&apos;s 8 districts. It is intended for administrative evaluation and technical review.
            </p>
          </div>
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-[#004085]" : "text-cyan-400"}`}>
              2. Accuracy &amp; Geospatial Coordinates
            </h4>
            <p>
              Geospatial asset points (including roads, municipal wards, bridges, and tourist landmarks) use WGS-84 (EPSG:4326) coordinates calibrated to Tripura. While seed telemetry mirrors real locations (e.g. Ujjayanta Palace, MBB Airport, Matabari), live municipal execution tickets are generated for demonstration.
            </p>
          </div>
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-[#004085]" : "text-cyan-400"}`}>
              3. Hyperlinking &amp; Fair Use
            </h4>
            <p>
              Links to external guidelines (such as GIGW 3.0 and UX4G) are provided for reference. Reproduction of the system architecture, code, and documentation is governed under the open Apache 2.0 license.
            </p>
          </div>
        </div>
      ),
    },
    accessibility: {
      title: "Accessibility Statement (GIGW 3.0 & WCAG 2.1 AA)",
      subtitle: "Universal Usability, High-Contrast & Screen Reader Conformance",
      icon: Eye,
      content: (
        <div className="space-y-4 text-xs leading-relaxed">
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-emerald-800" : "text-emerald-400"}`}>
              1. Standards Conformance
            </h4>
            <p>
              CivicLens is engineered to comply with the <strong>Guidelines for Indian Government Websites (GIGW 3.0)</strong> and the World Wide Web Consortium (W3C) <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
            </p>
          </div>
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-emerald-800" : "text-emerald-400"}`}>
              2. Dual-Mode High Contrast Toggle
            </h4>
            <p>
              The platform features an instant high-contrast toggle (accessible via the top-right header switch). In <strong>Government View</strong>, the interface uses UX4G government blue (<code className={`inline-block px-1.5 py-0.5 rounded font-mono font-bold text-[11px] ${isGovt ? "bg-blue-50 text-blue-800 border border-blue-200" : "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30"}`}>#004085</code>) with high-contrast text (<code className={`inline-block px-1.5 py-0.5 rounded font-mono font-bold text-[11px] ${isGovt ? "bg-slate-100 text-slate-900 border border-slate-300" : "bg-slate-800 text-cyan-200 border border-white/20"}`}>#0f172a</code>) achieving a 7:1 contrast ratio that exceeds standard requirements.
            </p>
          </div>
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-emerald-800" : "text-emerald-400"}`}>
              3. Keyboard Navigation &amp; ARIA Landmarks
            </h4>
            <p>
              Every form control, modal, and map element is accessible via standard keyboard inputs (
              <kbd className={`inline-block px-2 py-0.5 mx-0.5 rounded-md font-mono font-bold text-[11px] ${isGovt ? "bg-slate-100 text-slate-800 border border-slate-300 shadow-[0_1px_1px_rgba(0,0,0,0.12)]" : "bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>Tab</kbd>,{" "}
              <kbd className={`inline-block px-2 py-0.5 mx-0.5 rounded-md font-mono font-bold text-[11px] ${isGovt ? "bg-slate-100 text-slate-800 border border-slate-300 shadow-[0_1px_1px_rgba(0,0,0,0.12)]" : "bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>Enter</kbd>,{" "}
              <kbd className={`inline-block px-2 py-0.5 mx-0.5 rounded-md font-mono font-bold text-[11px] ${isGovt ? "bg-slate-100 text-slate-800 border border-slate-300 shadow-[0_1px_1px_rgba(0,0,0,0.12)]" : "bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>Esc</kbd>
              ). Interactive elements include explicit <code className={`inline-block px-1.5 py-0.5 rounded font-mono font-semibold text-[11px] ${isGovt ? "bg-blue-50 text-blue-900 border border-blue-200" : "bg-white/10 text-cyan-300 border border-white/10"}`}>aria-label</code> and <code className={`inline-block px-1.5 py-0.5 rounded font-mono font-semibold text-[11px] ${isGovt ? "bg-blue-50 text-blue-900 border border-blue-200" : "bg-white/10 text-cyan-300 border border-white/10"}`}>role</code> attributes.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy & Data Protection Policy",
      subtitle: "Citizen Redressal Privacy & Cryptographic Ledger Security",
      icon: Lock,
      content: (
        <div className="space-y-4 text-xs leading-relaxed">
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-purple-800" : "text-purple-400"}`}>
              1. Citizen Identity Protection
            </h4>
            <p>
              When citizens report grievances via the portal, mobile numbers and OTP verification tokens are strictly used for single-session authentication and SMS redressal tracking. Citizen personal identifiers are never sold, rented, or shared with third parties.
            </p>
          </div>
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-purple-800" : "text-purple-400"}`}>
              2. Photographic Evidence &amp; GPS Telemetry
            </h4>
            <p>
              Photographs uploaded during grievance reporting or field inspection are scanned for magic-byte verification (JPEG, PNG, WEBP) to prevent payload injection. EXIF geolocation data is processed solely to plot defect coordinates on the Tripura spatial map.
            </p>
          </div>
          <div>
            <h4 className={`font-bold text-sm mb-1 ${isGovt ? "text-purple-800" : "text-purple-400"}`}>
              3. Tamper-Evident Audit Logging
            </h4>
            <p>
              All administrative modifications, officer dismissals, and work order transitions are cryptographically sealed in the PostGIS audit log with immutable timestamps and SHA-256 tokens.
            </p>
          </div>
        </div>
      ),
    },
    sitemap: {
      title: "Interactive Platform Sitemap",
      subtitle: "Complete Navigation Hierarchy of CivicLens Core",
      icon: Layers,
      content: (
        <div className="space-y-4 text-xs leading-relaxed">
          <p className={isGovt ? "text-slate-600" : "text-slate-400"}>
            Explore all 10 unified operational modules and portals available across the platform:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { title: "Unified Home Portal", path: "/", desc: "Citizen gateway & officer quick-action triage" },
              { title: "Report a Grievance", path: "/report", desc: "Citizen complaint submission with photo & GPS" },
              { title: "Track Grievance / Login", path: "/login", desc: "Mobile OTP lookup & officer credentials" },
              { title: "Tripura GIS Spatial Map", path: "/map", desc: "Leaflet heatmap & 60+ categorized asset markers" },
              { title: "Infrastructure Asset Directory", path: "/assets", desc: "Wards, Panchayats, Roads, Power, Police, Fire" },
              { title: "Predictive AI Insights", path: "/ai", desc: "Computer vision, 90-day risk, What-If simulation" },
              { title: "Executive Operations Dashboard", path: "/dashboard", desc: "Live KPI summary, risk distribution & teams" },
              { title: "Grievances & Incidents", path: "/incidents", desc: "Public complaint verification & SLA status" },
              { title: "Municipal Work Orders", path: "/work-orders", desc: "Field execution tickets & contractor squads" },
              { title: "Admin Command & Control", path: "/admin", desc: "Personnel dossier, audit trail & system health" },
            ].map((s) => (
              <Link
                key={s.path}
                href={s.path}
                onClick={() => setActiveModal(null)}
                className={`rounded-xl border p-2.5 transition block group ${
                  isGovt
                    ? "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold group-hover:underline ${isGovt ? "text-[#004085]" : "text-cyan-300"}`}>{s.title}</span>
                  <code className={`text-[10px] font-mono ${isGovt ? "text-slate-500" : "text-gray-400"}`}>{s.path}</code>
                </div>
                <p className={`text-[11px] mt-0.5 ${isGovt ? "text-slate-600" : "text-gray-400"}`}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  };

  return (
    <>
      {isGovt ? (
        <footer
          className="border-t border-gray-200 bg-[#0a5c9e] text-white"
          role="contentinfo"
          aria-label="Site footer"
        >
          {/* Indian tricolour accent */}
          <div
            className="govt-stripe w-full"
            role="presentation"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="font-bold text-lg">
                  CivicLens Core · Urban Operations
                </div>
                <p className="mt-2 text-sm text-blue-100 leading-6">
                  Civic Infrastructure Operations &amp; Grievance Redressal System (Demonstration Portal).
                  Engineered for transparent tracking of municipal utilities, roads, drainage, wards, and water networks across all 8 districts of Tripura.
                </p>
                <p className="mt-3 text-xs text-blue-200">
                  © {year} Civic Operations Demonstration Portal.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Citizen Quick Links
                </h3>
                <nav aria-label="Citizen services links">
                  <div className="mt-3 grid gap-2 text-sm text-blue-200">
                    <Link href="/report" className="hover:text-white hover:underline">
                      Report Grievance
                    </Link>
                    <Link href="/map" className="hover:text-white hover:underline">
                      Tripura GIS Map
                    </Link>
                    <Link href="/login" className="hover:text-white hover:underline">
                      Track Grievance / Login
                    </Link>
                    <Link href="/assets" className="hover:text-white hover:underline">
                      Tripura Infrastructure Assets
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
            <div className="mt-8 border-t border-blue-700 pt-5 flex flex-wrap gap-4 justify-between text-xs text-blue-200">
              <div className="flex gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveModal("policy")}
                  className="hover:text-white hover:underline font-semibold"
                >
                  Website Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("accessibility")}
                  className="hover:text-white hover:underline font-semibold"
                >
                  Accessibility Statement
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-white hover:underline font-semibold"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("sitemap")}
                  className="hover:text-white hover:underline font-semibold"
                >
                  Sitemap
                </button>
              </div>
              <span>Tripura State Operations (8 Districts)</span>
            </div>
          </div>
        </footer>
      ) : (
        <footer
          className="border-t border-white/10 bg-[#050c16]"
          role="contentinfo"
          aria-label="Site footer"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
            <div className="md:col-span-2">
              <div className="font-bold text-white text-lg">
                CivicLens <span className="text-cyan-300">Core</span>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                A secure, GIS-enabled public infrastructure operations foundation for Tripura.
                Using verified operational records for municipal assets and citizen grievances.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge text-xs text-slate-400">
                  <MapPin size={11} aria-hidden="true" /> Tripura State
                </span>
                <span className="badge text-xs text-slate-400">
                  <ShieldCheck size={11} aria-hidden="true" /> GIGW 3.0 / UX4G
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </div>
              <nav aria-label="Footer navigation">
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-400">
                  <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
                  <Link href="/incidents" className="hover:text-white">Incidents</Link>
                  <Link href="/work-orders" className="hover:text-white">Work Orders</Link>
                  <Link href="/assets" className="hover:text-white">Assets</Link>
                  <Link href="/ai" className="hover:text-white">Predictive AI</Link>
                  <Link href="/admin" className="hover:text-white">Admin</Link>
                </div>
              </nav>
            </div>
          </div>
          <div className="border-t border-white/5 py-4">
            <div className="mx-auto max-w-7xl px-5 text-xs text-slate-500 flex flex-wrap justify-between gap-4 lg:px-8">
              <span>© {year} Civic Operations Demonstration Portal.</span>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModal("policy")}
                  className="hover:text-cyan-300 hover:underline"
                >
                  Website Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("accessibility")}
                  className="hover:text-cyan-300 hover:underline"
                >
                  Accessibility Statement
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-cyan-300 hover:underline"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("sitemap")}
                  className="hover:text-cyan-300 hover:underline"
                >
                  Sitemap
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* POLICY READER MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div
            className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto ${
              isGovt ? "bg-white border-gray-300 text-gray-900" : "bg-[#091522] border-white/10 text-white"
            }`}
          >
            <button
              onClick={() => setActiveModal(null)}
              className={`absolute right-5 top-5 rounded-full p-2 transition ${
                isGovt ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Close reader modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl border ${
                  isGovt
                    ? "bg-blue-50 border-blue-200 text-[#004085]"
                    : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300"
                }`}
              >
                {(() => {
                  const Icon = policyContent[activeModal].icon;
                  return <Icon size={24} />;
                })()}
              </div>
              <div>
                <h3 className={`text-xl font-black ${isGovt ? "text-slate-900" : "text-white"}`}>
                  {policyContent[activeModal].title}
                </h3>
                <p className={`text-xs ${isGovt ? "text-slate-600" : "text-slate-400"}`}>
                  {policyContent[activeModal].subtitle}
                </p>
              </div>
            </div>

            <div className={`mt-5 border-t pt-4 ${isGovt ? "border-gray-200 text-slate-800" : "border-white/10 text-slate-300"}`}>
              {policyContent[activeModal].content}
            </div>

            <div className="mt-8 flex justify-end border-t pt-4 border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                  isGovt
                    ? "bg-[#004085] text-white hover:bg-blue-900 shadow-md"
                    : "bg-cyan-400 text-slate-950 font-black hover:bg-cyan-300 shadow-lg shadow-cyan-400/20"
                }`}
              >
                Close &amp; Return to Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}