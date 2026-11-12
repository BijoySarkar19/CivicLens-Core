"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Asset } from "@/lib/types";
import { useGovtMode } from "@/lib/govt-mode";

function makeIcon(isGovt: boolean) {
  const bg = isGovt ? "#0a5c9e" : "#22d3ee";
  const border = isGovt ? "#fff" : "rgba(7,17,31,.9)";
  const shadow = isGovt
    ? "0 0 0 4px rgba(10,92,158,.22)"
    : "0 0 0 5px rgba(34,211,238,.16), 0 0 24px rgba(34,211,238,.65)";

  return L.divIcon({
    className: "civic-marker",
    html: `<span style="display:block;width:14px;height:14px;border-radius:999px;background:${bg};border:3px solid ${border};box-shadow:${shadow};"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FitBounds({ assets }: { assets: Asset[] }) {
  const map = useMap();
  const points = assets
    .filter((x) => x.latitude != null && x.longitude != null)
    .map(
      (x) => [x.latitude as number, x.longitude as number] as [number, number]
    );

  if (points.length) {
    map.fitBounds(points, { padding: [30, 30], maxZoom: 13 });
  }
  return null;
}

export function MapClient({ assets }: { assets: Asset[] }) {
  const { isGovt } = useGovtMode();
  const icon = makeIcon(isGovt);
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
        <FitBounds assets={assets} />
        {located.map((asset) => (
          <Marker
            key={asset.id}
            position={[asset.latitude as number, asset.longitude as number]}
            icon={icon}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <strong>{asset.name}</strong>
                <br />
                <span style={{ color: "#666", fontSize: 12 }}>
                  {asset.asset_code}
                </span>
                <br />
                <span style={{ fontSize: 12 }}>
                  Condition: <strong>{asset.condition}</strong>
                </span>
                {asset.district && (
                  <>
                    <br />
                    <span style={{ fontSize: 12, color: "#666" }}>
                      {asset.district}
                    </span>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
