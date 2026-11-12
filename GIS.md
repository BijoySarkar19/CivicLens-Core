# GIS — Part 1

CivicLens uses PostgreSQL with PostGIS.

## Spatial model

Assets and incidents have:

- latitude
- longitude
- `POINT` geometry with SRID 4326

The migration creates the PostGIS extension and backfills asset geometry from existing coordinates.

## Frontend map

The web application renders coordinate-bearing assets using Leaflet and OpenStreetMap tiles.

## Planned spatial capabilities

The architecture is ready for:

- radius queries
- bounding-box queries
- district overlays
- incident clustering
- asset/incident layer toggles
- historical hotspots
- map/list synchronization
- GeoJSON import

These should be implemented with real spatial data; no simulated map markers are used.

## Tile attribution

OpenStreetMap attribution is displayed by the map component. Production deployments should review tile-usage requirements and use an appropriate tile provider for expected traffic.
