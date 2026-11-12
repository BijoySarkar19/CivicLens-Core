# Part 1 — CivicLens Core

Part 1 is the operational foundation of CivicLens.

## Implemented boundary

The platform is designed around real records and deterministic operational workflows:

```text
Dataset / source
      ↓
Asset registry
      ↓
Incident reported
      ↓
Verification
      ↓
Department assignment
      ↓
Work order
      ↓
Inspection
      ↓
Maintenance / completion
      ↓
Resolution
      ↓
Closure
      ↓
Audit + domain event
```

## Explicitly not implemented as AI

Part 1 does not produce:

- fabricated risk percentages
- fake predictions
- imaginary model accuracy
- AI-generated recommendations
- computer-vision labels
- anomaly scores

The feature flag remains:

```text
CIVICLENS_AI_ENABLED=false
```

Part 2 will consume stable APIs, historical data and domain events rather than replacing the transactional source of truth.
