# 📋 Implementation Plan: Statistics (Distributions)

## 📂 Structure
Create module folder `src/modules/statistics/distributions/`.

```text
src/modules/statistics/distributions/
├── components/
│   ├── Controls/           # Sliders for n, p, lambda...
│   ├── DistributionPlot.tsx # The Main Graph
│   └── StatsSummary.tsx    # E(X), Var(X) display
├── hooks/
│   └── useDistributionData.ts # Switch-case logic
└── DistributionView.tsx    # Main Layout
```

---

## 🏗️ Phase 1: Math Engine
**Goal:** Generate clean $(x,y)$ data arrays.

### Step 1.1: Math Utils
*   **Action:** Create `src/lib/distribution-math.ts`.
*   **Details:**
    *   Implement `binomial(n, p)`.
    *   Implement `poisson(lambda)`.
    *   Implement `normalPDF(x, mu, sigma)`.
    *   **Optimization:** Use `logGamma` or approximate large factorials if performance lags (though for $n=100$, JS handles it fine).

### Step 1.2: The Data Hook
*   **Action:** `useDistributionData.ts`.
*   **Input:** Type ('binomial', 'normal', etc.), Parameters object.
*   **Output:**
    *   `pmfData`: Array `{ k, p }` (for discrete).
    *   `pdfFunc`: Function `(x) => y` (for continuous).
    *   `stats`: Object `{ mean, variance }`.
    *   `domain`: `{ min, max }` for auto-scaling.

---

## 🎛️ Phase 2: Dynamic Controls
**Goal:** A UI that changes based on the distribution type.

### Step 2.1: Parameter Inputs
*   **Action:** `ParameterControls.tsx`.
*   **Logic:**
    *   Props: `type`, `params`, `onChange`.
    *   Render different sliders based on `type`.
    *   E.g., "Binomial" $\to$ Slider $n$ (Step 1), Slider $p$ (Step 0.01).
    *   E.g., "Normal" $\to$ Slider $\mu$, Slider $\sigma$.

### Step 2.2: Range Selector
*   **Action:** `RangeControls.tsx`.
*   **UI:** Two inputs or a dual-thumb slider for "From $k$" to "$k$".
*   **Visual Feedback:** Show the sum $\sum P(X=k)$ immediately next to it.

---

## 📉 Phase 3: The Visualization (Lollipop Chart)
**Goal:** Render clear, academic-style charts.

### Step 3.1: Discrete Rendering
*   **Action:** `DistributionPlot.tsx` (Part 1).
*   **Tech:** Mafs.
*   **Logic:**
    *   Map `pmfData`. For each point:
        *   Render `<Line.Segment>` from $(k, 0)$ to $(k, P(k))$.
        *   Render `<Point>` at $(k, P(k))$.
    *   **Color Logic:** If $k$ is inside the selected range, color = Orange. Else = Blue.

### Step 3.2: Continuous Overlay
*   **Action:** `DistributionPlot.tsx` (Part 2).
*   **Logic:**
    *   If Normal distribution selected: Render `<Plot.OfX>`.
    *   **Approximation Feature:** If Binomial selected AND "Show Approx" checked:
        *   Overlay a semi-transparent Normal Curve with $\mu=np, \sigma=\sqrt{npq}$.

### Step 3.3: Interactive Tooltip
*   **Action:** Add Hover state.
*   **Details:** Since Mafs doesn't have a built-in "Tooltip" component for custom shapes easily, use a simple `Text` element in the corner of the graph showing "k=..., P=..." when a Point is hovered (store hovered ID in state).

---

## 🌍 Phase 4: Integration
*   **Action:** `DistributionView.tsx`.
*   **Layout:**
    *   Sidebar: Type Selector, Parameter Sliders, Range Selector, Stats Summary ($E(X)$).
    *   Main: Large Mafs Canvas.
