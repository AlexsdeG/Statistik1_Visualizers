# 📋 Implementation Plan: Statistics (CLT)

## 📂 Structure
Create module folder `src/modules/statistics/clt/`.

```text
src/modules/statistics/clt/
├── components/
│   ├── SimControls.tsx     # Buttons & n-Slider
│   ├── Histogram.tsx       # Mafs Visualization
│   └── StatsOverlay.tsx    # Empiric vs Theory text
├── hooks/
│   └── useCLTSimulation.ts # The Logic Engine
└── CLTView.tsx             # Main Layout
```

---

## 🏗️ Phase 1: Logic & State
**Goal:** Run experiments and store counts efficiently.

### Step 1.1: The Simulation Hook
*   **Action:** `useCLTSimulation.ts`.
*   **State:**
    *   `counts`: `Record<number, number>` (Frequency map).
    *   `totalTrials`: number.
    *   `n`: number (Dice per trial).
*   **Actions:**
    *   `runSimulation(batchSize: number)`:
        *   Loop `batchSize` times.
        *   Inside: Loop `n` times to sum `Math.floor(Math.random()*6)+1`.
        *   Update `counts`.
    *   `setN(val)`: Resets `counts` and updates `n`.
    *   `reset()`: Clears `counts`.

### Step 1.2: Theoretical Helpers
*   **Action:** Add to `clt-utils.ts`.
*   **Details:**
    *   `getTheoreticalMean(n)`: Returns $n \cdot 3.5$.
    *   `getTheoreticalSigma(n)`: Returns $\sqrt{n \cdot 35/12}$.
    *   `normalPDF(x, mu, sigma)`: Standard Gaussian formula.

---

## 🎛️ Phase 2: Controls & Feedback
**Goal:** Let the user "fire" the simulation.

### Step 2.1: Control Panel
*   **Action:** `SimControls.tsx`.
*   **UI:**
    *   Slider for $n$ (1-50). Label: "Anzahl Würfel pro Wurf".
    *   ButtonGroup: "+1", "+100", "+1000", "Reset".
    *   **Warning:** If $n$ slider is dragged, show a toast/warning that "Data will be reset".

---

## 📉 Phase 3: The Visualization
**Goal:** Dynamic Histogram + Curve.

### Step 3.1: Histogram Rendering
*   **Action:** `Histogram.tsx` (Part 1).
*   **Tech:** Mafs.
*   **Logic:**
    *   Convert `counts` object to array `[{x, y}]`.
    *   Map to `<Polygon>`:
        *   For value $x$ with count $y$: Rectangle corners $(x-0.5, 0), (x+0.5, 0), (x+0.5, y), (x-0.5, y)$.
        *   Color: Blue, opacity 0.4.

### Step 3.2: Theoretical Overlay
*   **Action:** `Histogram.tsx` (Part 2).
*   **Logic:**
    *   Calculate $\mu, \sigma$ based on current $n$.
    *   Render `<Plot.OfX>`:
        *   $y(x) = \text{totalTrials} \cdot \text{normalPDF}(x, \mu, \sigma)$.
    *   Color: Orange, stroke width 2.
    *   **Condition:** Only show curve if `totalTrials > 0`.

### Step 3.3: Auto-Scaling
*   **Action:** Integrate `useDimensions` or calculate `viewBox`.
*   **Logic:**
    *   `minX`: Min key in counts OR $\mu - 4\sigma$.
    *   `maxX`: Max key in counts OR $\mu + 4\sigma$.
    *   `maxY`: Max count value OR theoretical peak ($N / (\sigma\sqrt{2\pi})$).
    *   Pass `{{ x: [minX, maxX], y: [0, maxY * 1.1] }}` to Mafs.

---

## 🌍 Phase 4: Integration
*   **Action:** `CLTView.tsx`.
*   **Layout:**
    *   Top: Title "Zentraler Grenzwertsatz".
    *   Left: Controls & Stats (Mean vs Mean).
    *   Center: Big Histogram.
    *   **Educational Tip:** "Setze n=1 (Gleichverteilung) und dann n=30 (Glocke). Siehst du den Unterschied?"
