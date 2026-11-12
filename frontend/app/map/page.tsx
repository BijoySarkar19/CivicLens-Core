"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MapPinned, Layers, Info, MapPin } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Asset, TRIPURA_SEED_ASSETS } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

const MapClient = dynamic(
  () => import("@/components/map-client").then((m) => m.MapClient),
  { ssr: false, loading: () => <div className="skeleton h-[70vh] rounded-2xl" /> }
);

export default function MapPage() {
  const [assets, setAssets] = useState<Asset[]>(TRIPURA_SEED_ASSETS);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const { isGovt } = useGovtMode();

  useEffect(() => {
    apiFetch<{ items: Asset[] }>("/assets/?limit=500")
      .then((x) => {
        if (x.items && x.items.length > 0) {
          setAssets(x.items);
        }
      })
      .catch(() => {
        setAssets(TRIPURA_SEED_ASSETS);
      });
  }, []);

  const filtered =
    selectedDistrict === "All"
      ? assets
      : assets.filter((a) => a.district === selectedDistrict);

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-400";

  return (
    <PageShell>
      <section
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        aria-label="Tripura GIS infrastructure map"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
          <div className="flex items-center gap-3">
            <MapPinned className={accent} size={24} aria-hidden="true" />
            <div>
              <p className={`text-xs uppercase tracking-[.2em] font-bold ${accent}`}>
                Tripura GIS Command Center
              </p>
              <h1 className={`text-3xl sm:text-4xl font-black ${headingColor}`}>
                Tripura Infrastructure Map
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="map-district-filter">Filter Tripura District</label>
            <select
              id="map-district-filter"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="field py-1.5 px-3 text-xs font-semibold"
            >
              <option value="All">All 8 Tripura Districts</option>
              <option value="West Tripura">West Tripura (Agartala)</option>
              <option value="Gomati">Gomati (Udaipur)</option>
              <option value="South Tripura">South Tripura (Belonia/Sabroom)</option>
              <option value="Sepahijala">Sepahijala (Bishalgarh/Melaghar)</option>
              <option value="Khowai">Khowai (Khowai/Teliamura)</option>
              <option value="Dhalai">Dhalai (Ambassa/Kamalpur)</option>
              <option value="Unakoti">Unakoti (Kailashahar)</option>
              <option value="North Tripura">North Tripura (Dharmanagar)</option>
            </select>

            <div
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs ${
                isGovt ? "border-gray-200 bg-white text-gray-700" : "border-white/10 bg-white/[.03] text-slate-300"
              }`}
            >
              <Layers size={13} aria-hidden="true" />
              {filtered.length} Pinned
            </div>
          </div>
        </div>

        <p className={`mt-2 text-sm ${muteColor}`}>
          Geolocated public assets rendered on OpenStreetMap tiles centered on Tripura. Click any pinpoint marker to inspect asset code, municipality, and condition.
        </p>

        <div className="mt-6" role="region" aria-label="Interactive map of Tripura infrastructure">
          <MapClient assets={filtered} />
        </div>

        <p className={`mt-3 text-xs ${muteColor}`}>
          OpenStreetMap contributors · Coordinates centered on Tripura State (23.83° N, 91.28° E).
        </p>
      </section>
    </PageShell>
  );
}
