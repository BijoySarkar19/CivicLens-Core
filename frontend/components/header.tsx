"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  Siren,
  Boxes,
  ClipboardCheck,
  Wrench,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Settings,
  Users,
  BarChart3,
} from "lucide-react";
import { logout } from "@/lib/api";
import { useGovtMode } from "@/lib/govt-mode";
import { useState } from "react";
import { GovtModeToggle } from "./govt-mode-toggle";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assets", label: "Assets", icon: Boxes },
  { href: "/incidents", label: "Incidents", icon: Siren },
  { href: "/inspections", label: "Inspections", icon: ClipboardCheck },
  { href: "/work-orders", label: "Work Orders", icon: Wrench },
  { href: "/map", label: "GIS Map", icon: Map },
  { href: "/admin", label: "Admin", icon: Settings },
];

export function Header({ publicSite = false }: { publicSite?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isGovt } = useGovtMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    try {
      await logout();
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <>
      {/* Indian-tricolour stripe in govt mode */}
      {isGovt && (
        <div
          className="govt-stripe w-full"
          role="presentation"
          aria-hidden="true"
        />
      )}

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all ${
          isGovt
            ? "border-gray-200 bg-white/95 shadow-sm"
            : "border-white/10 bg-[#07111f]/85"
        }`}
        role="banner"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cl-accent)] rounded-lg"
            aria-label="CivicLens Core — Home"
          >
            <motion.div
              whileHover={{ rotate: 6, scale: 1.06 }}
              className={`grid h-10 w-10 place-items-center rounded-xl font-black shadow-lg transition ${
                isGovt
                  ? "bg-[#0a5c9e] text-white shadow-blue-200"
                  : "bg-cyan-400 text-slate-950 shadow-cyan-400/20"
              }`}
              aria-hidden="true"
            >
              {isGovt ? (
                <ShieldCheck size={18} />
              ) : (
                <span className="text-sm">CL</span>
              )}
            </motion.div>
            <div>
              <div
                className={`font-bold tracking-tight ${
                  isGovt ? "text-[#0d1b2a]" : ""
                }`}
              >
                CivicLens{" "}
                <span
                  className={isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}
                >
                  Core
                </span>
              </div>
              <div
                className={`text-[10px] uppercase tracking-[0.24em] ${
                  isGovt ? "text-gray-500" : "text-slate-500"
                }`}
              >
                {isGovt
                  ? "त्रिपुरा सरकार · Govt. of Tripura"
                  : "Tripura Operations"}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          {!publicSite && (
            <nav
              className="hidden items-center gap-1 md:flex"
              role="navigation"
              aria-label="Main navigation"
            >
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isGovt
                        ? active
                          ? "bg-[#0a5c9e] text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#0a5c9e]"
                        : active
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && !isGovt && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                      />
                    )}
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Govt Mode Toggle — always visible */}
            <GovtModeToggle />

            {publicSite && (
              <Link
                href="/report"
                className={`hidden rounded-xl border px-3 py-2 text-sm font-medium transition sm:inline-flex ${
                  isGovt
                    ? "border-[#0a5c9e]/30 text-[#0a5c9e] hover:bg-[#0a5c9e]/10"
                    : "border-cyan-300/20 text-cyan-200 hover:bg-cyan-300/10"
                }`}
              >
                Report an Issue
              </Link>
            )}

            {!publicSite && (
              <>
                <Link
                  href="/report"
                  className={`hidden rounded-xl border px-3 py-2 text-sm font-medium transition sm:inline-flex ${
                    isGovt
                      ? "border-gray-200 text-gray-600 hover:bg-gray-100"
                      : "border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  Report Issue
                </Link>
                <button
                  onClick={signOut}
                  className={`rounded-xl p-2 transition ${
                    isGovt
                      ? "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                  aria-label="Sign out of CivicLens Core"
                >
                  <LogOut size={18} aria-hidden="true" />
                </button>
              </>
            )}

            {/* Mobile menu button */}
            {!publicSite && (
              <button
                className={`rounded-xl p-2 transition md:hidden ${
                  isGovt
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-slate-400 hover:bg-white/10"
                }`}
                onClick={() => setMobileOpen((o) => !o)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X size={20} aria-hidden="true" />
                ) : (
                  <Menu size={20} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && !publicSite && (
            <motion.nav
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className={`overflow-hidden border-t md:hidden ${
                isGovt ? "border-gray-200 bg-white" : "border-white/10 bg-[#07111f]"
              }`}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col px-5 py-3 gap-1">
                {links.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isGovt
                          ? active
                            ? "bg-[#0a5c9e] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                          : active
                          ? "bg-white/10 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
