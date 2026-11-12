"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { useGovtMode } from "@/lib/govt-mode";

export function PageShell({
  children,
  publicSite = false,
}: {
  children: React.ReactNode;
  publicSite?: boolean;
}) {
  const { isGovt } = useGovtMode();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isGovt
          ? "bg-[#f4f7fb] text-[#0d1b2a]"
          : "bg-[#07111f] text-slate-100"
      }`}
    >
      <Header publicSite={publicSite} />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
