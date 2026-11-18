# Contributing to CivicLens AI

Thank you for contributing to CivicLens AI! Please follow these engineering guidelines to maintain quality, security, and accessibility across the codebase.

## Engineering Standards
1. **Unified Platform Philosophy**: Maintain a unified, single-pane command center architecture without artificial barriers or split routing.
2. **Type Safety & Quality**: Run `npx tsc --noEmit` and `pytest backend/tests` prior to creating pull requests.
3. **Dual-Mode Visual Compliance**: Verify all user interface widgets in both Modern Cyberpunk View and Government Mode (UX4G / GIGW 3.0 / WCAG 2.1 AA).
4. **GIS & SSR Boundaries**: Dynamically import Leaflet components (`ssr: false`) to avoid server-side rendering crashes. Wrap components consuming `useSearchParams()` in React `<Suspense>` boundaries.
5. **Security**: Never commit sensitive secrets, credentials, or production tokens.
