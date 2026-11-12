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
