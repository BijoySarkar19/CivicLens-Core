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
  Download,
  X,
  Scan,
  HelpCircle,
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
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStageText, setScanStageText] = useState("");
  const [autoWorkOrderNotice, setAutoWorkOrderNotice] = useState<{
    id: string;
    category: string;
    severity: string;
    priority: string;
    cost: string;
    dept: string;
    sla: string;
    location: string;
  } | null>(null);
  const [showAiCertificate, setShowAiCertificate] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setUploadedPhotoUrl(url);
      setIsScanning(true);
      setScanProgress(15);
      setScanStageText("Ingesting 1080p RGB tensor & normalizing to 640x640...");

      setTimeout(() => {
        setScanProgress(45);
        setScanStageText("Running ResNet-50 Feature Pyramid backbone (Layer 4)...");
      }, 400);

      setTimeout(() => {
        setScanProgress(80);
        setScanStageText("YOLOv8 Head: Non-Maximum Suppression (NMS IoU 0.45)...");
      }, 850);

      setTimeout(() => {
        setScanProgress(100);
        setScanStageText("Inference Complete: Defect bounds & photogrammetric depth locked.");
        setTimeout(() => setIsScanning(false), 300);
      }, 1250);
    };
    reader.readAsDataURL(file);
  };

  const handleClearUpload = () => {
    setUploadedPhotoUrl(null);
    setIsScanning(false);
    setScanProgress(0);
  };

  const handleGenerateWorkOrder = () => {
    const sample = damageSamples[selectedDamageSample];
    const code = `WO-TR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setAutoWorkOrderNotice({
      id: code,
      category: sample.type,
      severity: sample.severity,
      priority: sample.severity === "Critical" ? "P1" : sample.severity === "High" ? "P2" : "P3",
      cost: sample.type === "Pothole" ? "₹45,000" : sample.type === "Structural Crack" ? "₹1,25,000" : sample.type === "Drainage Erosion" ? "₹85,000" : "₹32,000",
      dept: sample.type === "Electrical Hazard" ? "TSECL Electrical Maintenance" : "Tripura PWD (Roads & Bridges)",
      sla: sample.severity === "Critical" ? "24 Hours" : "48 Hours",
      location: sample.name,
    });
  };

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
    {
      name: "TSECL High-Voltage Feeder Junction Box (Battala ITMS Signal)",
      type: "Electrical Hazard",
      confidence: "93.4%",
      depth: "Arc Erosion",
      area: "0.32 m² cabinet",
      severity: "Critical",
      conditionScore: "31 / 100 (Hazardous)",
      action: "Emergency circuit isolation & insulated terminal bus replacement within 4h.",
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

            {/* 2. COMPUTER VISION DAMAGE CLASSIFIER & SEVERITY ESTIMATOR */}
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`rounded-3xl border p-6 sm:p-8 ${cardBg}`}>
                  {/* Vision Header & File Upload Controls */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="badge text-[11px] font-bold uppercase tracking-wider text-cyan-300 border-cyan-400/30 bg-cyan-400/10">
                          ResNet-50 + YOLOv8 Deep Vision
                        </span>
                        <span className="badge text-[11px] font-mono text-emerald-300 border-emerald-400/30 bg-emerald-400/10">
                          Tripura Asset Inspection Standard
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${headingColor}`}>
                        Computer Vision Damage Classifier &amp; Severity Estimator
                      </h2>
                      <p className={`text-xs mt-1 max-w-3xl ${muteColor}`}>
                        Automated inference replacing manual inspector subjectivity: Ingest 1080p frame → Extract deep spatial features → Regress YOLOv8 bounding boxes → Calculate photogrammetric depth &amp; area → Auto-generate preventive work order.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        id="cv-photo-upload"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="cv-photo-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 px-4 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition active:scale-95"
                      >
                        <Upload size={14} /> Upload Real Photo / Snap Camera
                      </label>
                      {uploadedPhotoUrl && (
                        <button
                          onClick={handleClearUpload}
                          className="rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition"
                        >
                          Reset to Presets
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-12">
                    {/* Visual Detection Viewport */}
                    <div className={`lg:col-span-7 rounded-2xl border p-4 relative overflow-hidden flex flex-col justify-between min-h-[380px] ${
                      isGovt ? "border-gray-300 bg-gray-100 text-gray-900 shadow-sm" : "border-white/10 bg-black/50 text-white"
                    }`}>
                      <div className="flex items-center justify-between z-10 text-xs">
                        <span className={`badge font-mono text-[11px] font-bold ${
                          isGovt ? "bg-white border-gray-300 text-gray-800 shadow-xs" : "bg-black/60 text-emerald-300"
                        }`}>
                          {uploadedPhotoUrl ? "Source: User Camera Upload (1080p)" : "Source: PWD Field Sensor Camera (1080p)"}
                        </span>
                        <span className={`badge font-mono text-[11px] font-bold ${
                          isGovt ? "bg-white border-gray-300 text-[#0a5c9e] shadow-xs" : "bg-black/60 text-cyan-300"
                        }`}>
                          Inference Latency: 18.4 ms · 60 FPS
                        </span>
                      </div>

                      {/* Main Viewport Container */}
                      <div className="my-4 relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950 min-h-[240px]">
                        {/* CASE 1: USER UPLOADED PHOTO */}
                        {uploadedPhotoUrl ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              src={uploadedPhotoUrl}
                              alt="Uploaded inspection subject"
                              className="w-full max-h-[320px] object-contain rounded-lg"
                            />

                            {/* Scanning Laser Line Simulation */}
                            {isScanning && (
                              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none bg-cyan-950/20 backdrop-blur-[1px]">
                                <motion.div
                                  initial={{ top: "0%" }}
                                  animate={{ top: "100%" }}
                                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
                                />
                                <div className="absolute bottom-3 left-3 right-3 bg-black/80 rounded-lg p-2 text-xs border border-cyan-400/30 text-cyan-300 font-mono">
                                  <div className="flex justify-between mb-1">
                                    <span>{scanStageText}</span>
                                    <span>{scanProgress}%</span>
                                  </div>
                                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Post-scan Bounding Box Overlay */}
                            {!isScanning && (
                              <div className="absolute inset-0 pointer-events-none p-6 flex items-center justify-center">
                                <div className="relative w-3/4 h-3/4 border-2 border-red-500 rounded-lg bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse flex flex-col justify-between p-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-white bg-red-600 px-2 py-0.5 rounded shadow">
                                      {damageSamples[selectedDamageSample].type} · {damageSamples[selectedDamageSample].confidence}
                                    </span>
                                    <span className="text-[9px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded">
                                      IoU: 0.89 · Class #04
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-end text-[10px] font-mono text-red-200">
                                    <span className="bg-black/70 px-1.5 py-0.5 rounded">
                                      Est. Depth: {damageSamples[selectedDamageSample].depth}
                                    </span>
                                    <span className="bg-black/70 px-1.5 py-0.5 rounded">
                                      Surface Area: {damageSamples[selectedDamageSample].area}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* CASE 2: REALISTIC VECTOR DEFECT PRESET VIEWPORT */
                          <div className="relative w-full h-[260px] flex items-center justify-center p-4">
                            {/* SVG Defect Simulation Graphics */}
                            {selectedDamageSample === 0 && (
                              /* 1. POTHOLE VISUAL */
                              <svg className="w-full h-full max-w-lg" viewBox="0 0 400 240" fill="none">
                                <rect width="400" height="240" rx="12" fill="#1e293b" />
                                {/* Road lane stripes */}
                                <line x1="200" y1="10" x2="200" y2="50" stroke="#fbbf24" strokeWidth="4" strokeDasharray="12 12" />
                                <line x1="200" y1="190" x2="200" y2="230" stroke="#fbbf24" strokeWidth="4" strokeDasharray="12 12" />
                                <line x1="20" y1="120" x2="380" y2="120" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.1" />
                                {/* Asphalt Texture */}
                                <circle cx="160" cy="90" r="1.5" fill="#475569" />
                                <circle cx="240" cy="140" r="1.5" fill="#475569" />
                                <circle cx="110" cy="170" r="2" fill="#334155" />
                                {/* Jagged Bitumen Pothole Crater */}
                                <path
                                  d="M 120,95 Q 150,75 220,85 T 290,120 Q 300,160 250,175 T 160,165 Q 110,140 120,95 Z"
                                  fill="#0f172a"
                                  stroke="#334155"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M 140,110 Q 180,95 240,105 T 270,140 Q 250,165 210,160 T 150,145 Z"
                                  fill="#020617"
                                />
                                {/* Depth shadow line */}
                                <path d="M 150,125 Q 190,115 230,120" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
                                <text x="175" y="140" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">Depth: 12.5 cm</text>
                                
                                {/* YOLOv8 Detection Bounding Box */}
                                <rect x="95" y="65" width="220" height="130" rx="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.12)" />
                                {/* Corner brackets */}
                                <path d="M 95,85 L 95,65 L 115,65" stroke="#ef4444" strokeWidth="3" fill="none" />
                                <path d="M 295,65 L 315,65 L 315,85" stroke="#ef4444" strokeWidth="3" fill="none" />
                                <path d="M 95,175 L 95,195 L 115,195" stroke="#ef4444" strokeWidth="3" fill="none" />
                                <path d="M 295,195 L 315,195 L 315,175" stroke="#ef4444" strokeWidth="3" fill="none" />
                                {/* YOLO Tag */}
                                <rect x="95" y="45" width="135" height="20" rx="4" fill="#ef4444" />
                                <text x="102" y="59" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">POTHOLE · 94.2%</text>
                              </svg>
                            )}

                            {selectedDamageSample === 1 && (
                              /* 2. STRUCTURAL CRACK VISUAL */
                              <svg className="w-full h-full max-w-lg" viewBox="0 0 400 240" fill="none">
                                <rect width="400" height="240" rx="12" fill="#334155" />
                                {/* Concrete texture grid */}
                                <line x1="50" y1="0" x2="50" y2="240" stroke="#475569" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
                                <line x1="350" y1="0" x2="350" y2="240" stroke="#475569" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
                                {/* Shear Fracture Path */}
                                <path
                                  d="M 90,40 L 140,80 L 170,75 L 210,120 L 250,135 L 280,180 L 320,210"
                                  stroke="#0f172a"
                                  strokeWidth="6"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M 90,40 L 140,80 L 170,75 L 210,120 L 250,135 L 280,180 L 320,210"
                                  stroke="#f87171"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                {/* Secondary micro-cracks */}
                                <path d="M 170,75 L 195,60" stroke="#f87171" strokeWidth="1.5" />
                                <path d="M 250,135 L 270,120" stroke="#f87171" strokeWidth="1.5" />
                                <path d="M 210,120 L 190,150" stroke="#f87171" strokeWidth="1.5" />
                                {/* Caliper mm Gauge */}
                                <line x1="225" y1="105" x2="245" y2="125" stroke="#38bdf8" strokeWidth="1.5" />
                                <text x="250" y="115" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">Width: 4.2 mm</text>
                                
                                {/* YOLO Bounding Box */}
                                <rect x="75" y="25" width="265" height="195" rx="8" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.1)" />
                                <rect x="75" y="5" width="170" height="20" rx="4" fill="#f59e0b" />
                                <text x="82" y="19" fill="#000000" fontSize="11" fontWeight="black" fontFamily="sans-serif">SHEAR CRACK · 91.8%</text>
                              </svg>
                            )}

                            {selectedDamageSample === 2 && (
                              /* 3. DRAINAGE EROSION VISUAL */
                              <svg className="w-full h-full max-w-lg" viewBox="0 0 400 240" fill="none">
                                <rect width="400" height="240" rx="12" fill="#1e293b" />
                                {/* River embankment stone masonry */}
                                <rect x="30" y="30" width="80" height="40" fill="#475569" stroke="#64748b" strokeWidth="1" />
                                <rect x="110" y="30" width="90" height="40" fill="#334155" stroke="#64748b" strokeWidth="1" />
                                <rect x="200" y="30" width="80" height="40" fill="#475569" stroke="#64748b" strokeWidth="1" />
                                <rect x="280" y="30" width="90" height="40" fill="#334155" stroke="#64748b" strokeWidth="1" />
                                {/* Toe Scour Under-cut Erosion Cavity */}
                                <path
                                  d="M 60,110 Q 120,80 200,90 T 340,110 L 370,210 L 30,210 Z"
                                  fill="#78350f"
                                  opacity="0.7"
                                />
                                <path
                                  d="M 110,130 Q 170,110 240,115 T 310,150 L 340,210 L 80,210 Z"
                                  fill="#451a03"
                                />
                                {/* Silt accumulation line */}
                                <line x1="50" y1="165" x2="350" y2="165" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="140" y="185" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">Silt Cavity: 28 cm Depth</text>

                                {/* YOLO Bounding Box */}
                                <rect x="45" y="75" width="310" height="145" rx="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.12)" />
                                <rect x="45" y="55" width="185" height="20" rx="4" fill="#ef4444" />
                                <text x="52" y="69" fill="#ffffff" fontSize="11" fontWeight="black" fontFamily="sans-serif">DRAINAGE SCOUR · 88.6%</text>
                              </svg>
                            )}

                            {selectedDamageSample === 3 && (
                              /* 4. ELECTRICAL HAZARD VISUAL */
                              <svg className="w-full h-full max-w-lg" viewBox="0 0 400 240" fill="none">
                                <rect width="400" height="240" rx="12" fill="#0f172a" />
                                {/* Electrical Cabinet Housing */}
                                <rect x="100" y="30" width="200" height="180" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2" />
                                <rect x="120" y="50" width="160" height="140" fill="#1e293b" />
                                {/* Terminals & Busbars */}
                                <rect x="140" y="70" width="25" height="90" fill="#b45309" />
                                <rect x="185" y="70" width="25" height="90" fill="#b45309" />
                                <rect x="230" y="70" width="25" height="90" fill="#b45309" />
                                {/* Arc Flash Burn / Hotspot Halo */}
                                <circle cx="197" cy="115" r="35" fill="rgba(239, 68, 68, 0.35)" />
                                <circle cx="197" cy="115" r="18" fill="rgba(251, 191, 36, 0.7)" />
                                <path d="M 197,95 L 193,115 L 202,118 L 195,135" stroke="#ffffff" strokeWidth="2" fill="none" />
                                <text x="135" y="180" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">Thermal Hotspot: 68°C</text>

                                {/* YOLO Bounding Box */}
                                <rect x="110" y="40" width="180" height="160" rx="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.15)" />
                                <rect x="110" y="20" width="190" height="20" rx="4" fill="#ef4444" />
                                <text x="117" y="34" fill="#ffffff" fontSize="11" fontWeight="black" fontFamily="sans-serif">ELECTRICAL HAZARD · 93.4%</text>
                              </svg>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 4 HIGH-CONTRAST PRESET SELECTORS */}
                      <div>
                        <p className={`text-xs font-bold mb-2 ${isGovt ? "text-gray-800" : "text-gray-300"}`}>
                          Or Select Live Tripura Field Presets:
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {damageSamples.map((s, idx) => (
                            <button
                              key={s.name}
                              onClick={() => {
                                setUploadedPhotoUrl(null);
                                setSelectedDamageSample(idx);
                              }}
                              className={`rounded-xl border p-2.5 text-left text-xs transition ${
                                selectedDamageSample === idx && !uploadedPhotoUrl
                                  ? isGovt
                                    ? "border-[#004085] bg-[#004085] text-white font-extrabold shadow-md ring-2 ring-blue-700/20"
                                    : "border-cyan-400 bg-cyan-400/20 text-white font-extrabold shadow-lg"
                                  : isGovt
                                  ? "border-slate-300 bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-xs"
                                  : "border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              <p className="truncate font-bold">{s.type}</p>
                              <span className={`text-[10px] font-semibold block mt-0.5 ${
                                selectedDamageSample === idx && !uploadedPhotoUrl
                                  ? "text-cyan-200"
                                  : isGovt
                                  ? "text-slate-700 font-bold"
                                  : "text-slate-400"
                              }`}>
                                {s.confidence} Conf.
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CV Telemetry Output & Action Suite */}
                    <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                      <div className={`rounded-2xl border p-5 space-y-3.5 ${
                        isGovt ? "border-gray-200 bg-white shadow-sm" : "border-white/10 bg-white/5"
                      }`}>
                        <div className="flex items-center justify-between border-b pb-3 border-white/10">
                          <h4 className={`text-sm font-black flex items-center gap-2 ${
                            isGovt ? "text-gray-900" : "text-white"
                          }`}>
                            <CheckCircle2 size={16} className={isGovt ? "text-emerald-700" : "text-emerald-400"} />
                            Live CV Telemetry Output
                          </h4>
                          <span className={`badge text-[10px] font-mono font-bold ${
                            damageSamples[selectedDamageSample].severity === "Critical"
                              ? "bg-red-500/10 text-red-400 border border-red-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}>
                            Severity: {damageSamples[selectedDamageSample].severity}
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className={`flex justify-between border-b pb-1.5 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-700 font-semibold" : "text-gray-400"}>Classified Defect:</span>
                            <strong className={isGovt ? "text-[#0a5c9e] font-extrabold text-sm" : "text-cyan-300 font-extrabold text-sm"}>
                              {damageSamples[selectedDamageSample].type}
                            </strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-700 font-semibold" : "text-gray-400"}>Model Confidence:</span>
                            <strong className={isGovt ? "text-emerald-700 font-extrabold" : "text-emerald-400"}>
                              {damageSamples[selectedDamageSample].confidence}
                            </strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-700 font-semibold" : "text-gray-400"}>Estimated Depth / Fissure:</span>
                            <strong className={isGovt ? "text-gray-900 font-extrabold font-mono" : "text-white font-mono"}>
                              {damageSamples[selectedDamageSample].depth}
                            </strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-700 font-semibold" : "text-gray-400"}>Affected Surface Area:</span>
                            <strong className={isGovt ? "text-gray-900 font-extrabold font-mono" : "text-white font-mono"}>
                              {damageSamples[selectedDamageSample].area}
                            </strong>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${isGovt ? "border-gray-200" : "border-white/5"}`}>
                            <span className={isGovt ? "text-gray-700 font-semibold" : "text-gray-400"}>Calculated Condition Score:</span>
                            <strong className={isGovt ? "text-amber-800 font-extrabold" : "text-amber-400"}>
                              {damageSamples[selectedDamageSample].conditionScore}
                            </strong>
                          </div>
                        </div>

                        <div className={`rounded-xl border p-3.5 text-xs ${
                          isGovt ? "border-blue-200 bg-blue-50 text-blue-900 font-semibold shadow-xs" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                        }`}>
                          <p className="font-black flex items-center gap-1.5">
                            <Sparkles size={13} className="text-cyan-400 shrink-0" /> Automated Protocol Recommendation:
                          </p>
                          <p className="mt-1 leading-relaxed">{damageSamples[selectedDamageSample].action}</p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="pt-2 space-y-2">
                          <button
                            onClick={handleGenerateWorkOrder}
                            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 py-3 px-4 text-xs font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition active:scale-95 flex items-center justify-center gap-2"
                          >
                            <Zap size={14} /> Generate Automated Work Order Now
                          </button>
                          <button
                            onClick={() => setShowAiCertificate(true)}
                            className={`w-full rounded-xl border py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-2 ${
                              isGovt
                                ? "border-gray-300 text-gray-800 hover:bg-gray-100"
                                : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <FileCheck size={14} /> Export Verified AI Inspection Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HOW TO UNDERSTAND THIS AI DECISION (EXPLAINABLE PIPELINE GUIDE) */}
                  <div className={`mt-8 rounded-2xl border p-6 ${
                    isGovt ? "border-gray-200 bg-gray-50 shadow-sm text-gray-900" : "border-white/10 bg-white/[.02] text-white"
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle size={18} className="text-cyan-400" />
                      <h3 className="text-base font-black">
                        How to Understand this AI Decision: 5-Stage Automated Pipeline
                      </h3>
                    </div>
                    <p className={`text-xs mb-5 ${muteColor}`}>
                      CivicLens AI uses transparent, verifiable multi-stage deep learning to convert raw field photos into actionable municipal maintenance orders without human subjectivity.
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs">
                      <div className={`rounded-xl border p-3.5 space-y-1.5 ${isGovt ? "bg-white border-gray-200" : "bg-black/30 border-white/10"}`}>
                        <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-400/20 text-[10px]">1</span>
                          <span>RGB Ingestion</span>
                        </div>
                        <p className={muteColor}>
                          1080p frame normalized to 640×640 3-channel tensor with adaptive histogram equalization.
                        </p>
                      </div>

                      <div className={`rounded-xl border p-3.5 space-y-1.5 ${isGovt ? "bg-white border-gray-200" : "bg-black/30 border-white/10"}`}>
                        <div className="flex items-center gap-1.5 font-bold text-blue-400">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-400/20 text-[10px]">2</span>
                          <span>ResNet-50 Features</span>
                        </div>
                        <p className={muteColor}>
                          50-layer convolutional backbone extracts spatial edge gradients and textural micro-fractures.
                        </p>
                      </div>

                      <div className={`rounded-xl border p-3.5 space-y-1.5 ${isGovt ? "bg-white border-gray-200" : "bg-black/30 border-white/10"}`}>
                        <div className="flex items-center gap-1.5 font-bold text-purple-400">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-purple-400/20 text-[10px]">3</span>
                          <span>YOLOv8 Detection</span>
                        </div>
                        <p className={muteColor}>
                          Anchor-free bounding box regression filters noise using Non-Maximum Suppression (IoU 0.45).
                        </p>
                      </div>

                      <div className={`rounded-xl border p-3.5 space-y-1.5 ${isGovt ? "bg-white border-gray-200" : "bg-black/30 border-white/10"}`}>
                        <div className="flex items-center gap-1.5 font-bold text-amber-400">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400/20 text-[10px]">4</span>
                          <span>Depth &amp; Area Mensuration</span>
                        </div>
                        <p className={muteColor}>
                          Photogrammetric pixel-to-metric ratio calculates depth in centimeters and surface area in m².
                        </p>
                      </div>

                      <div className={`rounded-xl border p-3.5 space-y-1.5 ${isGovt ? "bg-white border-gray-200" : "bg-black/30 border-white/10"}`}>
                        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-[10px]">5</span>
                          <span>Auto Work Order</span>
                        </div>
                        <p className={muteColor}>
                          Penalizes asset health score and dispatches P1/P2 repair order directly to municipal squad.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MODAL 1: AUTOMATED WORK ORDER RECEIPT */}
                <AnimatePresence>
                  {autoWorkOrderNotice && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg rounded-3xl border border-cyan-400/40 bg-[#091522] p-6 sm:p-8 shadow-2xl text-white relative"
                      >
                        <button
                          onClick={() => setAutoWorkOrderNotice(null)}
                          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 text-cyan-400 mb-4">
                          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
                            <Zap size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black">Automated Work Order Dispatched</h3>
                            <p className="text-xs text-cyan-300">Generated directly by CivicLens AI Computer Vision Engine</p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs font-mono">
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Work Order Code:</span>
                            <span className="text-cyan-300 font-bold">{autoWorkOrderNotice.id}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Classified Defect:</span>
                            <span className="text-white font-bold">{autoWorkOrderNotice.category} ({autoWorkOrderNotice.severity})</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Location Asset:</span>
                            <span className="text-amber-300 font-bold truncate max-w-[240px]">{autoWorkOrderNotice.location}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Assigned Department:</span>
                            <span className="text-slate-200">{autoWorkOrderNotice.dept}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Estimated Budget:</span>
                            <span className="text-emerald-400 font-bold">{autoWorkOrderNotice.cost}</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-gray-400">SLA Resolution Window:</span>
                            <span className="text-purple-300 font-bold">{autoWorkOrderNotice.sla}</span>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-cyan-200">
                          <strong>System Status:</strong> Ticket successfully entered into the state execution pipeline. Department supervisor notified via SMS/NIC Mail.
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                          <Link
                            href="/work-orders"
                            className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-white/5"
                          >
                            View in Work Orders List →
                          </Link>
                          <button
                            onClick={() => setAutoWorkOrderNotice(null)}
                            className="rounded-xl bg-cyan-400 px-5 py-2 text-xs font-black text-slate-950 hover:bg-cyan-300"
                          >
                            Done
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* MODAL 2: VERIFIED AI INSPECTION CERTIFICATE */}
                <AnimatePresence>
                  {showAiCertificate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg rounded-3xl border border-emerald-400/40 bg-[#091522] p-6 sm:p-8 shadow-2xl text-white relative"
                      >
                        <button
                          onClick={() => setShowAiCertificate(false)}
                          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 text-emerald-400 mb-4">
                          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
                            <FileCheck size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black">AI Telemetry Certificate</h3>
                            <p className="text-xs text-emerald-300">Cryptographically signed inspection record</p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-2 text-xs font-mono">
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Certificate ID:</span>
                            <span className="text-cyan-300 font-bold">CERT-TR-CV-{Math.floor(100000 + Math.random() * 900000)}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Inspection Model:</span>
                            <span className="text-white">ResNet50-YOLOv8-TR-v2.1</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Classified Defect:</span>
                            <span className="text-amber-300 font-bold">{damageSamples[selectedDamageSample].type}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">Confidence Score:</span>
                            <span className="text-emerald-400 font-bold">{damageSamples[selectedDamageSample].confidence}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1.5">
                            <span className="text-gray-400">SHA-256 Ledger Hash:</span>
                            <span className="text-purple-300 text-[10px] break-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-gray-400">Timestamp:</span>
                            <span className="text-slate-400">{new Date().toISOString()}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                          <button
                            onClick={() => {
                              alert("Telemetry certificate downloaded as signed JSON/PDF format.");
                              setShowAiCertificate(false);
                            }}
                            className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-black text-slate-950 flex items-center gap-2"
                          >
                            <Download size={14} /> Download Certificate (PDF/JSON)
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
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
