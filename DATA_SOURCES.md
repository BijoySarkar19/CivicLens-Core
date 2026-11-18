# DATA_SOURCES.md — Public Data Sources & Provenance Registry

CivicLens AI ingests, normalizes, and geocodes public data records from verified public government portals and open GIS mapping initiatives.

---

## 1. Primary Public Sources & Catalogs

| Data Domain | Source Provider | Catalog Citation | License |
| :--- | :--- | :--- | :--- |
| **Open Government Data (OGD)** | Government of India (`data.gov.in`) | National Data Sharing and Accessibility Policy (NDSAP) | Open Government Data License - India (GODL) |
| **Geospatial Tiles & Base Layers** | OpenStreetMap Foundation | Cartographic tiles & vector layers | Open Database License (ODbL) / CC-BY-SA 2.0 |
| **Tripura State Infrastructure** | Tripura State Portal (`tripura.gov.in`) | Public Works Department (Roads & Bridges), DWS, and AMC Gazetteers | State Public Disclosure |
| **Railway Corridors & Stations** | Northeast Frontier Railway (NFR) | Lumding-Badarpur-Agartala-Sabroom Line Operational Bulletins | Public Domain / Indian Railways |
| **River Basin Hydrology** | Central Water Commission (CWC) | Gumti, Howrah, Khowai, and Manu River Gauging Data | National Water Informatics Centre |

---

## 2. Attribution & Intellectual Property Policy
- CivicLens AI strictly retains origin provenance metadata (`dataset_id`, `source_record_id`, `source_name`, `publisher`, `license`).
- External datasets are never claimed as privately owned or internally generated.
- All spatial geometries are normalized to standard **EPSG:4326 (WGS 84)**.
