
# 📋 Implementation Plan: Statistics (Correlation)

## 📂 Structure
Create module folder `src/modules/statistics/correlation/`.

```text
src/modules/statistics/correlation/
├── components/
│   ├── GameBoard.tsx       # The Guessing UI
│   ├── SandboxBoard.tsx    # The Clicking UI
│   ├── StatsPanel.tsx      # Shows r, y=ax+b
│   └── ScatterPlot.tsx     # Reusable Mafs component
├── hooks/
│   ├── useRegression.ts    # Math Logic
│   └── usePointGenerator.ts # For the game
└── CorrelationView.tsx     # Tab Container
```

---

## 🏗️ Phase 1: Math & Logic
**Goal:** Solid regression engine.

### Step 1.1: Regression Hook
*   **Action:** `useRegression.ts`.
*   **Input:** `points: {x, y}[]`.
*   **Output:** `{ r, m, b, isValid }`.
*   **Logic:** Implement standard least squares formulas. Handle $N=0$ or $N=1$ gracefully (`isValid: false`).

### Step 1.2: Generator Hook
*   **Action:** `usePointGenerator.ts`.
*   **Function:** `generateCloud(targetR, count = 50)`.
*   **Algorithm:**
    *   Generate random normal data.
    *   Apply Cholesky transform (or simple mixing).
    *   **Crucial:** Shift/Scale results to fit in $[0, 10]$ box.
    *   Return the points.

---

## 🎲 Phase 2: The Game Mode
**Goal:** Intuition training.

### Step 2.1: Game Board UI
*   **Action:** `GameBoard.tsx`.
*   **State:** `targetPoints` (Array), `userGuess` (number), `revealed` (boolean).
*   **Visuals:**
    *   `<ScatterPlot>` (Mafs) showing points.
    *   If `revealed`: Overlay Regression Line (Green).
*   **Controls:**
    *   Slider (-1 to 1).
    *   "Guess" Button.
    *   "Next Round" Button.

### Step 2.2: Scoring & Feedback
*   **Logic:** Calculate difference.
    *   Diff < 0.05: "Godlike!"
    *   Diff < 0.1: "Great!"
    *   Else: "Try again."
*   **Visual:** Show actual $r$ on the slider as a marker vs. user guess.

---

## 🛠️ Phase 3: The Sandbox Mode
**Goal:** Hands-on experimentation.

### Step 3.1: Interactive Plot
*   **Action:** `SandboxBoard.tsx`.
*   **Interaction:**
    *   Implement coordinate transform logic (Pixel $\to$ Mafs Coords).
    *   `onClick`: Add `{x, y}` to state.
*   **Visuals:**
    *   Points (Blue).
    *   Regression Line (Red, live updating).
    *   Ghost Line (from cursor to regression line - residuals? Optional advanced feature).

### Step 3.2: Stats Display
*   **Action:** `StatsPanel.tsx`.
*   **Content:**
    *   Display Correlation coefficient $r$ (Color coded: Red=Negative, Green=Positive).
    *   Display Equation $y = mx + b$.
    *   "Clear All" button.

### Step 3.3: Presets
*   **Action:** Add buttons to load specific shapes into the Sandbox.
*   **Shapes:** "Parabola", "Circle", "Perfect Line", "Anscombe's Quartet (Simplified)".

---

## 🌍 Phase 4: Integration
*   **Action:** `CorrelationView.tsx`.
*   **Tabs:** "Guessing Game" vs "Sandbox".
*   **Refinement:** Add tooltips explaining $r$ range.
