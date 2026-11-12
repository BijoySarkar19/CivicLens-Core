export type Asset = {
  id: number;
  asset_code: string;
  name: string;
  asset_type: string;
  description?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  condition: string;
  status: string;
  district?: string | null;
  city?: string | null;
  source_name?: string | null;
};

export type Incident = {
  id: number;
  incident_code: string;
  title: string;
  description: string;
  asset_id?: number | null;
  category: string;
  severity: string;
  priority: string;
  status: string;
  reporter_email?: string | null;
  reporter_phone?: string | null;
  district?: string | null;
  landmark?: string | null;
  assigned_department?: string | null;
  verified_by?: string | null;
  created_at: string;
};

export type DashboardSummary = {
  assets: number;
  incidents: number;
  open_incidents: number;
  critical_incidents: number;
  work_orders: number;
  open_work_orders: number;
  inspections: number;
  maintenance_records: number;
  ai_enabled: boolean;
};

export const TRIPURA_SEED_ASSETS: Asset[] = [
  {
    id: 1,
    asset_code: "TR-WTR-001",
    name: "Ujjayanta Palace Heritage Complex & Storm Drainage",
    asset_type: "Heritage & Drainage",
    description: "Palace precinct underground stormwater drainage network and ornamental lake barrier.",
    latitude: 23.8340,
    longitude: 91.2828,
    condition: "good",
    status: "active",
    district: "West Tripura",
    city: "Agartala",
    source_name: "Tripura Urban Dev. Authority",
  },
  {
    id: 2,
    asset_code: "TR-WTR-002",
    name: "Battala Flyover & Traffic Transit Corridor",
    asset_type: "Flyover / Bridge",
    description: "Central Agartala elevated corridor connecting Battala to Fire Brigade Chowmuhani.",
    latitude: 23.8291,
    longitude: 91.2782,
    condition: "fair",
    status: "active",
    district: "West Tripura",
    city: "Agartala",
    source_name: "Tripura PWD (Roads)",
  },
  {
    id: 3,
    asset_code: "TR-WTR-003",
    name: "Agartala Smart City Integrated Command & Control Centre",
    asset_type: "Smart City Facility",
    description: "Municipal operations nerve center monitoring CCTV, streetlights, and solid waste collection.",
    latitude: 23.8504,
    longitude: 91.2891,
    condition: "good",
    status: "active",
    district: "West Tripura",
    city: "Agartala",
    source_name: "Agartala Smart City Ltd.",
  },
  {
    id: 4,
    asset_code: "TR-WTR-004",
    name: "Howrah River Embankment & Flood Defense Barrier",
    asset_type: "Flood Defense / River",
    description: "Reinforced retaining wall preventing monsoon inundation in southern Agartala.",
    latitude: 23.8235,
    longitude: 91.2721,
    condition: "fair",
    status: "active",
    district: "West Tripura",
    city: "Agartala",
    source_name: "Water Resource Dept. Tripura",
  },
  {
    id: 5,
    asset_code: "TR-WTR-005",
    name: "MBB Airport 4-Lane Approach Road & Solar Streetlighting",
    asset_type: "Highway / Electrical",
    description: "Modern four-lane expressway connecting Agartala city center to Maharaja Bir Bikram Airport.",
    latitude: 23.8860,
    longitude: 91.2405,
    condition: "good",
    status: "active",
    district: "West Tripura",
    city: "Narsingarh / Agartala",
    source_name: "National Highways & PWD",
  },
  {
    id: 6,
    asset_code: "TR-GMT-001",
    name: "Tripura Sundari Temple Pilgrimage Corridor & Streetlights",
    asset_type: "Corridor / Electrical",
    description: "Matabari heritage access corridor with decorative street illumination and crowd barrier gates.",
    latitude: 23.5186,
    longitude: 91.4988,
    condition: "good",
    status: "active",
    district: "Gomati",
    city: "Udaipur",
    source_name: "Tripura Tourism & PWD",
  },
  {
    id: 7,
    asset_code: "TR-GMT-002",
    name: "Gomati River Concrete Bridge (Udaipur Bypass)",
    asset_type: "Bridge",
    description: "Heavy vehicular span over Gomati river facilitating south Tripura transit.",
    latitude: 23.5350,
    longitude: 91.4820,
    condition: "good",
    status: "active",
    district: "Gomati",
    city: "Udaipur",
    source_name: "Tripura PWD (Bridges)",
  },
  {
    id: 8,
    asset_code: "TR-GMT-003",
    name: "Amarpur Sub-divisional Water Pumping Station",
    asset_type: "Water Treatment",
    description: "Surface water intake pumping potable supply for Amarpur town residents.",
    latitude: 23.5290,
    longitude: 91.6410,
    condition: "poor",
    status: "active",
    district: "Gomati",
    city: "Amarpur",
    source_name: "Drinking Water & Sanitation Dept.",
  },
  {
    id: 9,
    asset_code: "TR-STH-001",
    name: "Maitri Setu (Feni River International Bridge)",
    asset_type: "International Bridge",
    description: "1.9 km bridge over Feni river connecting Sabroom in South Tripura to Ramgarh.",
    latitude: 23.0030,
    longitude: 91.7140,
    condition: "good",
    status: "active",
    district: "South Tripura",
    city: "Sabroom",
    source_name: "NHIDCL / Tripura PWD",
  },
  {
    id: 10,
    asset_code: "TR-STH-002",
    name: "Belonia Municipal Storm Drainage Network",
    asset_type: "Drainage",
    description: "Underground culverts and concrete open drain systems in Belonia town center.",
    latitude: 23.2500,
    longitude: 91.4550,
    condition: "fair",
    status: "active",
    district: "South Tripura",
    city: "Belonia",
    source_name: "Belonia Municipal Council",
  },
  {
    id: 11,
    asset_code: "TR-SPJ-001",
    name: "Neermahal Palace Rudrasagar Waterway & Jetty",
    asset_type: "Waterway Infrastructure",
    description: "Motor boat passenger jetty and lake perimeter retaining walls at Rudrasagar Lake.",
    latitude: 23.4980,
    longitude: 91.3190,
    condition: "fair",
    status: "active",
    district: "Sepahijala",
    city: "Melaghar",
    source_name: "Tourism Dev. Corp. Tripura",
  },
  {
    id: 12,
    asset_code: "TR-SPJ-002",
    name: "Sepahijala Eco-Park Solar Lighting & Perimeter Barrier",
    asset_type: "Solar & Boundary",
    description: "Renewable solar streetlight installations and wildlife perimeter fencing.",
    latitude: 23.6820,
    longitude: 91.3320,
    condition: "good",
    status: "active",
    district: "Sepahijala",
    city: "Bishalgarh",
    source_name: "Forest Dept. Tripura",
  },
  {
    id: 13,
    asset_code: "TR-KHW-001",
    name: "Khowai River Flood Embankment Wall",
    asset_type: "Flood Defense",
    description: "Erosion barrier protecting agricultural lowlands and Khowai town border.",
    latitude: 24.0620,
    longitude: 91.6040,
    condition: "poor",
    status: "active",
    district: "Khowai",
    city: "Khowai",
    source_name: "Water Resource Dept.",
  },
  {
    id: 14,
    asset_code: "TR-KHW-002",
    name: "Teliamura NH-8 Rail Overbridge (ROB)",
    asset_type: "Highway ROB",
    description: "Multi-axle vehicle grade separator across railway track on National Highway 8.",
    latitude: 23.8420,
    longitude: 91.5970,
    condition: "good",
    status: "active",
    district: "Khowai",
    city: "Teliamura",
    source_name: "MoRTH / Tripura PWD",
  },
  {
    id: 15,
    asset_code: "TR-DHL-001",
    name: "Ambassa Hill Road Highway Culvert & Retaining Mesh",
    asset_type: "Culvert & Retaining Wall",
    description: "Drainage culvert under NH-8 in Dhalai district subjected to landslide erosion.",
    latitude: 23.9230,
    longitude: 91.8480,
    condition: "critical",
    status: "active",
    district: "Dhalai",
    city: "Ambassa",
    source_name: "PWD Roads Division Ambassa",
  },
  {
    id: 16,
    asset_code: "TR-UNK-001",
    name: "Unakoti Heritage Pathway & Hill Retaining Structures",
    asset_type: "Heritage Infrastructure",
    description: "Paved stairways, pedestrian railings, and hillside erosion control netting at Unakoti carvings.",
    latitude: 24.3210,
    longitude: 92.0250,
    condition: "fair",
    status: "active",
    district: "Unakoti",
    city: "Kailashahar",
    source_name: "Archaeological & PWD Tripura",
  },
  {
    id: 17,
    asset_code: "TR-NTR-001",
    name: "Dharmanagar Central Water Purification Facility",
    asset_type: "Water Supply Plant",
    description: "2.5 MGD rapid gravity filtration plant serving Dharmanagar municipal ward network.",
    latitude: 24.3720,
    longitude: 92.1640,
    condition: "good",
    status: "active",
    district: "North Tripura",
    city: "Dharmanagar",
    source_name: "DWS Division Dharmanagar",
  },
];
