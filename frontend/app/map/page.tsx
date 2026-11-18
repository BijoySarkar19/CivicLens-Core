"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPinned, Layers, Info, MapPin, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Asset, TRIPURA_SEED_ASSETS } from "@/lib/types";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

const MapClient = dynamic(
  () => import("@/components/map-client").then((m) => m.MapClient),
  { ssr: false, loading: () => <div className="skeleton h-[70vh] rounded-2xl" /> }
);

function MapPageContent() {
  const [assets, setAssets] = useState<Asset[]>(TRIPURA_SEED_ASSETS);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const { isGovt } = useGovtMode();
  const searchParams = useSearchParams();
  const rawAssetId = searchParams.get("assetId");
  const selectedAssetId = rawAssetId ? Number(rawAssetId) : null;
  const rawLat = searchParams.get("lat");
  const rawLng = searchParams.get("lng");
  const rawZoom = searchParams.get("zoom");
  const focusTitle = searchParams.get("focus") || searchParams.get("name") || searchParams.get("title");
  const districtParam = searchParams.get("district");

  const targetLocation = rawLat && rawLng
    ? {
        lat: parseFloat(rawLat),
        lng: parseFloat(rawLng),
        zoom: rawZoom ? parseInt(rawZoom, 10) : 16,
        title: focusTitle || undefined,
      }
    : null;

  useEffect(() => {
    if (districtParam) {
      setSelectedDistrict(districtParam);
    }
  }, [districtParam]);

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

  const focusedAsset = selectedAssetId
    ? assets.find((a) => a.id === selectedAssetId)
    : null;

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
        {/* Back Navigation Button */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = "/admin";
              }
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-sm ${
              isGovt
                ? "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 shadow-slate-200/50"
                : "bg-white/10 border border-white/10 text-white hover:bg-white/20"
            }`}
            title="Return to the previous screen or Admin Command Center"
          >
            <ArrowLeft size={14} /> Back to Command Center
          </button>
        </div>

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

        {focusedAsset && (
          <div className={`mt-4 rounded-xl border p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-bold ${
            isGovt ? "border-blue-300 bg-blue-50 text-blue-900" : "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
          }`}>
            <span className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
              Focusing Asset: <strong>{focusedAsset.name}</strong> ({focusedAsset.asset_code}) · {focusedAsset.district}
            </span>
            <div className="flex items-center gap-2">
              <span className="badge font-mono text-[10px] bg-red-500 text-white border-0 font-black">
                LAT {focusedAsset.latitude?.toFixed(4)}, LNG {focusedAsset.longitude?.toFixed(4)}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined" && window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = "/admin";
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-xs font-black transition"
              >
                <ArrowLeft size={13} /> Back to Dossier
              </button>
            </div>
          </div>
        )}

        {targetLocation && (
          <div className={`mt-4 rounded-xl border p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-bold ${
            isGovt ? "border-amber-400 bg-amber-50 text-amber-950" : "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
          }`}>
            <span className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
              Focusing Targeted Coordinate: <strong>{targetLocation.title || "Target Coordinate"}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="badge font-mono text-[10px] bg-cyan-500 text-slate-950 border-0 font-black">
                LAT {targetLocation.lat.toFixed(4)}, LNG {targetLocation.lng.toFixed(4)} (Zoom {targetLocation.zoom || 16})
              </span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined" && window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = "/admin";
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-xs font-black transition"
              >
                <ArrowLeft size={13} /> Back to Dossier
              </button>
            </div>
          </div>
        )}

        <p className={`mt-2 text-sm ${muteColor}`}>
          Geolocated public assets rendered on OpenStreetMap tiles centered on Tripura. Click any pinpoint marker to inspect asset code, municipality, and condition.
        </p>

        <div className="mt-6" role="region" aria-label="Interactive map of Tripura infrastructure">
          <MapClient assets={filtered} selectedAssetId={selectedAssetId} targetLocation={targetLocation} />
        </div>

        <p className={`mt-3 text-xs ${muteColor}`}>
          OpenStreetMap contributors · Coordinates centered on Tripura State (23.83° N, 91.28° E).
        </p>
      </section>
    </PageShell>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="skeleton min-h-screen" />}>
      <MapPageContent />
    </Suspense>
  );
}
