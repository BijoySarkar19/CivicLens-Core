# Data Pipeline

## Part 1 foundation

Part 1 currently provides a provenance registry and background-job foundation.

A dataset source records:

- source name
- publisher
- dataset name
- source URL
- license
- import timestamp
- record count
- processing status

Assets can retain a source dataset ID and source record ID.

## Planned import pipeline

```text
source selection
→ upload/fetch
→ preview
→ schema detection
→ mapping
→ validation
→ deduplication
→ transformation
→ import
→ report
→ audit
```

The complete import engine is a next Part 1 hardening task; it is not represented as complete merely because the provenance tables exist.
