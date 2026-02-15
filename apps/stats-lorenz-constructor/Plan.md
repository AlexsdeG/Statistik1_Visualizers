# 📋 Implementation Plan: Statistics (Lorenz)

## 📂 Structure
Create module folder `src/modules/statistics/lorenz/`.

```text
src/modules/statistics/lorenz/
├── components/
│   ├── IncomeSliders.tsx       # Input
│   ├── SortedBars.tsx          # The sorting animation
│   ├── LorenzPlot.tsx          # Mafs visualization
│   └── GiniDisplay.tsx         # The big number
├── hooks/
│   └── useLorenzMath.ts        # Logic
└── LorenzView.tsx              # Main Layout
```

---

## 🏗️ Phase 1: Logic & Math
**Goal:** Reliable Gini & Point calculation.

### Step 1.1: Math Hook
*   **Action:** Create `useLorenzMath.ts`.
*   **Input:** `number[]` (Raw incomes).
*   **Output:**
    *   `sortedIncomes`: `number[]`.
    *   `lorenzPoints`: Array of `{ u, v }`.
    *   `gini`: number (0-1).
    *   `equalityPoints`: Array of `{ u, v }` (The diagonal).
*   **Test:** Unit test with `[10, 10, 10]` (Gini 0) and `[0, 0, 10]` (Gini approaching 1).

---

## 🎛️ Phase 2: Input & Sorting UI
**Goal:** Visualize the connection between "My Money" and "Sorted List".

### Step 2.1: The Sliders (Input)
*   **Action:** `IncomeSliders.tsx`.
*   **UI:** 5 vertical Radix Sliders.
*   **Styling:** Make them look like bar charts. Bottom aligned.
*   **State:** Updates the `incomes` array at specific index.

### Step 2.2: The Sorting Animation
*   **Action:** `SortedBars.tsx`.
*   **Tech:** `framer-motion`.
*   **Logic:**
    *   Receive `incomes` prop.
    *   Render a list of bars.
    *   Use `layout` prop on motion divs.
    *   **Crucial:** React Keys must track the *original index* of the value to animate the reordering correctly, not just the value itself (duplicates issue).
    *   *Strategy:* Pass objects `{ id: 1, value: 100 }` to track identity.

---

## 📉 Phase 3: The Lorenz Plot
**Goal:** The main educational visual.

### Step 3.1: Mafs Setup
*   **Action:** `LorenzPlot.tsx`.
*   **Visuals:**
    *   `<Coordinates.Cartesian>` (Range 0-1).
    *   `<Line>` (Diagonal, Dashed, Gray).
    *   `<Polygon>` (The Gini Gap / Area A).
        *   Points: $(0,0) \to (1,1) \to$ Lorenz Points Reversed.
        *   Color: Red (opacity 0.2).
    *   `<Plot.Line>` (The actual Lorenz Curve).
*   **Interactivity:** `<MovablePoint>` is NOT needed here. The plot is purely output.

### Step 3.2: Educational Annotations
*   **Action:** Add Text/Lines.
*   **Details:**
    *   Label axes "Kumulierter Bevölkerungsanteil ($u$)" and "Kumulierter Einkommensanteil ($v$)".
    *   Mark points $u_1 = 0.2$, $u_2 = 0.4$ etc.

---

## 🌍 Phase 4: Integration
*   **Action:** `LorenzView.tsx`.
*   **Layout:**
    *   **Top:** Title & Gini Coefficient (Big).
    *   **Middle Left:** Input Sliders & Sorted Bars (Side by Side). "Input $\to$ Sortierung".
    *   **Middle Right:** Lorenz Plot.
*   **Presets:** Add buttons "Perfekte Gleichheit", "Extremer Reichtum", "80/20".
