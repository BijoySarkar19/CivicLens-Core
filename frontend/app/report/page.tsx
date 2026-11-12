"use client";

import { FormEvent, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "@/lib/api";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useGovtMode } from "@/lib/govt-mode";
import {
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Megaphone,
  FileText,
  Camera,
  Upload,
  X,
  Compass,
  LocateFixed,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const INDIAN_DISTRICTS = [
  "Select District (Optional)",
  "Central Delhi",
  "North Delhi",
  "South Delhi",
  "Mumbai City",
  "Mumbai Suburban",
  "Bengaluru Urban",
  "Bengaluru Rural",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "West Tripura",
  "South Tripura",
  "North Tripura",
  "Kamrup Metropolitan (Guwahati)",
  "Patna",
  "Lucknow",
  "Jaipur",
  "Bhopal",
  "Ranchi",
  "Chandigarh",
  "Other / Outside Listed Districts",
];

export default function ReportPage() {
  const { isGovt } = useGovtMode();
  const [state, setState] = useState<FormState>("idle");
  const [refCode, setRefCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Photo state
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Location state
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>("");
  const [locating, setLocating] = useState<boolean>(false);
  const [district, setDistrict] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // Handle photo selection & strict 50MB limit validation
  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: Under 50MB
    if (file.size > MAX_FILE_SIZE) {
      setPhotoError(
        `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 50 MB.`
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Check file type
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
      setPhotoError(
        "Invalid file format. Please upload a photo in JPG, PNG, WEBP, or HEIC format."
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedPhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setSelectedPhoto(null);
    setPhotoPreview(null);
    setPhotoError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Handle location detection via HTML5 Geolocation API
  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser or device.");
      return;
    }
    setLocating(true);
    setLocationStatus("Locating via GPS satellite / network…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(6));
        const lng = parseFloat(pos.coords.longitude.toFixed(6));
        setLatitude(lat);
        setLongitude(lng);
        setLocationStatus(
          `Coordinates captured: ${lat}° N, ${lng}° E (accuracy ±${Math.round(pos.coords.accuracy)}m)`
        );
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationStatus("Location access was denied. Please allow location permissions in your browser or enter landmark manually.");
        } else {
          setLocationStatus("Unable to retrieve location. Please type the address or landmark below.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const payloadTitle = String(form.get("title") || "").trim();
    const payloadDesc = String(form.get("description") || "").trim();
    const payloadEmail = String(form.get("email") || "").trim();
    const payloadCategory = String(form.get("category") || "Other");
    const payloadSeverity = String(form.get("severity") || "medium");

    // Client-side sanitization check
    if (payloadTitle.length < 3) {
      setErrorMsg("Title must be at least 3 characters.");
      setState("error");
      return;
    }
    if (payloadDesc.length < 5) {
      setErrorMsg("Description must be at least 5 characters.");
      setState("error");
      return;
    }

    // Append location details to description if provided
    let fullDescription = payloadDesc;
    if (address.trim()) {
      fullDescription += `\n[Landmark / Address]: ${address.trim()}`;
    }
    if (district && district !== "Select District (Optional)") {
      fullDescription += `\n[District]: ${district}`;
    }
    if (selectedPhoto) {
      fullDescription += `\n[Attached Evidence Photo]: ${selectedPhoto.name} (${(selectedPhoto.size / (1024 * 1024)).toFixed(2)} MB verified under 50MB)`;
    }

    const payload = {
      title: payloadTitle,
      description: fullDescription,
      category: payloadCategory,
      severity: payloadSeverity,
      reporter_email: payloadEmail,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      const response = await fetch(`${API_BASE}/incidents/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail ?? "Unable to submit report");
      }

      setRefCode(data.incident_code ?? "");
      setState("success");
      removePhoto();
      setLatitude(null);
      setLongitude(null);
      setLocationStatus("");
      setAddress("");
      setDistrict("");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Unable to submit report"
      );
      setState("error");
    }
  }

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const bg = isGovt ? "bg-[#f4f7fb]" : "bg-[#07111f]";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-500" : "text-slate-400";
  const cardBg = isGovt ? "bg-white border-gray-200" : "glass border-white/8";

  return (
    <div className={`min-h-screen ${bg} transition-colors`}>
      <Header publicSite />

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2">
            <Megaphone size={20} className={accent} aria-hidden="true" />
            <p className={`text-xs uppercase tracking-[.2em] font-semibold ${accent}`}>
              {isGovt ? "नागरिक सेवा · Citizen Portal" : "Public Grievance Intake"}
            </p>
          </div>
          <h1 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-black ${headingColor}`}>
            {isGovt ? "File an Infrastructure Grievance" : "Report an Infrastructure Issue"}
          </h1>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${muteColor}`}>
            {isGovt
              ? "Official digital intake complying with GIGW 3.0 & WCAG 2.1 AA standards. Submit photo evidence (up to 50MB) and geolocation coordinates for prompt field resolution."
              : "Direct intake into the verified operational registry. Attach photo evidence under 50MB and GPS coordinates to accelerate field work orders."}
          </p>

          {/* Standards & Security badges */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${isGovt ? "border-green-200 bg-green-50 text-green-800" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"}`}>
              <ShieldCheck size={12} aria-hidden="true" />
              Anti-Tamper & 50MB Photo Upload
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${isGovt ? "border-blue-200 bg-blue-50 text-blue-800" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"}`}>
              <Compass size={12} aria-hidden="true" />
              GPS Geolocation Enabled
            </span>
          </div>
        </motion.div>

        {/* Success confirmation */}
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-8 rounded-3xl border p-8 sm:p-12 text-center shadow-xl ${
              isGovt
                ? "border-green-200 bg-green-50 shadow-green-900/5"
                : "border-emerald-400/30 bg-emerald-400/5 shadow-black/30"
            }`}
            role="status"
            aria-live="polite"
          >
            <CheckCircle2
              size={56}
              className={`mx-auto ${isGovt ? "text-green-600" : "text-emerald-400"}`}
              aria-hidden="true"
            />
            <h2
              className={`mt-4 text-2xl sm:text-3xl font-bold ${
                isGovt ? "text-green-900" : "text-emerald-200"
              }`}
            >
              Grievance Registered Successfully
            </h2>
            {refCode && (
              <div className="mt-4 inline-block rounded-2xl border border-emerald-500/30 bg-white/5 px-6 py-3">
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  Tracking Reference Code
                </span>
                <p className="mt-1 font-mono text-xl sm:text-2xl font-black text-emerald-400">
                  {refCode}
                </p>
              </div>
            )}
            <p
              className={`mx-auto mt-4 max-w-lg text-sm sm:text-base leading-6 ${
                isGovt ? "text-green-800" : "text-slate-300"
              }`}
            >
              Your submission has been securely ingested into the transactional audit queue.
              Field verification officers will inspect the location with your attached evidence.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setState("idle")}
                className={`rounded-xl px-6 py-3 text-sm sm:text-base font-bold transition shadow-lg active:scale-95 ${
                  isGovt
                    ? "bg-[#0a5c9e] text-white hover:bg-[#084d87]"
                    : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                }`}
              >
                File Another Grievance
              </button>
            </div>
          </motion.div>
        )}

        {/* Report Form */}
        {state !== "success" && (
          <form
            onSubmit={submit}
            noValidate
            aria-label="Infrastructure report form"
            className={`mt-8 rounded-3xl border p-6 sm:p-10 shadow-xl ${cardBg}`}
          >
            {state === "error" && (
              <div
                role="alert"
                aria-live="assertive"
                className={`mb-6 rounded-2xl border p-4 text-sm ${
                  isGovt
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-red-400/20 bg-red-400/10 text-red-200"
                }`}
              >
                <AlertTriangle size={16} className="inline mr-2" aria-hidden="true" />
                {errorMsg}
              </div>
            )}

            <div className="grid gap-6">
              {/* Row 1: Title & Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  name="title"
                  label="Grievance / Issue Title"
                  type="text"
                  required
                  isGovt={isGovt}
                  hint="Concise title (e.g. Major water pipeline leak on Ring Road)"
                  placeholder="e.g. Hazardous pothole near Metro Station"
                />

                <Field
                  name="email"
                  label="Contact Email"
                  type="email"
                  required
                  isGovt={isGovt}
                  hint="Used to send your status updates and reference receipt"
                  placeholder="name@example.com"
                />
              </div>

              {/* Row 2: Category & Severity */}
              <div className="grid gap-6 sm:grid-cols-2">
                <SelectField
                  name="category"
                  label="Infrastructure Category"
                  required
                  isGovt={isGovt}
                  options={[
                    { value: "Road", label: "Roadways & Pavement" },
                    { value: "Streetlight", label: "Streetlighting & Electrical" },
                    { value: "Drainage", label: "Drainage & Sewerage" },
                    { value: "Water", label: "Drinking Water Supply" },
                    { value: "Waste", label: "Municipal Solid Waste" },
                    { value: "Bridge", label: "Bridges & Flyovers" },
                    { value: "Park", label: "Public Parks & Open Spaces" },
                    { value: "Other", label: "Other Public Utility" },
                  ]}
                />

                <SelectField
                  name="severity"
                  label="Severity Level"
                  required
                  isGovt={isGovt}
                  options={[
                    { value: "low", label: "Low — Minor inconvenience" },
                    { value: "medium", label: "Medium — Affecting traffic / residents" },
                    { value: "high", label: "High — Potential hazard or property damage" },
                    { value: "critical", label: "Critical — Immediate safety / life hazard" },
                  ]}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className={`block text-sm font-semibold mb-1 ${
                    isGovt ? "text-gray-800" : "text-slate-200"
                  }`}
                >
                  Detailed Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={5}
                  rows={4}
                  className="field"
                  aria-required="true"
                  placeholder="Provide precise details of the condition, safety concerns, and any landmark indicators…"
                />
              </div>

              {/* SECTION: PHOTO UPLOAD UNDER 50MB */}
              <div className={`rounded-2xl border p-5 ${isGovt ? "bg-gray-50 border-gray-200" : "bg-white/[.02] border-white/10"}`}>
                <div className="flex items-center justify-between">
                  <label className={`text-sm font-semibold flex items-center gap-2 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                    <Camera size={16} className={accent} aria-hidden="true" />
                    Upload Photo Evidence <span className="text-xs font-normal text-gray-500">(Under 50MB)</span>
                  </label>
                  {selectedPhoto && (
                    <span className="text-xs font-mono text-emerald-400">
                      {(selectedPhoto.size / (1024 * 1024)).toFixed(2)} MB / 50 MB
                    </span>
                  )}
                </div>

                <p className={`mt-1 text-xs ${muteColor}`}>
                  Supported formats: JPG, PNG, WEBP, HEIC. Upload high-resolution site photos up to 50MB.
                </p>

                {photoError && (
                  <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    {photoError}
                  </div>
                )}

                {/* Upload Trigger / Dropzone */}
                {!photoPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 cursor-pointer transition hover:scale-[1.01] ${
                      isGovt
                        ? "border-blue-200 bg-white hover:bg-blue-50/50"
                        : "border-cyan-300/20 bg-white/[.02] hover:bg-cyan-400/5 hover:border-cyan-300/40"
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        fileInputRef.current?.click();
                      }
                    }}
                    aria-label="Click to upload or take a photo under 50 megabytes"
                  >
                    <Upload size={28} className={accent} aria-hidden="true" />
                    <p className={`mt-2 text-sm font-medium ${isGovt ? "text-gray-700" : "text-slate-200"}`}>
                      Click to choose photo or take camera snap
                    </p>
                    <span className="text-xs text-gray-500 mt-1">
                      Tap to open camera on mobile / tablet or select file on desktop / TV
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center gap-4 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt="Uploaded preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-white">
                        {selectedPhoto?.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(selectedPhoto!.size / (1024 * 1024)).toFixed(2)} MB · Ready to attach
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-red-400 transition"
                      aria-label="Remove uploaded photo"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/*"
                  capture="environment"
                  onChange={handlePhotoSelect}
                  className="hidden"
                  aria-hidden="true"
                />
              </div>

              {/* SECTION: LOCATION OPTION */}
              <div className={`rounded-2xl border p-5 ${isGovt ? "bg-gray-50 border-gray-200" : "bg-white/[.02] border-white/10"}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className={`text-sm font-semibold flex items-center gap-2 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                    <MapPin size={16} className={accent} aria-hidden="true" />
                    Location & GPS Coordinates
                  </label>

                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locating}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
                      isGovt
                        ? "border-[#0a5c9e]/40 bg-[#0a5c9e]/10 text-[#0a5c9e] hover:bg-[#0a5c9e]/20"
                        : "border-cyan-300/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20"
                    }`}
                    aria-label="Auto-detect my current GPS location"
                  >
                    <LocateFixed size={13} className={locating ? "animate-spin" : ""} aria-hidden="true" />
                    {locating ? "Acquiring GPS…" : "Detect My Location"}
                  </button>
                </div>

                {locationStatus && (
                  <p className={`mt-2 text-xs font-mono ${latitude ? "text-emerald-400" : "text-amber-400"}`}>
                    {locationStatus}
                  </p>
                )}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="district-select"
                      className={`block text-xs font-medium mb-1 ${isGovt ? "text-gray-700" : "text-slate-300"}`}
                    >
                      District / City
                    </label>
                    <select
                      id="district-select"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="field text-xs sm:text-sm"
                      aria-label="Select district"
                    >
                      {INDIAN_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="address-input"
                      className={`block text-xs font-medium mb-1 ${isGovt ? "text-gray-700" : "text-slate-300"}`}
                    >
                      Landmark / Street Address
                    </label>
                    <input
                      id="address-input"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Opposite Post Office, Sector 4"
                      className="field text-xs sm:text-sm"
                      aria-label="Street address or landmark"
                    />
                  </div>
                </div>

                {latitude != null && longitude != null && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                    <span className="badge">Lat: {latitude}</span>
                    <span className="badge">Lng: {longitude}</span>
                    <span className="text-emerald-400">✓ Spatially pinned</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state === "submitting"}
                className={`mt-2 w-full rounded-2xl py-4 px-6 text-base font-black transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isGovt
                    ? "bg-[#0a5c9e] text-white hover:bg-[#084d87] shadow-lg shadow-blue-900/20"
                    : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-slate-950 font-extrabold hover:shadow-cyan-400/25 shadow-lg"
                }`}
                aria-busy={state === "submitting"}
              >
                {state === "submitting" ? (
                  <span className="inline-flex items-center gap-2 justify-center">
                    <span className="inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                    Registering Grievance & Uploading Evidence…
                  </span>
                ) : isGovt ? (
                  "शिकायत दर्ज करें · Submit Official Grievance"
                ) : (
                  "Submit Report to Operations Command"
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  isGovt,
  hint,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  isGovt: boolean;
  hint?: string;
  placeholder?: string;
}) {
  const hintId = `${name}-hint`;
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-semibold mb-1 ${
          isGovt ? "text-gray-800" : "text-slate-200"
        }`}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="field"
        aria-required={required}
        aria-describedby={hint ? hintId : undefined}
        placeholder={placeholder}
      />
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}

function SelectField({
  name,
  label,
  required = false,
  isGovt,
  options,
}: {
  name: string;
  label: string;
  required?: boolean;
  isGovt: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-semibold mb-1 ${
          isGovt ? "text-gray-800" : "text-slate-200"
        }`}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="field"
        aria-required={required}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
