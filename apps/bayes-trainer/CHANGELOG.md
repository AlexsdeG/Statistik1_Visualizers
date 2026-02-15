# Changelog

All notable changes to this project will be documented in this file.

## [0.0.5] - 2024-05-22

### Added
- Implemented Phase 5: Refinement & Optimization.
- Added `lowPrevalenceWarning` for Grid View when prevalence < 0.1%.
- Added `useDebounce` hook to optimize `PopulationGrid` rendering on mobile.
- Centralized color definitions in `src/theme/colors.ts`.
- Added `TextWithHighlight` component to safely render bold text in translations, removing `dangerouslySetInnerHTML`.
- Updated Visualizations to use centralized theme colors.

## [0.0.4] - 2024-05-22

### Added
- Implemented Phase 4 Final Polish.
- Added Internationalization (i18n) support with English and German translations.
- Added `LanguageContext` and `LanguageProvider`.
- Added Language Toggle button in the header.
- Refined responsiveness for mobile devices (padding, button sizes).
- Updated tests to support Language Context.

## [0.0.3] - 2024-05-22

### Added
- Implemented Phase 3 Integration & UX.
- Added `BayesControls` component for advanced input handling (Logarithmic Prevalence slider).
- Added `ResultSummary` component for narrative explanation of results.
- Added `BayesView` component as the main view controller.
- Refactored `App.tsx` to use `BayesView`.
- Added unit tests for new components.

## [0.0.2] - 2024-05-22

### Added
- Implemented Phase 2 Visualizations.
- Added `UnitSquare` component (SVG Rect visualization).
- Added `PopulationGrid` component (SVG 1000-dot visualization).
- Updated `App.tsx` to display the new visualizations alongside controls.
- Added unit tests for `UnitSquare` and `PopulationGrid`.

## [0.0.1] - 2024-05-22

### Added
- Initial project structure.
- Implemented `useBayesLogic` hook for Bayesian statistics calculations.
- Added basic UI to demonstrate the logic hook.
- Added test suite for `useBayesLogic`.
- Added Knowledge Base and Implementation Plan.
