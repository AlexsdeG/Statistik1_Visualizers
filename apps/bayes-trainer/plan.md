# 📋 Implementation Plan: Statistics (Bayes)

## 📂 Structure
Create a new module folder.

```text
src/modules/statistics/
├── components/
│   ├── BayesControls.tsx       # Sliders
│   ├── UnitSquare.tsx          # The Rect visualization
│   ├── PopulationGrid.tsx      # The 1000 dots visualization
│   └── ResultSummary.tsx       # The text explanation
├── hooks/
│   └── useBayesLogic.ts        # The math engine
└── views/
    └── BayesView.tsx           # The main tab
```

---

## 🏗️ Phase 1: Logic & State
**Goal:** Calculate the 4 probabilities correctly.

### Step 1.1: Math Hook
*   **Action:** Create `useBayesLogic.ts`.
*   **Inputs:** `prevalence` (0-1), `sensitivity` (0-1), `specificity` (0-1), `populationSize` (default 1000).
*   **Outputs:**
    *   `tp`, `fn`, `fp`, `tn` (Absolute numbers for population).
    *   `ppv` (Positive Predictive Value 0-1).
    *   `npv` (Negative Predictive Value 0-1).
    *   `prob_test_pos` (Total probability of positive test).
*   **Test:**
    *   Input: Prev=0.01 (1%), Sens=0.9, Spec=0.9.
    *   Expect: TP=9, FN=1, TN=891, FP=99. PPV = 9 / (9+99) ≈ 8.3%.

---

## 🟥 Phase 2: The Visuals
**Goal:** Render the data.

### Step 2.1: The Unit Square (Rects)
*   **Action:** Create `UnitSquare.tsx`.
*   **Tech:** SVG.
*   **Logic:**
    *   `Rect 1 (TP)`: x=0, y=0, width=Prev, height=Sens. Color: Strong Red.
    *   `Rect 2 (FN)`: x=0, y=Sens, width=Prev, height=1-Sens. Color: Faint Red.
    *   `Rect 3 (FP)`: x=Prev, y=0, width=1-Prev, height=1-Spec. Color: Strong Teal (False Alarm!).
    *   `Rect 4 (TN)`: x=Prev, y=1-Spec, width=1-Prev, height=Spec. Color: Faint Teal.
*   **Labels:** Add text overlays centered in the rects if they are big enough (e.g., "TP").

### Step 2.2: The Population Grid (Dots)
*   **Action:** Create `PopulationGrid.tsx`.
*   **Tech:** SVG with 1000 `<circle>`.
*   **Logic:**
    *   Generate array of 1000 items with types `['tp', 'tp', ..., 'fp', ..., 'tn']`.
    *   Map to Grid coordinates ($x = i \% 25, y = \lfloor i / 25 \rfloor$).
    *   **Styling:**
        *   TP: Filled Red Circle.
        *   FN: Red Stroke, Empty Fill.
        *   FP: Filled Teal Circle (maybe with Red Stroke to indicate "Alarm").
        *   TN: Teal Stroke, Empty Fill (or very faint fill).

---

## 🎛️ Phase 3: Integration & UX
**Goal:** Make it playable.

### Step 3.1: The Sliders
*   **Action:** Create `BayesControls.tsx`.
*   **Details:**
    *   **Prevalence:** Needs special handling. Maybe a "Log Scale" or just a slider that maps $0..100$ input to $0..50\%$ output non-linearly.
    *   **Sensitivity/Specificity:** Standard sliders.

### Step 3.2: The Narrative
*   **Action:** Create `ResultSummary.tsx`.
*   **Content:**
    *   "Prävalenz: Nur 1 von 1000 ist krank."
    *   "Test: Der Test schreit bei 50 Leuten 'Alarm!'."
    *   "Fehler: Davon sind aber 49 gesund (Falsch-Positiv)."
    *   **Headline:** Big bold PPV value.

### Step 3.3: Assembly
*   **Action:** `BayesView.tsx`.
*   **Layout:**
    *   Left Column: Controls.
    *   Center: Visualization (Toggle between Square/Grid).
    *   Right/Bottom: Narrative Text.

---

## 🌍 Phase 4: Final Polish
*   **Translations:** "Sensitivität", "Spezifität", "Wahrscheinlichkeit".
*   **Responsiveness:** Ensure SVG scales on mobile.
