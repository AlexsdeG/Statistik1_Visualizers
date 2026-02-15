# Changelog

## [0.0.5] - 2024-05-22
### Added
- **Lorenz Module - Phase 5 (Context & Polish)**:
    - Added dynamic "Interpretation" text to the Gini Score (Low, Medium, High, Extreme Inequality).
    - Added explanatory math footnote regarding maximum Gini coefficient for small populations.
    - Standardized chart colors using a shared `theme` constant.
    - Added background grid lines to `IncomeSliders` for better value estimation.

## [0.0.4] - 2024-05-22
### Added
- **Lorenz Module - Phase 4 (Integration)**:
    - Added Preset buttons to `LorenzView`:
        - "Perfect Equality" (Gini 0.00).
        - "80/20 Rule" (Pareto approximation).
        - "Extreme Wealth" (One takes all).
    - Refined layout to group controls and visualization effectively.

## [0.0.3] - 2024-05-22
### Added
- **Lorenz Module - Phase 3 (Visualization)**:
    - Added `LorenzPlot` component using `mafs` library.
    - Implemented geometric visualization of the Lorenz Curve, Line of Equality, and the Inequality Gap (Area A).
    - Integrated `LorenzPlot` into the main `LorenzView`.
    - Added CSS and importmap entries for `mafs`.

## [0.0.2] - 2024-05-22
### Added
- **Lorenz Module - Phase 2 (Input & Sorting)**:
    - Added `IncomeSliders` component: Interactive vertical sliders for editing citizen income.
    - Added `SortedBars` component: Visualizes the sorting step required for Lorenz curves using `framer-motion` for reordering animations.
    - Integrated both components into `LorenzView`.
    - Added `framer-motion` to dependencies.

## [0.0.1] - 2024-05-22
### Added
- Initial project structure.
- **Lorenz Module**: Implemented Phase 1 (Math & Logic).
    - `useLorenzMath` hook for Gini coefficient and Lorenz curve point calculations.
    - Basic `LorenzView` for validating math logic with manual inputs.
    - Unit tests for math logic.
    - Knowledge and Plan documentation.
