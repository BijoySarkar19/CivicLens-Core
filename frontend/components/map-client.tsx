"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Asset } from "@/lib/types";
import { useGovtMode } from "@/lib/govt-mode";

function makeIcon(isGovt: boolean, isSelected = false) {
  const bg = isSelected ? "#ef4444" : isGovt ? "#0a5c9e" : "#22d3ee";
  const border = isGovt ? "#fff" : "rgba(7,17,31,.9)";
  const shadow = isSelected
    ? "0 0 0 6px rgba(239,68,68,.3), 0 0 28px rgba(239,68,68,.8)"
    : isGovt
    ? "0 0 0 4px rgba(10,92,158,.22)"
    : "0 0 0 5px rgba(34,211,238,.16), 0 0 24px rgba(34,211,238,.65)";

  return L.divIcon({
    className: "civic-marker",
    html: `<span style="display:block;width:${isSelected ? "18px" : "14px"};height:${isSelected ? "18px" : "14px"};border-radius:999px;background:${bg};border:3px solid ${border};box-shadow:${shadow};transition:all .3s ease;"></span>`,
    iconSize: isSelected ? [22, 22] : [18, 18],
    iconAnchor: isSelected ? [11, 11] : [9, 9],
  });
}

function FitBounds({ assets, selectedAssetId }: { assets: Asset[]; selectedAssetId?: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedAssetId) {
      const match = assets.find((x) => x.id === selectedAssetId);
      if (match?.latitude && match?.longitude) {
        map.flyTo([match.latitude, match.longitude], 15, { duration: 1.5 });
        return;
      }
    }
    const points = assets
      .filter((x) => x.latitude != null && x.longitude != null)
      .map(
        (x) => [x.latitude as number, x.longitude as number] as [number, number]
      );

    if (points.length) {
      map.fitBounds(points, { padding: [30, 30], maxZoom: 13 });
    }
  }, [assets, selectedAssetId, map]);
  return null;
}

export function MapClient({
  assets,
  selectedAssetId,
}: {
  assets: Asset[];
  selectedAssetId?: number | null;
}) {
  const { isGovt } = useGovtMode();
  const defaultIcon = makeIcon(isGovt, false);
  const selectedIcon = makeIcon(isGovt, true);
  const located = assets.filter(
    (x) => x.latitude != null && x.longitude != null
  );

  return (
    <div
      className={`overflow-hidden rounded-3xl border shadow-2xl ${
        isGovt
          ? "border-gray-200 shadow-gray-200/40"
          : "border-white/10 shadow-black/20"
      }`}
      role="region"
      aria-label={`Map showing ${located.length} infrastructure assets`}
    >
      <MapContainer
        center={[23.83, 91.28]}
        zoom={7}
        scrollWheelZoom
        className="h-[68vh] w-full"
        aria-label="Infrastructure asset map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds assets={assets} selectedAssetId={selectedAssetId} />
        {located.map((asset) => {
          const isSelected = selectedAssetId === asset.id;
          return (
            <Marker
              key={asset.id}
              position={[asset.latitude as number, asset.longitude as number]}
              icon={isSelected ? selectedIcon : defaultIcon}
            >
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 4 }}>
                    {isSelected ? "📍 " : ""}{asset.name}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>
                    {asset.asset_code}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 2 }}>
                    Type: <strong>{asset.asset_type}</strong>
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 2 }}>
                    Condition: <strong style={{ textTransform: "uppercase" }}>{asset.condition}</strong>
                  </div>
                  {asset.district && (
                    <div style={{ fontSize: 12, color: "#0284c7", fontWeight: "bold", marginTop: 4 }}>
                      Tripura: {asset.district} {asset.city ? `(${asset.city})` : ""}
                    </div>
                  )}
                  {asset.source_name && (
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                      Dept: {asset.source_name}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
