# Changelog

## [0.0.6] - 2024-05-23
### Added
- **New Distributions**: Added 8 new distributions to match standard statistics curriculum:
  - Continuous: Continuous Uniform, Exponential, Gamma, Inverse Gamma, Beta, Cauchy.
  - Discrete: Discrete Uniform, Negative Binomial.
- **Educational Content**: Added `DistributionInfo` component showing Definitions, Formulas, and Usage cases for all distributions in English and German.
- **Math Engine**: Added `logGamma`, `gamma`, `betaFunc` and numerical integration (`integrate`) to support complex continuous distributions.
- **Numerical Integration**: Used for calculating probability sums for distributions without simple closed-form CDFs (Beta, Gamma, InvGamma).
- **UI Updates**: Organized dropdown into groups, added new sliders for new parameters (alpha, beta, loc, scale, r).

## [0.0.5] - 2024-05-23
### Added
- **Phase 5 Implementation**: Visual Polish & Interactivity.
- `DistributionPlot`: Added interactive tooltips for discrete distributions (hover to see Exact Probability).
- `DistributionPlot`: Added shaded area for Normal distribution range calculations using `Polygon`.
- `DistributionView`: Added "Calculate Range" toggle to show/hide range controls and highlighting.
- Refined Hypergeometric parameter logic.

## [0.0.4] - 2024-05-23
### Added
- **Phase 4 Implementation**: Full Integration.
- `DistributionView`: Main layout component integrating sidebar controls, stats summary, and visualization.
- `StatsSummary`: Dedicated component for displaying E(X), Var(X), and Domain.
- Refactored `App.tsx` to serve as a clean container for `DistributionView`.
- Improved responsive layout and visual polish.

## [0.0.3] - 2024-05-23
### Added
- **Phase 3 Implementation**: Visualization with Mafs.
- `DistributionPlot` component: Renders PMF (Lollipop) for discrete and PDF (Line) for continuous distributions.
- Added Normal Approximation overlay support for Binomial distribution.
- Integrated `mafs` library via import map and CSS.
- Updated `App` layout to include the graphical visualization.

## [0.0.2] - 2024-05-23
### Added
- **Phase 2 Implementation**: Dynamic Controls.
- `ParameterControls` component: Adaptive sliders for Binomial, Poisson, Geometric, Hypergeometric, and Normal distributions.
- `RangeControls` component: Range selection inputs with probability sum visualization.
- `normalCDF` math utility for calculating probabilities in Normal distribution.
- Updated `App.tsx` to use unified parameter state and new control components.
- Added tests for controls and new math functions.

## [0.0.1] - 2024-05-23
### Added
- Initial project structure.
- Math engine for Binomial, Poisson, Geometric, Hypergeometric, and Normal distributions.
- `useDistributionData` hook for generating distribution data and statistics.
- Basic i18n setup.
