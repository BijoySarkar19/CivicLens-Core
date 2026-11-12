"use client";

import Link from "next/link";
import { Github, ShieldCheck, ExternalLink } from "lucide-react";
import { useGovtMode } from "@/lib/govt-mode";

export function Footer() {
  const { isGovt } = useGovtMode();
  const year = new Date().getFullYear();

  if (isGovt) {
    return (
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
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="font-bold text-lg">
                CivicLens Core
              </div>
              <p className="mt-2 text-sm text-blue-200 leading-6">
                An initiative under the Ministry of Housing &amp; Urban Affairs,
                Government of India. This website is designed, developed and
                maintained by the National Informatics Centre (NIC).
              </p>
              <p className="mt-3 text-xs text-blue-300">
                © {year} Government of India. All Rights Reserved.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Citizen Services
              </h3>
              <nav aria-label="Citizen services links">
                <div className="mt-3 grid gap-2 text-sm text-blue-200">
                  <Link href="/report" className="hover:text-white hover:underline">
                    Report Grievance
                  </Link>
                  <Link href="/map" className="hover:text-white hover:underline">
                    Infrastructure Map
                  </Link>
                  <Link href="/login" className="hover:text-white hover:underline">
                    Officer Portal
                  </Link>
                </div>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Compliance
              </h3>
              <div className="mt-3 grid gap-2 text-sm text-blue-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} aria-hidden="true" /> GIGW 3.0
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} aria-hidden="true" /> WCAG 2.1 AA
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} aria-hidden="true" /> ISO 23026
                </span>
                <Link
                  href="https://guidelines.india.gov.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 hover:text-white hover:underline mt-1"
                  aria-label="GIGW Guidelines portal (opens in new tab)"
                >
                  GIGW Portal{" "}
                  <ExternalLink size={11} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-blue-700 pt-5 flex flex-wrap gap-4 justify-between text-xs text-blue-300">
            <div className="flex gap-4 flex-wrap">
              <Link href="#" className="hover:text-white hover:underline">
                Website Policy
              </Link>
              <Link href="#" className="hover:text-white hover:underline">
                Accessibility Statement
              </Link>
              <Link href="#" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white hover:underline">
                Sitemap
              </Link>
            </div>
            <span>
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="border-t border-white/10 bg-[#050c16]"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-bold text-white">
            CivicLens <span className="text-cyan-300">Core</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
            A secure, GIS-enabled public infrastructure operations foundation.
            Part 1 uses real operational data and does not fabricate AI
            predictions.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge text-xs text-slate-400">
              <ShieldCheck size={11} aria-hidden="true" /> WCAG 2.1 AA
            </span>
            <span className="badge text-xs text-slate-400">GIGW 3.0</span>
            <span className="badge text-xs text-slate-400">ISO 23026</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Platform</h3>
          <nav aria-label="Platform links">
            <div className="mt-3 grid gap-2 text-sm text-slate-500">
              <Link href="/dashboard" className="hover:text-cyan-300 transition">
                Command Center
              </Link>
              <Link href="/map" className="hover:text-cyan-300 transition">
                GIS Map
              </Link>
              <Link href="/report" className="hover:text-cyan-300 transition">
                Public Reporting
              </Link>
              <Link href="/admin" className="hover:text-cyan-300 transition">
                Admin Panel
              </Link>
            </div>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Engineering</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="badge">
              <ShieldCheck size={12} aria-hidden="true" /> RBAC
            </span>
            <span className="badge">PostGIS</span>
            <span className="badge">Audit trail</span>
            <span className="badge">API v1</span>
            <span className="badge">Redis + Celery</span>
          </div>
          <Link
            href="https://github.com/BijoySarkar19"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition"
            aria-label="CivicLens Core GitHub repository (opens in new tab)"
          >
            <Github size={15} aria-hidden="true" /> GitHub
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-700">
        © {year} CivicLens Core · Part 1 · Built with transparency
      </div>
    </footer>
  );
}
