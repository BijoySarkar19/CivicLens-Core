# DESIGN.md — CivicLens AI Design System & Tokens

Machine-readable design specification for CivicLens AI, standardizing layout rules, color roles, typography, component tokens, and dual-mode rendering (UX4G / GIGW 3.0 vs. Modern Dark Mode).

---

## 1. Visual Hierarchy & Theme Modes

CivicLens supports two synchronized design modes toggled via `useGovtMode()`:

### Mode A: Modern Dark (Cyber-Civic Command Center)
- **Background**: `#070d16` to `#0d1726` deep navy gradient with glassmorphism.
- **Card Surfaces**: `rgba(255, 255, 255, 0.04)` with `1px solid rgba(255, 255, 255, 0.08)`.
- **Primary Accent**: Electric Cyan `#22d3ee` / `#06b6d4` (`rgb(34, 211, 238)`).
- **Secondary Accent**: Electric Purple `#a855f7` and Mint Emerald `#10b981`.
- **Text Primary**: Crisp White `#ffffff`.
- **Text Secondary**: Slate Gray `#94a3b8`.

### Mode B: Government View (UX4G / GIGW 3.0 Standard)
- **Background**: Clean Neutral Slate `#f8fafc`.
- **Card Surfaces**: Pure White `#ffffff` with subtle elevation shadow `box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)`.
- **Border Tokens**: High-contrast Gray `#cbd5e1` / `#e2e8f0`.
- **Primary Brand**: Government Deep Blue `#004085` / `#0a5c9e`.
- **Tricolor Accents**: Saffron `#d97706`, Ashoka Navy `#000080`, India Green `#15803d`.
- **Text Primary**: Charcoal Obsidian `#0f172a` (ensures WCAG 2.1 AAA 7:1 contrast).
- **Text Secondary**: Slate Medium `#475569`.

---

## 2. Color Palette & Functional Roles

| Token Role | Modern Dark Mode | Government Mode (UX4G) | Purpose |
| :--- | :--- | :--- | :--- |
| `--surface-bg` | `#08101e` | `#f8fafc` | Main viewport canvas |
| `--card-bg` | `rgba(255,255,255,0.03)` | `#ffffff` | Panel & card containers |
| `--text-head` | `#ffffff` | `#0f172a` | Headers, page titles, big numbers |
| `--text-body` | `#94a3b8` | `#334155` | Explanatory copy, paragraphs |
| `--brand-primary` | `#22d3ee` | `#004085` | Primary buttons, active tabs |
| `--status-critical` | `#ef4444` (`bg-red-500/10`) | `#b91c1c` (`bg-red-50`) | P1 incidents, failure risk >80% |
| `--status-warning` | `#f59e0b` (`bg-amber-500/10`)| `#b45309` (`bg-amber-50`)| P2 incidents, overdue maintenance |
| `--status-success` | `#10b981` (`bg-emerald-500/10`)| `#15803d` (`bg-green-50`)| Resolved tickets, active sensors |

---

## 3. Typography Scale
- **Display Headings**: `font-black tracking-tight text-3xl sm:text-4xl md:text-5xl`
- **Section Headers**: `font-bold text-xl sm:text-2xl`
- **Card Titles**: `font-bold text-base sm:text-lg`
- **Body Text**: `font-normal text-sm sm:text-base leading-relaxed`
- **Captions & Metadata**: `font-medium text-xs text-slate-400`
- **Monospace Code / IDs**: `font-mono text-xs tracking-wider uppercase`

---

## 4. Component Design Patterns

### 1. Stat Cards
- Rounded 2xl border with 16px internal padding.
- Displays key metric, delta trend pill (e.g. `+14% vs last mo`), and descriptive caption.

### 2. GIS Map Markers
- Interactive Leaflet circles and pulsing radar rings.
- Dynamic color coding by condition: Good (Green), Fair (Yellow), Poor (Red).
- Focused markers automatically zoom to `zoom=16` with auto-opening popup.

### 3. Accessible Form Controls
- Explicit labels with `htmlFor` bindings.
- Distinct focus states with 2px ring offset.
- Mobile touch targets minimum 44px by 44px.

### 4. Centered Severity & Target Badges
- Pill styling uses `inline-flex flex-col items-center justify-center text-center min-w-[76px]`.
- Vertical line separation ensures severity code (`Critical`) and priority tier (`(P1)`) are horizontally aligned over each other.
- Target indicator badges (`★ TARGET`) center the glyph over the label without circular distortion.

### 5. Deep-Link Back Buttons
- Sub-views navigated from administrative dossiers (`/map` and `/assets`) feature prominent, accessible Back buttons returning to the dossier or command center without stranding users.
