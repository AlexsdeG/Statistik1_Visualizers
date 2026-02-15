# Changelog

## [0.0.5] - 2025-05-21
### Changed
- Phase 5: Refinement & UX Polish.
- **Histogram:** Implemented smart x-axis scaling. Grid lines now adapt (step 1, 5, or 10) based on the data range to prevent label overcrowding at high $n$.
- **Histogram:** Added tooltips to histogram bars for exact values on hover.
- **UX:** Language preference ('de'/'en') is now persisted in `localStorage`.

## [0.0.4] - 2025-05-20
### Added
- Phase 4: Integration & Polish.
- Enhanced `CLTView` layout with educational info banner.
- Added integration tests for `CLTView`.
- Refined UI responsiveness and visual hierarchy.

## [0.0.3] - 2025-05-20
### Added
- Phase 3: Visualization & Statistics.
- `Histogram` component using `mafs` to visualize distribution.
- `StatsOverlay` component to compare empirical and theoretical values.
- Integrated visualization into `CLTView`.
- Added `mafs` dependency and styles.
- Updated locales with statistical terms.

## [0.0.2] - 2025-05-20
### Added
- Phase 2: Controls & Feedback UI.
- `SimControls` component with slider for `n` and simulation trigger buttons.
- `CLTView` main view component integrating logic and controls.
- Interactive language switching (DE/EN).
- Warning UI when changing parameters during an active simulation.
- Unit tests for `SimControls`.

## [0.0.1] - 2025-05-20
### Added
- Initial project structure.
- Phase 1: Core logic and state management for CLT Simulator.
- `useCLTSimulation` hook for managing dice rolls and frequency data.
- `clt-utils` for theoretical statistics calculations (Mean, Sigma, Normal PDF).
- Unit tests for logic and utils.
- I18n support structure for CLT module.
