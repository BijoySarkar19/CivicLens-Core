"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MapPinned, Layers, Info } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Asset } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

const MapClient = dynamic(
  () => import("@/components/map-client").then((m) => m.MapClient),
  { ssr: false, loading: () => <div className="skeleton h-[70vh] rounded-2xl" /> }
);

export default function MapPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState("");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: Asset[] }>("/assets/?limit=500")
      .then((x) => setAssets(x.items))
      .catch((e) => setError(e.message));
  }, []);

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-500";

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        aria-label="GIS infrastructure map"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <div className="flex items-center gap-3">
            <MapPinned className={accent} size={22} aria-hidden="true" />
            <div>
              <p className={`text-xs uppercase tracking-[.2em] ${muteColor}`}>
                GIS Command Center
              </p>
              <h1 className={`text-4xl font-black ${headingColor}`}>
                Infrastructure Map
              </h1>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm md:ml-auto ${
              isGovt
                ? "border-gray-200 bg-white text-gray-600"
                : "border-white/10 bg-white/[.03] text-slate-400"
            }`}
          >
            <Layers size={14} aria-hidden="true" />
            {assets.length} assets loaded
          </div>
        </div>

        <p className={`mt-3 text-sm ${muteColor}`}>
          Assets with recorded coordinates are rendered from the CivicLens API
          on OpenStreetMap tiles. Click a marker to view asset details.
        </p>

        {error && (
          <div
            role="alert"
            className={`mt-4 rounded-xl border p-3 text-sm ${
              isGovt
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-amber-300/20 bg-amber-300/10 text-amber-100"
            }`}
          >
            <Info size={13} className="inline mr-2" aria-hidden="true" />
            {error} — map will display with partial data.
          </div>
        )}

        {isGovt && (
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-2 text-blue-800">
              <span
                className="inline-block h-3 w-3 rounded-full border-2 border-white bg-[#0a5c9e]"
                aria-hidden="true"
              />
              Registered Asset
            </div>
            <div className="flex items-center gap-1.5 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700">
              Map source: OpenStreetMap contributors
            </div>
          </div>
        )}

        <div
          className="mt-7"
          role="region"
          aria-label="Interactive map of infrastructure assets"
        >
          <MapClient assets={assets} />
        </div>

        <p className={`mt-3 text-xs ${muteColor}`}>
          Map tiles © OpenStreetMap contributors. Asset positions are sourced
          from the CivicLens operational database.
        </p>
      </section>
    </PageShell>
  );
}
