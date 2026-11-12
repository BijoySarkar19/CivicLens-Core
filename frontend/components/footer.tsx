"use client";

import Link from "next/link";
import { ShieldCheck, MapPin } from "lucide-react";
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
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="font-bold text-lg">
                CivicLens Core · Tripura Operations
              </div>
              <p className="mt-2 text-sm text-blue-200 leading-6">
                Civic Infrastructure Operations &amp; Grievance Redressal System (Demonstration Portal).
                Engineered for transparent tracking of municipal utilities, roads, drainage and water networks across all 8 districts of Tripura.
              </p>
              <p className="mt-3 text-xs text-blue-300">
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
            <span>Tripura State Operations (8 Districts)</span>
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
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-bold text-white">
            CivicLens <span className="text-cyan-300">Core</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
            A secure, GIS-enabled public infrastructure operations foundation for Tripura.
            Using verified operational records for municipal assets and citizen grievances.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge text-xs text-slate-400">
              <MapPin size={11} aria-hidden="true" /> Tripura State
            </span>
            <span className="badge text-xs text-slate-400">8 Districts</span>
            <span className="badge text-xs text-slate-400">Anti-Tamper</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Platform Services</h3>
          <nav aria-label="Platform links">
            <div className="mt-3 grid gap-2 text-sm text-slate-500">
              <Link href="/report" className="hover:text-cyan-300 transition">
                Report Grievance
              </Link>
              <Link href="/login" className="hover:text-cyan-300 transition">
                Track Complaint / Sign In
              </Link>
              <Link href="/assets" className="hover:text-cyan-300 transition">
                Tripura Assets Registry
              </Link>
              <Link href="/map" className="hover:text-cyan-300 transition">
                GIS Operational Map
              </Link>
              <Link href="/admin" className="hover:text-cyan-300 transition">
                Admin Panel
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-700">
        © {year} CivicLens Core · Tripura Infrastructure Operations Demo
      </div>
    </footer>
  );
}
