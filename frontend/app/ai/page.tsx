"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Camera,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sliders,
  Compass,
  MessageSquare,
  Activity,
  Layers,
  MapPin,
  Building,
  Wrench,
  Search,
  Upload,
  RefreshCw,
  Zap,
  BarChart3,
  FileCheck,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useGovtMode } from "@/lib/govt-mode";

type AITab =
  | "risk"
  | "vision"
  | "nlp"
  | "whatif"
  | "routing"
  | "assistant"
  | "mlops";

export default function AIPage() {
  const { isGovt } = useGovtMode();
  const [activeTab, setActiveTab] = useState<AITab>("risk");

  // What-If Simulation State
  const [delayMonths, setDelayMonths] = useState(3);

  // NLP Classifier State
  const [nlpText, setNlpText] = useState(
    "Large pothole with cracked edges near Narsingarh airport school entrance after morning downpour. Speeding buses are swerving dangerously."
  );
  const [nlpResult, setNlpResult] = useState<{
    category: string;
    severity: string;
    priority: string;
    dept: string;
    team: string;
    cost: string;
    duration: string;
    confidence: number;
  }>({
    category: "Roadways & Pavement",
    severity: "Critical",
    priority: "P1",
    dept: "Tripura PWD (Roads Division)",
    team: "Road Repair Squad B",
    cost: "₹48,000 – ₹62,000",
    duration: "24 – 48 Hours",
    confidence: 0.942,
  });

  // Computer Vision State
  const [selectedDamageSample, setSelectedDamageSample] = useState(0);

  // Natural Language Assistant State
  const [chatQuery, setChatQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "user" | "ai"; text: string; sources?: string[] }[]
  >([
    {
      sender: "ai",
      text: "Namaskar! I am the CivicLens AI Operations Assistant. Ask me anything about Tripura's 25 infrastructure assets, 90-day predictive failure risk, inspection logs, or department allocations.",
      sources: ["Tripura PWD & Smart City Knowledge Base v2.1"],
    },
  ]);

  const accent = isGovt ? "text-[#0a5c9e]" : "text-cyan-300";
  const cardBg = isGovt ? "bg-white border-gray-200 shadow-sm" : "glass border-white/8";
  const headingColor = isGovt ? "text-[#0d1b2a]" : "text-white";
  const muteColor = isGovt ? "text-gray-600" : "text-slate-400";

  const tabs: { id: AITab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "risk", label: "Risk & Failure Prediction", icon: TrendingUp },
    { id: "vision", label: "Computer Vision & Damage", icon: Camera },
    { id: "nlp", label: "NLP & Duplicate Clustering", icon: Brain },
    { id: "whatif", label: "What-If Simulator", icon: Sliders },
    { id: "routing", label: "Resource & Route Optimization", icon: Compass },
    { id: "assistant", label: "Natural-Language Assistant", icon: MessageSquare },
    { id: "mlops", label: "MLOps & Model Monitoring", icon: Activity },
  ];

  const damageSamples = [
    {
      name: "Highway Asphalt Pothole (MBB Airport Road)",
      type: "Pothole",
      confidence: "94.2%",
      depth: "12.5 cm",
      area: "0.85 m²",
      severity: "High",
      conditionScore: "42 / 100 (Poor)",
      action: "Cold milling and rapid-curing bitumen compaction within 48h.",
    },
    {
      name: "Concrete Girder Shear Crack (Gomati River Bridge)",
      type: "Structural Crack",
      confidence: "91.8%",
      depth: "4.2 mm width",
      area: "1.4 m linear",
      severity: "Medium",
      conditionScore: "58 / 100 (Fair)",
      action: "Epoxy pressure injection and ultrasonic load re-testing.",
    },
    {
      name: "Silt Choking at Heritage Staircase (Unakoti Site)",
      type: "Drainage Erosion",
      confidence: "88.6%",
      depth: "28 cm silt",
      area: "4.5 m² channel",
      severity: "Critical",
      conditionScore: "35 / 100 (Critical)",
      action: "Manual silt desnagging & diversion retaining wall installation.",
    },
  ];

  const handleRunNlp = (text: string) => {
    setNlpText(text);
    const lower = text.toLowerCase();
    if (lower.includes("light") || lower.includes("dark") || lower.includes("wire") || lower.includes("lamp")) {
      setNlpResult({
        category: "Streetlights & Electricity (TSECL)",
        severity: "High",
        priority: "P2",
        dept: "Tripura State Electricity Corp (TSECL)",
        team: "Electrical Squad 2",
        cost: "₹18,000 – ₹26,000",
        duration: "24 Hours",
        confidence: 0.951,
      });
    } else if (lower.includes("water") || lower.includes("pipe") || lower.includes("leak") || lower.includes("tap")) {
      setNlpResult({
        category: "Drinking Water Supply (DWS)",
        severity: "Critical",
        priority: "P1",
        dept: "Drinking Water & Sanitation Directorate",
        team: "DWS Rapid Pipe Team",
        cost: "₹38,000 – ₹55,000",
        duration: "12 Hours",
        confidence: 0.963,
      });
    } else {
      setNlpResult({
        category: "Roadways & Pavement (PWD)",
        severity: "Critical",
        priority: "P1",
        dept: "Tripura PWD (Roads Division)",
        team: "Road Repair Squad B",
        cost: "₹48,000 – ₹62,000",
        duration: "24 – 48 Hours",
        confidence: 0.942,
      });
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    const userQ = chatQuery.trim();
    setChatQuery("");

    setChatMessages((prev) => [...prev, { sender: "user", text: userQ }]);

    setTimeout(() => {
      const q = userQ.toLowerCase();
      let response = "";
      let sources = ["PostGIS Spatial Database", "CivicLens AI v2.1"];

      if (q.includes("ward") || q.includes("risk") || q.includes("highest")) {
        response =
          "Dhalai District (Ambassa NH-8 Culvert corridor) and West Tripura Ward 8 (Howrah Embankment) have the highest 90-day risk ratings (89% and 84%), primarily due to monsoon runoff saturation and multi-axle truck transit.";
        sources = ["TR-DHL-002", "TR-WTR-004", "Monsoon Precipitation Index 2026"];
      } else if (q.includes("tourist") || q.includes("palace") || q.includes("temple")) {
        response =
          "CivicLens currently monitors 9 major Tripura tourist destinations: Ujjayanta Palace, Neermahal Water Palace, Unakoti Rock Carvings, Matabari, Jampui Hills, Chabimura Canyon, Pilak Buddhist Site, Sepahijala Sanctuary, and Dumboor Lake. All have verified structural telemetry active.";
        sources = ["Tripura Tourism Development Corp (TTDCL)"];
      } else if (q.includes("uninspected") || q.includes("months") || q.includes("inspect")) {
        response =
          "2 assets have not had a physical field inspection in over 90 days: TR-KHW-002 (Khowai Flood Wall) and TR-STH-003 (Belonia Municipal Drainage). AI recommends scheduling immediate inspections.";
        sources = ["TR-KHW-002", "TR-STH-003"];
      } else {
        response =
          `For '${userQ}', the platform is tracking 25 Tripura infrastructure assets across all 8 districts. 3 open critical work orders are currently active with an average resolution SLA of 28.4 hours. Overall network health is 84%.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: response, sources },
      ]);
    }, 500);
  };

  // What-If Dynamic Calculations
  const currentRiskAssets = 6;
  const projectedRiskAssets = Math.min(25, Math.round(currentRiskAssets * (1 + delayMonths * 0.28)));
  const baseCostLakhs = 8.5;
  const projectedCostLakhs = (baseCostLakhs * (1 + delayMonths * 0.42)).toFixed(2);
  const additionalCostLakhs = (Number(projectedCostLakhs) - baseCostLakhs).toFixed(2);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8" aria-label="CivicLens AI Suite">
        {/* Banner Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6 border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="badge text-xs font-black uppercase tracking-wider text-cyan-300 border-cyan-400/30 bg-cyan-400/10">
                Integrated Predictive Intelligence
              </span>
              <span className="text-xs text-gray-400 font-mono">v2.1-TRIPURA</span>
            </div>
            <h1 className={`text-3xl font-black mt-2 sm:text-4xl ${headingColor}`}>
              Predictive Infrastructure Intelligence
            </h1>
            <p className={`mt-1 text-sm max-w-3xl ${muteColor}`}>
              Full operational predictive intelligence for Tripura municipal infrastructure — 90-day risk forecasting, computer vision damage classification, duplicate grievance clustering, what-if budget simulation, and field route optimization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                isGovt ? "border-gray-300 text-gray-700 hover:bg-gray-100" : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              ← Back to Admin Panel
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav
          className={`mt-6 flex gap-1.5 overflow-x-auto rounded-2xl border p-1.5 ${
            isGovt ? "border-gray-200 bg-gray-100/70" : "border-white/10 bg-white/[.02]"
          }`}
          role="tablist"
        >
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(t.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                  isGovt
                    ? active
                      ? "bg-[#0a5c9e] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200/60"
                    : active
                    ? "bg-cyan-400 text-slate-950 shadow-md font-black"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <t.icon size={15} aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Tab Contents */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {/* 1. RISK & FAILURE PREDICTION */}
            {activeTab === "risk" && (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        AI Infrastructure Risk &amp; 90-Day Failure Prediction
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        Model inputs: Asset age, condition history, incident frequency, rainfall exposure, and traffic density.
                      </p>
                    </div>
                    <span className="badge text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 border-emerald-400/30">
                      Predictive Model: XGBoost + Temporal Transformer v2.1
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Card 1 */}
                    <div className={`rounded-2xl border p-5 ${
                      isGovt ? "border-red-300 bg-red-50/70 shadow-sm" : "border-red-500/20 bg-red-500/5"
                    }`}>
                      <div className="flex items-start justify-between">
                        <span className={`font-mono text-xs font-bold ${isGovt ? "text-red-700" : "text-red-400"}`}>TR-DHL-002</span>
                        <span className={`badge text-[10px] font-bold uppercase ${
                          isGovt ? "text-red-800 border-red-300 bg-red-100" : "text-red-400 border-red-500/30 bg-red-500/10"
                        }`}>
                          Critical Risk
                        </span>
                      </div>
                      <h3 className={`font-bold text-sm mt-2 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                        Ambassa Hill Road Highway Culvert (NH-8)
                      </h3>
                      <p className={`text-xs mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>
                        Dhalai District · National Highway 8
                      </p>

                      <div className={`mt-4 grid grid-cols-2 gap-2 rounded-xl p-3 text-center ${
                        isGovt ? "bg-white border border-gray-200 shadow-xs" : "bg-black/20"
                      }`}>
                        <div>
                          <p className={`text-[11px] ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Current Risk</p>
                          <p className={`text-xl font-black mt-0.5 ${isGovt ? "text-amber-700" : "text-amber-400"}`}>78%</p>
                        </div>
                        <div>
                          <p className={`text-[11px] ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Predicted 90-Day</p>
                          <p className={`text-xl font-black mt-0.5 ${isGovt ? "text-red-700" : "text-red-400"}`}>89%</p>
                        </div>
                      </div>

                      <div className={`mt-4 border-t pt-3 ${isGovt ? "border-red-200" : "border-white/5"}`}>
                        <p className={`text-xs font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>
                          Explainable AI (XAI) Attribution:
                        </p>
                        <div className={`mt-2 space-y-1 text-[11px] ${isGovt ? "text-gray-800 font-medium" : "text-gray-300"}`}>
                          <div className="flex justify-between">
                            <span>Infrastructure Age &amp; Weathering</span>
                            <strong className={isGovt ? "text-red-700 font-bold" : "text-red-400"}>+24%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Monsoon Rainfall Saturation</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+22%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Recent Incident Frequency</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+19%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Deteriorating Inspection Score</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+18%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Heavy Multi-Axle Freight</span>
                            <strong className={isGovt ? "text-gray-600 font-bold" : "text-slate-400"}>+17%</strong>
                          </div>
                        </div>
                      </div>

                      <div className={`mt-4 rounded-xl p-3 text-xs ${
                        isGovt ? "bg-blue-50 border border-blue-200 text-blue-900 font-semibold shadow-xs" : "bg-cyan-400/10 border border-cyan-400/20 text-cyan-200"
                      }`}>
                        <strong>AI Recommendation:</strong> Schedule preventive culvert base underpinning within 7 days.
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className={`rounded-2xl border p-5 ${
                      isGovt ? "border-amber-300 bg-amber-50/70 shadow-sm" : "border-amber-500/20 bg-amber-500/5"
                    }`}>
                      <div className="flex items-start justify-between">
                        <span className={`font-mono text-xs font-bold ${isGovt ? "text-amber-700" : "text-amber-400"}`}>TR-WTR-005</span>
                        <span className={`badge text-[10px] font-bold uppercase ${
                          isGovt ? "text-amber-800 border-amber-300 bg-amber-100" : "text-amber-400 border-amber-500/30 bg-amber-500/10"
                        }`}>
                          High Risk
                        </span>
                      </div>
                      <h3 className={`font-bold text-sm mt-2 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                        MBB Airport 4-Lane Approach Road
                      </h3>
                      <p className={`text-xs mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>
                        West Tripura · Agartala Transit Corridor
                      </p>

                      <div className={`mt-4 grid grid-cols-2 gap-2 rounded-xl p-3 text-center ${
                        isGovt ? "bg-white border border-gray-200 shadow-xs" : "bg-black/20"
                      }`}>
                        <div>
                          <p className={`text-[11px] ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Current Risk</p>
                          <p className={`text-xl font-black mt-0.5 ${isGovt ? "text-amber-700" : "text-amber-400"}`}>62%</p>
                        </div>
                        <div>
                          <p className={`text-[11px] ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Predicted 90-Day</p>
                          <p className={`text-xl font-black mt-0.5 ${isGovt ? "text-red-700" : "text-red-400"}`}>81%</p>
                        </div>
                      </div>

                      <div className={`mt-4 border-t pt-3 ${isGovt ? "border-amber-200" : "border-white/5"}`}>
                        <p className={`text-xs font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>
                          Explainable AI (XAI) Attribution:
                        </p>
                        <div className={`mt-2 space-y-1 text-[11px] ${isGovt ? "text-gray-800 font-medium" : "text-gray-300"}`}>
                          <div className="flex justify-between">
                            <span>Peak Airport Traffic Volume</span>
                            <strong className={isGovt ? "text-red-700 font-bold" : "text-red-400"}>+28%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Monsoon Sub-base Saturation</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+23%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Surface Pothole History</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+21%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Maintenance Overdue by 4w</span>
                            <strong className={isGovt ? "text-gray-600 font-bold" : "text-slate-400"}>+16%</strong>
                          </div>
                        </div>
                      </div>

                      <div className={`mt-4 rounded-xl p-3 text-xs ${
                        isGovt ? "bg-blue-50 border border-blue-200 text-blue-900 font-semibold shadow-xs" : "bg-cyan-400/10 border border-cyan-400/20 text-cyan-200"
                      }`}>
                        <strong>AI Recommendation:</strong> Deploy Road Repair Squad B for surface milling within 48h.
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className={`rounded-2xl border p-5 ${
                      isGovt ? "border-amber-300 bg-amber-50/70 shadow-sm" : "border-amber-500/20 bg-amber-500/5"
                    }`}>
                      <div className="flex items-start justify-between">
                        <span className={`font-mono text-xs font-bold ${isGovt ? "text-amber-700" : "text-amber-400"}`}>TR-KHW-002</span>
                        <span className={`badge text-[10px] font-bold uppercase ${
                          isGovt ? "text-amber-800 border-amber-300 bg-amber-100" : "text-amber-400 border-amber-500/30 bg-amber-500/10"
                        }`}>
                          High Risk
                        </span>
                      </div>
                      <h3 className={`font-bold text-sm mt-2 ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                        Khowai River Flood Embankment Wall
                      </h3>
                      <p className={`text-xs mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>
                        Khowai District · River Border Basin
                      </p>

                      <div className={`mt-4 grid grid-cols-2 gap-2 rounded-xl p-3 text-center ${
                        isGovt ? "bg-white border border-gray-200 shadow-xs" : "bg-black/20"
                      }`}>
                        <div>
                          <p className={`text-[11px] ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Current Risk</p>
                          <p className={`text-xl font-black mt-0.5 ${isGovt ? "text-amber-700" : "text-amber-400"}`}>68%</p>
                        </div>
                        <div>
                          <p className={`text-[11px] ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Predicted 90-Day</p>
                          <p className={`text-xl font-black mt-0.5 ${isGovt ? "text-red-700" : "text-red-400"}`}>84%</p>
                        </div>
                      </div>

                      <div className={`mt-4 border-t pt-3 ${isGovt ? "border-amber-200" : "border-white/5"}`}>
                        <p className={`text-xs font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>
                          Explainable AI (XAI) Attribution:
                        </p>
                        <div className={`mt-2 space-y-1 text-[11px] ${isGovt ? "text-gray-800 font-medium" : "text-gray-300"}`}>
                          <div className="flex justify-between">
                            <span>River Bank Soil Silt Erosion</span>
                            <strong className={isGovt ? "text-red-700 font-bold" : "text-red-400"}>+31%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Upstream Flash Flood Inflow</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+25%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Embankment Structure Age</span>
                            <strong className={isGovt ? "text-amber-700 font-bold" : "text-amber-400"}>+18%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Vegetation Root Intrusion</span>
                            <strong className={isGovt ? "text-gray-600 font-bold" : "text-slate-400"}>+14%</strong>
                          </div>
                        </div>
                      </div>

                      <div className={`mt-4 rounded-xl p-3 text-xs ${
                        isGovt ? "bg-blue-50 border border-blue-200 text-blue-900 font-semibold shadow-xs" : "bg-cyan-400/10 border border-cyan-400/20 text-cyan-200"
                      }`}>
                        <strong>AI Recommendation:</strong> Deploy emergency boulder riprap at toe scour locations.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. COMPUTER VISION */}
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        Computer Vision Damage Classifier &amp; Severity Estimator
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        Automated inference replacing manual inspector subjectivity: Image → CV Detection → Severity Estimation → Condition Score Impact.
                      </p>
                    </div>
                    <span className="badge text-xs font-mono font-bold text-cyan-300 border-cyan-400/30 bg-cyan-400/10">
                      Architecture: ResNet-50 Feature Extractor + YOLOv8 Detection Head
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-12">
                    {/* Visual detection mockup */}
                    <div className={`lg:col-span-7 rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between min-h-[340px] ${
                      isGovt ? "border-gray-300 bg-gray-100 text-gray-900 shadow-sm" : "border-white/10 bg-black/40 text-white"
                    }`}>
                      <div className="flex items-center justify-between z-10 text-xs">
                        <span className={`badge font-mono text-[11px] ${
                          isGovt ? "bg-white border-gray-300 text-gray-800 shadow-xs font-bold" : "bg-black/60 text-emerald-300"
                        }`}>
                          Frame: 1080p RGB Telemetry
                        </span>
                        <span className={`badge font-mono text-[11px] ${
                          isGovt ? "bg-white border-gray-300 text-[#0a5c9e] shadow-xs font-bold" : "bg-black/60 text-cyan-300"
                        }`}>
                          Inference: 18.4 ms
                        </span>
                      </div>

                      {/* Mockup Canvas with Bounding Box */}
                      <div className="my-6 relative flex items-center justify-center">
                        <div className="w-full max-w-md h-52 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 relative flex items-center justify-center p-4">
                          {/* Asphalt road pattern */}
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                          {/* Bounding Box 1 */}
                          <div className="absolute left-1/4 top-1/4 w-48 h-28 border-2 border-red-400 rounded-lg bg-red-500/10 flex flex-col justify-between p-2 animate-pulse">
                            <span className="text-[10px] font-black uppercase text-white bg-red-500 px-1.5 py-0.5 rounded self-start">
                              {damageSamples[selectedDamageSample].type} · {damageSamples[selectedDamageSample].confidence}
                            </span>
                            <span className="text-[9px] font-mono text-red-200 self-end">
                              Depth: {damageSamples[selectedDamageSample].depth}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selectable Samples */}
                      <div className="z-10 grid grid-cols-3 gap-2">
                        {damageSamples.map((s, idx) => (
                          <button
                            key={s.name}
                            onClick={() => setSelectedDamageSample(idx)}
                            className={`rounded-xl border p-2.5 text-left text-xs transition ${
                              selectedDamageSample === idx
                                ? isGovt
                                  ? "border-[#0a5c9e] bg-[#0a5c9e] text-white font-bold shadow-md ring-2 ring-[#0a5c9e]/20"
                                  : "border-cyan-400 bg-cyan-400/20 text-white font-bold"
                                : isGovt
                                ? "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-bold shadow-xs"
                                : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            <p className={`truncate font-bold ${
                              selectedDamageSample === idx
                                ? "text-white"
                                : isGovt
                                ? "text-gray-900"
                                : "text-slate-200"
                            }`}>
                              {s.type}
                            </p>
                            <span className={`text-[10px] font-semibold ${
                              selectedDamageSample === idx
                                ? isGovt
                                  ? "text-blue-100"
                                  : "text-cyan-200"
                                : isGovt
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}>
                              {s.confidence} Conf.
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CV Telemetry Output */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className={`rounded-2xl border p-5 space-y-3 ${
                        isGovt ? "border-gray-200 bg-white shadow-sm" : "border-white/10 bg-white/5"
                      }`}>
                        <h4 className={`text-sm font-bold flex items-center gap-2 ${
                          isGovt ? "text-gray-900" : "text-white"
                        }`}>
                          <CheckCircle2 size={16} className={isGovt ? "text-emerald-700" : "text-emerald-400"} />
                          Live CV Telemetry Output
                        </h4>

                        <div className="space-y-2 text-xs">
                          <div className={`flex justify-between border-b pb-1 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}>Classified Defect:</span>
                            <strong className={isGovt ? "text-[#0a5c9e] font-extrabold" : "text-cyan-300"}>{damageSamples[selectedDamageSample].type}</strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}>Model Confidence:</span>
                            <strong className={isGovt ? "text-emerald-700 font-extrabold" : "text-emerald-400"}>{damageSamples[selectedDamageSample].confidence}</strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}>Estimated Depth:</span>
                            <strong className={isGovt ? "text-gray-900 font-extrabold" : "text-white"}>{damageSamples[selectedDamageSample].depth}</strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}>Affected Surface Area:</span>
                            <strong className={isGovt ? "text-gray-900 font-extrabold" : "text-white"}>{damageSamples[selectedDamageSample].area}</strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}>Calculated Condition Score:</span>
                            <strong className={isGovt ? "text-amber-700 font-extrabold" : "text-amber-400"}>{damageSamples[selectedDamageSample].conditionScore}</strong>
                          </div>
                        </div>

                        <div className={`rounded-xl border p-3 text-xs mt-3 ${
                          isGovt ? "border-blue-200 bg-blue-50 text-blue-900 font-semibold shadow-xs" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                        }`}>
                          <p className="font-bold">Automated Protocol Recommendation:</p>
                          <p className="mt-1">{damageSamples[selectedDamageSample].action}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. NLP & CLUSTERING */}
            {activeTab === "nlp" && (
              <motion.div
                key="nlp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        Automatic Incident Classification &amp; Duplicate Clustering
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        NLP extracts Category, Severity, and Priority P1-P4 from raw complaints, and groups 30 citizen calls into 1 clustered case.
                      </p>
                    </div>
                  </div>

                  {/* Preset prompts */}
                  <div className="mt-6 flex flex-wrap gap-2 text-xs">
                    <span className={`self-center font-bold ${isGovt ? "text-gray-700" : "text-gray-400"}`}>Try Sample Grievances:</span>
                    <button
                      onClick={() => handleRunNlp("Large pothole with cracked edges near Narsingarh airport school entrance after morning downpour. Speeding buses are swerving dangerously.")}
                      className={`rounded-lg border px-3 py-1.5 transition ${
                        isGovt ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold shadow-xs" : "border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      Pothole near Airport Road
                    </button>
                    <button
                      onClick={() => handleRunNlp("Ten decorative streetlights completely dark along northern Ujjayanta Palace lake garden due to sparking underground junction box.")}
                      className={`rounded-lg border px-3 py-1.5 transition ${
                        isGovt ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold shadow-xs" : "border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      Dark Streetlights at Palace
                    </button>
                    <button
                      onClick={() => handleRunNlp("High pressure drinking water distribution pipe burst flooding pedestrian queue walkway at Matabari temple in Udaipur.")}
                      className={`rounded-lg border px-3 py-1.5 transition ${
                        isGovt ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold shadow-xs" : "border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      Water Pipe Burst at Matabari
                    </button>
                  </div>

                  {/* Textarea */}
                  <div className="mt-4">
                    <textarea
                      value={nlpText}
                      onChange={(e) => handleRunNlp(e.target.value)}
                      rows={3}
                      className={`w-full rounded-2xl border p-4 text-sm outline-none transition ${
                        isGovt
                          ? "border-gray-300 bg-white text-gray-900 focus:border-[#0a5c9e] focus:ring-2 focus:ring-[#0a5c9e]/20"
                          : "border-white/10 bg-[#0b1726] text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      }`}
                      placeholder="Type or paste any citizen complaint text…"
                    />
                  </div>

                  {/* Classification Output Grid */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className={`rounded-2xl border p-4 ${isGovt ? "border-gray-200 bg-gray-50/80 shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Classified Category</p>
                      <h4 className={`text-base font-black mt-1 ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>{nlpResult.category}</h4>
                      <p className={`text-[11px] mt-0.5 font-mono ${isGovt ? "text-gray-600" : "text-gray-500"}`}>Confidence: {(nlpResult.confidence * 100).toFixed(1)}%</p>
                    </div>

                    <div className={`rounded-2xl border p-4 ${isGovt ? "border-gray-200 bg-gray-50/80 shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Severity &amp; Priority</p>
                      <h4 className={`text-base font-black mt-1 ${isGovt ? "text-red-700" : "text-red-400"}`}>
                        {nlpResult.severity} · <span className={`px-2 py-0.5 rounded text-xs ${isGovt ? "bg-red-100 text-red-800" : "bg-red-500/20 text-red-200"}`}>{nlpResult.priority}</span>
                      </h4>
                      <p className={`text-[11px] mt-0.5 font-mono ${isGovt ? "text-gray-600" : "text-gray-500"}`}>Automated Decision</p>
                    </div>

                    <div className={`rounded-2xl border p-4 ${isGovt ? "border-gray-200 bg-gray-50/80 shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Assigned Department</p>
                      <h4 className={`text-sm font-bold mt-1 ${isGovt ? "text-gray-900" : "text-white"}`}>{nlpResult.dept}</h4>
                      <p className={`text-[11px] mt-0.5 font-semibold ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>→ {nlpResult.team}</p>
                    </div>

                    <div className={`rounded-2xl border p-4 ${isGovt ? "border-gray-200 bg-gray-50/80 shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Est. Repair Cost &amp; Duration</p>
                      <h4 className={`text-base font-black mt-1 ${isGovt ? "text-amber-800" : "text-amber-300"}`}>{nlpResult.cost}</h4>
                      <p className={`text-[11px] mt-0.5 font-mono ${isGovt ? "text-gray-600" : "text-gray-400"}`}>SLA: {nlpResult.duration}</p>
                    </div>
                  </div>

                  {/* Duplicate Detection Showcase (Module 26) */}
                  <div className={`mt-6 rounded-2xl border p-5 ${
                    isGovt ? "border-blue-200 bg-blue-50/70 shadow-xs" : "border-blue-400/20 bg-blue-400/5"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Layers size={18} className={isGovt ? "text-[#0a5c9e]" : "text-blue-400"} />
                      <h4 className={`text-sm font-bold ${isGovt ? "text-[#0d1b2a]" : "text-white"}`}>
                        Duplicate Grievance Spatial-Semantic Clustering
                      </h4>
                    </div>
                    <p className={`text-xs mt-1 ${isGovt ? "text-gray-700 font-medium" : "text-gray-300"}`}>
                      Instead of creating 4 independent tickets for the same physical pothole at Narsingarh junction:
                    </p>

                    <div className="mt-3 grid gap-2 sm:grid-cols-4 text-xs font-mono">
                      <div className={`rounded-xl border p-2.5 ${isGovt ? "border-gray-300 bg-white shadow-xs" : "border-white/10 bg-black/30"}`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>#INC-1021</span>
                        <p className={`text-[11px] truncate mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>Pothole near school</p>
                      </div>
                      <div className={`rounded-xl border p-2.5 ${isGovt ? "border-gray-300 bg-white shadow-xs" : "border-white/10 bg-black/30"}`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>#INC-1034</span>
                        <p className={`text-[11px] truncate mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>Deep road hole Narsingarh</p>
                      </div>
                      <div className={`rounded-xl border p-2.5 ${isGovt ? "border-gray-300 bg-white shadow-xs" : "border-white/10 bg-black/30"}`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>#INC-1047</span>
                        <p className={`text-[11px] truncate mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>Asphalt broken at junction</p>
                      </div>
                      <div className={`rounded-xl border p-2.5 ${
                        isGovt ? "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-xs" : "border-emerald-400/40 bg-emerald-500/10"
                      }`}>
                        <span className={`font-bold ${isGovt ? "text-emerald-800" : "text-emerald-400"}`}>✓ Master Clustered</span>
                        <p className={`text-[11px] truncate mt-1 font-semibold ${isGovt ? "text-emerald-900" : "text-emerald-200"}`}>1 Single Work Order</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. WHAT-IF SIMULATOR */}
            {activeTab === "whatif" && (
              <motion.div
                key="whatif"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        What-If Strategic Scenario Simulation
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        Simulate the compounding consequences of deferring municipal maintenance across Tripura.
                      </p>
                    </div>
                    <span className={`badge text-xs font-mono font-bold ${
                      isGovt ? "text-amber-800 border-amber-300 bg-amber-50" : "text-amber-300 border-amber-400/30 bg-amber-400/10"
                    }`}>
                      Monte Carlo Risk Projection Model
                    </span>
                  </div>

                  {/* Slider Control */}
                  <div className={`mt-8 rounded-2xl border p-6 ${
                    isGovt ? "border-gray-200 bg-gray-50/80 shadow-xs" : "border-white/10 bg-white/5"
                  }`}>
                    <div className="flex items-center justify-between">
                      <label className={`text-sm font-bold flex items-center gap-2 ${isGovt ? "text-gray-900" : "text-white"}`}>
                        <Sliders size={16} className={isGovt ? "text-[#0a5c9e]" : "text-cyan-300"} />
                        Simulate Maintenance Deferral Period:
                      </label>
                      <span className={`text-lg font-black px-3 py-1 rounded-xl ${
                        isGovt ? "bg-[#0a5c9e]/15 text-[#0a5c9e]" : "text-cyan-300 bg-cyan-400/10"
                      }`}>
                        {delayMonths} {delayMonths === 1 ? "Month" : "Months"} Delay
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={delayMonths}
                      onChange={(e) => setDelayMonths(Number(e.target.value))}
                      className="mt-4 w-full h-2 bg-slate-400/30 rounded-lg appearance-none cursor-pointer accent-[#0a5c9e]"
                    />

                    <div className={`flex justify-between text-[11px] font-mono mt-2 ${isGovt ? "text-gray-600 font-semibold" : "text-gray-500"}`}>
                      <span>1 Month (Minimal Drift)</span>
                      <span>3 Months (Seasonal Monsoon)</span>
                      <span>6 Months (Severe Degradation)</span>
                      <span>12 Months (Catastrophic)</span>
                    </div>
                  </div>

                  {/* Impact Results */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Current High-Risk Assets</p>
                      <h4 className={`text-3xl font-black mt-1 ${isGovt ? "text-gray-900" : "text-white"}`}>{currentRiskAssets} Assets</h4>
                      <p className={`text-[11px] mt-1 font-semibold ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>Active Baseline</p>
                    </div>

                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-red-300 bg-red-50/70 shadow-xs" : "border-red-500/20 bg-red-500/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>After {delayMonths} Months Delay</p>
                      <h4 className={`text-3xl font-black mt-1 ${isGovt ? "text-red-700" : "text-red-400"}`}>{projectedRiskAssets} Assets</h4>
                      <p className={`text-[11px] mt-1 font-semibold ${isGovt ? "text-red-800" : "text-red-300"}`}>+{projectedRiskAssets - currentRiskAssets} Additional Assets at Risk</p>
                    </div>

                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Immediate Repair Cost</p>
                      <h4 className={`text-3xl font-black mt-1 ${isGovt ? "text-gray-900" : "text-white"}`}>₹{baseCostLakhs} Lakhs</h4>
                      <p className={`text-[11px] mt-1 font-mono ${isGovt ? "text-gray-600" : "text-gray-400"}`}>Present Estimate</p>
                    </div>

                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-amber-300 bg-amber-50/70 shadow-xs" : "border-amber-500/20 bg-amber-500/5"}`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Deferred Repair Cost</p>
                      <h4 className={`text-3xl font-black mt-1 ${isGovt ? "text-amber-800" : "text-amber-400"}`}>₹{projectedCostLakhs} Lakhs</h4>
                      <p className={`text-[11px] mt-1 font-semibold ${isGovt ? "text-amber-900" : "text-amber-300"}`}>+₹{additionalCostLakhs} Lakhs Penalty (+{Math.round((Number(additionalCostLakhs) / baseCostLakhs) * 100)}%)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. RESOURCE & ROUTE OPTIMIZATION */}
            {activeTab === "routing" && (
              <motion.div
                key="routing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        Resource Allocation &amp; Field Route Optimization
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        Automated Vehicle Routing Problem (VRP) solver scheduling 5 maintenance squads across Tripura to minimize fuel and satisfy SLAs.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>Team A (PWD Roads)</span>
                        <span className={`badge text-[10px] font-bold ${isGovt ? "text-emerald-800 bg-emerald-100 border-emerald-300" : "text-emerald-400 bg-emerald-400/10"}`}>Active</span>
                      </div>
                      <h4 className={`font-bold text-sm mt-2 ${isGovt ? "text-gray-900" : "text-white"}`}>West Tripura &amp; Sepahijala Route</h4>
                      <p className={`text-xs mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>Vehicle: PWD Heavy Paver #TR-01-E-4421</p>

                      <div className={`mt-4 space-y-2 border-t pt-3 text-xs ${isGovt ? "border-gray-200 text-gray-800 font-medium" : "border-white/5 text-slate-200"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-[#0a5c9e]/15 text-[#0a5c9e]" : "bg-cyan-400/20 text-cyan-300"
                          }`}>1</span>
                          <span>MBB Airport Approach Road (P1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-[#0a5c9e]/15 text-[#0a5c9e]" : "bg-cyan-400/20 text-cyan-300"
                          }`}>2</span>
                          <span>Battala Drainage Culvert (P2)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-[#0a5c9e]/15 text-[#0a5c9e]" : "bg-cyan-400/20 text-cyan-300"
                          }`}>3</span>
                          <span>Neermahal Jetty Timber Pier (P2)</span>
                        </div>
                      </div>

                      <div className={`mt-4 flex justify-between text-[11px] font-mono border-t pt-2 ${
                        isGovt ? "border-gray-200 text-gray-600 font-semibold" : "border-white/5 text-gray-400"
                      }`}>
                        <span>Optimized Distance: 48.2 km</span>
                        <span className={`font-bold ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>-22% Fuel Saved</span>
                      </div>
                    </div>

                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold ${isGovt ? "text-amber-800" : "text-amber-300"}`}>Team B (DWS Water)</span>
                        <span className={`badge text-[10px] font-bold ${isGovt ? "text-emerald-800 bg-emerald-100 border-emerald-300" : "text-emerald-400 bg-emerald-400/10"}`}>Active</span>
                      </div>
                      <h4 className={`font-bold text-sm mt-2 ${isGovt ? "text-gray-900" : "text-white"}`}>Gomati &amp; South Tripura Route</h4>
                      <p className={`text-xs mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>Vehicle: DWS Pipe Van #TR-03-A-1102</p>

                      <div className={`mt-4 space-y-2 border-t pt-3 text-xs ${isGovt ? "border-gray-200 text-gray-800 font-medium" : "border-white/5 text-slate-200"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-amber-100 text-amber-800" : "bg-amber-400/20 text-amber-300"
                          }`}>1</span>
                          <span>Matabari Temple Concourse Main Pipe (P1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-amber-100 text-amber-800" : "bg-amber-400/20 text-amber-300"
                          }`}>2</span>
                          <span>Amarpur Water Pumping Intake (P2)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-amber-100 text-amber-800" : "bg-amber-400/20 text-amber-300"
                          }`}>3</span>
                          <span>Belonia Town Drain Sluice (P2)</span>
                        </div>
                      </div>

                      <div className={`mt-4 flex justify-between text-[11px] font-mono border-t pt-2 ${
                        isGovt ? "border-gray-200 text-gray-600 font-semibold" : "border-white/5 text-gray-400"
                      }`}>
                        <span>Optimized Distance: 64.5 km</span>
                        <span className={`font-bold ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>-18% Fuel Saved</span>
                      </div>
                    </div>

                    <div className={`rounded-2xl border p-5 ${isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold ${isGovt ? "text-purple-800" : "text-purple-300"}`}>Team C (Highways)</span>
                        <span className={`badge text-[10px] font-bold ${isGovt ? "text-emerald-800 bg-emerald-100 border-emerald-300" : "text-emerald-400 bg-emerald-400/10"}`}>Active</span>
                      </div>
                      <h4 className={`font-bold text-sm mt-2 ${isGovt ? "text-gray-900" : "text-white"}`}>Dhalai, Khowai &amp; North Corridor</h4>
                      <p className={`text-xs mt-1 ${isGovt ? "text-gray-600 font-medium" : "text-gray-400"}`}>Vehicle: Emergency Rig #TR-02-B-9981</p>

                      <div className={`mt-4 space-y-2 border-t pt-3 text-xs ${isGovt ? "border-gray-200 text-gray-800 font-medium" : "border-white/5 text-slate-200"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-purple-100 text-purple-800" : "bg-purple-400/20 text-purple-300"
                          }`}>1</span>
                          <span>Ambassa Hill Culvert Retaining Wall (P1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-purple-100 text-purple-800" : "bg-purple-400/20 text-purple-300"
                          }`}>2</span>
                          <span>Khowai River Embankment Riprap (P1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full grid place-items-center font-bold text-[10px] ${
                            isGovt ? "bg-purple-100 text-purple-800" : "bg-purple-400/20 text-purple-300"
                          }`}>3</span>
                          <span>Unakoti Silt Drainage Staircase (P1)</span>
                        </div>
                      </div>

                      <div className={`mt-4 flex justify-between text-[11px] font-mono border-t pt-2 ${
                        isGovt ? "border-gray-200 text-gray-600 font-semibold" : "border-white/5 text-gray-400"
                      }`}>
                        <span>Optimized Distance: 88.0 km</span>
                        <span className={`font-bold ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>-26% Fuel Saved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. NL ANALYTICS ASSISTANT */}
            {activeTab === "assistant" && (
              <motion.div
                key="assistant"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  <div className={`flex items-center justify-between border-b pb-4 ${isGovt ? "border-gray-200" : "border-white/10"}`}>
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        Natural-Language Analytics Assistant
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        Query operational databases, predictive models, and asset registries using conversational plain text.
                      </p>
                    </div>
                    <span className={`badge text-xs font-mono font-bold ${
                      isGovt ? "text-[#0a5c9e] border-blue-200 bg-blue-50" : "text-cyan-300 border-cyan-400/30 bg-cyan-400/10"
                    }`}>
                      Tripura Municipal LLM v2.1
                    </span>
                  </div>

                  {/* Chat Stream */}
                  <div className="my-6 space-y-4 max-h-[380px] overflow-y-auto pr-2">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${
                          msg.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? isGovt
                                ? "bg-[#0a5c9e] text-white font-semibold shadow-md"
                                : "bg-cyan-400 text-slate-950 font-bold"
                              : isGovt
                              ? "bg-gray-100 text-gray-900 border border-gray-200 shadow-xs font-medium"
                              : "bg-white/5 text-slate-100 border border-white/10"
                          }`}
                        >
                          <p>{msg.text}</p>
                          {msg.sources && (
                            <div className={`mt-2 flex flex-wrap gap-1 border-t pt-2 text-[10px] font-mono ${
                              isGovt ? "border-gray-200 text-gray-600" : "border-white/10 text-gray-400"
                            }`}>
                              <span>Verified Sources:</span>
                              {msg.sources.map((s) => (
                                <span key={s} className={`px-1.5 py-0.5 rounded font-bold ${
                                  isGovt ? "bg-white border border-gray-300 text-[#0a5c9e]" : "bg-black/20 text-cyan-300"
                                }`}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Preset prompt buttons */}
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <button
                      type="button"
                      onClick={() => setChatQuery("Which wards have the highest road-maintenance risk?")}
                      className={`rounded-lg border px-2.5 py-1.5 transition ${
                        isGovt ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold shadow-xs" : "border-white/10 bg-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      &ldquo;Which wards have highest risk?&rdquo;
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatQuery("Show high-risk roads that haven't been inspected in 90 days")}
                      className={`rounded-lg border px-2.5 py-1.5 transition ${
                        isGovt ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold shadow-xs" : "border-white/10 bg-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      &ldquo;Uninspected roads over 90 days?&rdquo;
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatQuery("What is the status of tourist spots in Tripura?")}
                      className={`rounded-lg border px-2.5 py-1.5 transition ${
                        isGovt ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-semibold shadow-xs" : "border-white/10 bg-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      &ldquo;Status of tourist destinations?&rdquo;
                    </button>
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      type="text"
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      placeholder="Ask the AI Assistant about Tripura infrastructure, predictions, or budgets…"
                      className={`flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition ${
                        isGovt
                          ? "border-gray-300 bg-white text-gray-900 focus:border-[#0a5c9e] focus:ring-2 focus:ring-[#0a5c9e]/20"
                          : "border-white/10 bg-[#0b1726] text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      }`}
                    />
                    <button
                      type="submit"
                      className={`rounded-xl px-6 py-3 text-sm font-black transition active:scale-95 ${
                        isGovt
                          ? "bg-[#0a5c9e] text-white hover:bg-[#084b82] shadow-md"
                          : "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-400/20"
                      }`}
                    >
                      Ask AI →
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* 7. MLOPS & MODEL MONITORING */}
            {activeTab === "mlops" && (
              <motion.div
                key="mlops"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-black ${headingColor}`}>
                        MLOps Model Versioning, Drift &amp; Retraining Pipeline
                      </h2>
                      <p className={`text-xs mt-1 ${muteColor}`}>
                        Academic and enterprise-grade telemetry: continuous model evaluation, precision/recall tracking, and data drift monitoring.
                      </p>
                    </div>
                    <span className={`badge text-xs font-mono font-bold ${
                      isGovt ? "text-emerald-800 border-emerald-300 bg-emerald-50" : "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
                    }`}>
                      Model Status: Healthy · Zero Drift Anomalies
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className={`rounded-2xl border p-4 text-center ${
                      isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"
                    }`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Current Model Version</p>
                      <h4 className={`text-2xl font-black mt-1 ${isGovt ? "text-gray-900" : "text-white"}`}>Model v2.1</h4>
                      <p className={`text-[11px] font-mono mt-0.5 ${isGovt ? "text-[#0a5c9e] font-bold" : "text-cyan-300"}`}>Deployed: Nov 2026</p>
                    </div>

                    <div className={`rounded-2xl border p-4 text-center ${
                      isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"
                    }`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Overall F1 Score</p>
                      <h4 className={`text-2xl font-black mt-1 ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>0.901</h4>
                      <p className={`text-[11px] font-mono mt-0.5 ${isGovt ? "text-gray-600" : "text-gray-400"}`}>Precision: 0.918 · Recall: 0.886</p>
                    </div>

                    <div className={`rounded-2xl border p-4 text-center ${
                      isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"
                    }`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Data Drift Score (PSI)</p>
                      <h4 className={`text-2xl font-black mt-1 ${isGovt ? "text-emerald-700" : "text-emerald-400"}`}>0.028</h4>
                      <p className={`text-[11px] font-semibold mt-0.5 ${isGovt ? "text-emerald-800" : "text-emerald-300"}`}>&lt; 0.10 Threshold (Stable)</p>
                    </div>

                    <div className={`rounded-2xl border p-4 text-center ${
                      isGovt ? "border-gray-200 bg-white shadow-xs" : "border-white/10 bg-white/5"
                    }`}>
                      <p className={`text-xs ${isGovt ? "text-gray-600 font-semibold" : "text-gray-400"}`}>Inference Latency</p>
                      <h4 className={`text-2xl font-black mt-1 ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>18.4 ms</h4>
                      <p className={`text-[11px] font-mono mt-0.5 ${isGovt ? "text-gray-600" : "text-gray-400"}`}>P99: 28.1 ms</p>
                    </div>
                  </div>

                  {/* Retraining Pipeline Diagram */}
                  <div className={`mt-6 rounded-2xl border p-5 ${
                    isGovt ? "border-gray-200 bg-gray-50/80 shadow-xs" : "border-white/10 bg-black/30"
                  }`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isGovt ? "text-gray-700" : "text-gray-400"}`}>
                      Continuous Learning &amp; Controlled Retraining Pipeline
                    </h4>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className={`rounded-xl border px-3 py-2 text-center ${
                        isGovt ? "border-gray-300 bg-white text-gray-900 shadow-xs" : "border-white/10 bg-white/5"
                      }`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>1. Verified Data</span>
                        <p className={`text-[10px] ${isGovt ? "text-gray-600" : "text-gray-400"}`}>Grievances &amp; Inspections</p>
                      </div>
                      <ArrowRight size={14} className={isGovt ? "text-gray-400 hidden sm:block" : "text-gray-600 hidden sm:block"} />
                      <div className={`rounded-xl border px-3 py-2 text-center ${
                        isGovt ? "border-gray-300 bg-white text-gray-900 shadow-xs" : "border-white/10 bg-white/5"
                      }`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>2. Data Validation</span>
                        <p className={`text-[10px] ${isGovt ? "text-gray-600" : "text-gray-400"}`}>Great Expectations</p>
                      </div>
                      <ArrowRight size={14} className={isGovt ? "text-gray-400 hidden sm:block" : "text-gray-600 hidden sm:block"} />
                      <div className={`rounded-xl border px-3 py-2 text-center ${
                        isGovt ? "border-gray-300 bg-white text-gray-900 shadow-xs" : "border-white/10 bg-white/5"
                      }`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>3. Feature Store</span>
                        <p className={`text-[10px] ${isGovt ? "text-gray-600" : "text-gray-400"}`}>Feast Feature Vector</p>
                      </div>
                      <ArrowRight size={14} className={isGovt ? "text-gray-400 hidden sm:block" : "text-gray-600 hidden sm:block"} />
                      <div className={`rounded-xl border px-3 py-2 text-center ${
                        isGovt ? "border-gray-300 bg-white text-gray-900 shadow-xs" : "border-white/10 bg-white/5"
                      }`}>
                        <span className={`font-bold ${isGovt ? "text-[#0a5c9e]" : "text-cyan-300"}`}>4. Retraining</span>
                        <p className={`text-[10px] ${isGovt ? "text-gray-600" : "text-gray-400"}`}>PyTorch + XGBoost</p>
                      </div>
                      <ArrowRight size={14} className={isGovt ? "text-gray-400 hidden sm:block" : "text-gray-600 hidden sm:block"} />
                      <div className={`rounded-xl border px-3 py-2 text-center ${
                        isGovt ? "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-xs" : "border-emerald-400/30 bg-emerald-500/10"
                      }`}>
                        <span className={`font-bold ${isGovt ? "text-emerald-800" : "text-emerald-400"}`}>5. Production Gate</span>
                        <p className={`text-[10px] ${isGovt ? "text-emerald-700" : "text-emerald-300"}`}>Model Registry (v2.1)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  );
}
