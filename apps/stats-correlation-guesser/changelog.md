# Changelog

## [0.0.6] - 2024-05-22
### Added
- Added "Sine Wave" and "Circle" presets to Sandbox mode to demonstrate non-linear relationships with low correlation.

## [0.0.5] - 2024-05-22
### Added
- Phase 5: Polish & Advanced Features.
- Added Anscombe's Quartet presets to Sandbox to demonstrate importance of visualization.
- Added Undo button and Residuals toggle in Sandbox mode.
- Added Streak and Best Streak tracking in Game Mode.
- Improved accessibility and UI responsiveness.

## [0.0.4] - 2024-05-22
### Added
- Phase 4: Integration and Refinement.
- `CorrelationInfo` component to explain Pearson's correlation coefficient.
- Toggleable educational guide in `CorrelationView`.
- Enhanced tab navigation styles.
- Integrated educational tooltips and context via the Info guide.
- New unit tests for integration (`CorrelationView`) and info component.

## [0.0.3] - 2024-05-22
### Added
- Phase 3: Sandbox Mode implementation.
- `SandboxBoard` component for interactive exploration of regression.
- `StatsPanel` component for displaying regression statistics.
- Interactive features to `ScatterPlot` (click to add, right-click point to remove).
- `CorrelationView` component to manage tabs between Game and Sandbox modes.
- Presets for Sandbox mode (Parabola, Outlier, etc.).
- Updated i18n with new translations.

## [0.0.2] - 2024-05-22
### Added
- Phase 2: Game Mode implementation.
- `ScatterPlot` component for visualizing data points and regression lines using SVG.
- `GameBoard` component handling the game logic (guessing, scoring, rounds).
- Updated Internationalization (i18n) with new keys for the game mode.
- Integration of Game Mode into the main App.

## [0.0.1] - 2024-05-22
### Added
- Initial project structure.
- Implementation of Phase 1: Math & Logic.
- `useRegression` hook for calculating Pearson correlation and linear regression parameters.
- `usePointGenerator` hook for generating random data clouds with target correlation.
- Unit tests for regression and generation logic.
- Basic Internationalization (i18n) setup (EN/DE).
- Debug view in App to verify logic.
