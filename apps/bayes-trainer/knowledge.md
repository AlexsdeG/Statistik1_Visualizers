# 🧠 Knowledge Base: Statistics (Bayes Trainer)

## 1. Project Identity & Goal
*   **Name:** `stats-bayes-trainer`
*   **Description:** An interactive tool to visualize conditional probabilities and the Base Rate Fallacy. It helps students understand why $P(K|T+)$ (Probability of being sick given a positive test) is surprisingly low when prevalence is low.
*   **Tech Stack:** React, SVG (Custom Implementation), Tailwind CSS.

---

## 2. Mathematical Logic (The "Bayes Engine")

### 📐 Variables
*   **Prävalenz ($P(K)$):** Probability of being Sick. (User Input).
*   **Sensitivität ($P(T+|K)$):** Probability of Positive Test IF Sick. (User Input).
*   **Spezifität ($P(T-|\bar{K})$):** Probability of Negative Test IF Healthy. (User Input).

### 🧮 Derived Values (The 4 Quadrants)
We visualize a total population of size $N$ (normalized to 1 or 100%).

1.  **True Positive (TP):** Sick people found by test.
    $$TP = P(K) \times \text{Sens}$$
2.  **False Negative (FN):** Sick people missed (Fatal error).
    $$FN = P(K) \times (1 - \text{Sens})$$
3.  **True Negative (TN):** Healthy people correctly identified.
    $$TN = (1 - P(K)) \times \text{Spec}$$
4.  **False Positive (FP):** Healthy people falsely alarmed (The "Boy Who Cried Wolf").
    $$FP = (1 - P(K)) \times (1 - \text{Spec})$$

### 🔑 The Target Metric: PPV
*   **Positiver Vorhersagewert (Positive Predictive Value):** If the alarm rings, how likely is it real?
    $$PPV = P(K|T+) = \frac{TP}{TP + FP}$$

---

## 3. Feature Specifications

### A. Input Controls (The Cockpit)
*   **Prevalence Slider:** Logarithmic or heavily weighted towards $0.1\% - 10\%$. Standard linear 0-50% sliders make it hard to select rare diseases.
*   **Sensitivity/Specificity Slider:** Linear $50\% - 99.9\%$.
*   **Live Readout:** Show the probabilities as percentages (e.g., "0.1%").

### B. Visualization 1: The Unit Square (Analytic View)
*   **Concept:** A $1 \times 1$ square representing the total population.
*   **Layout:**
    *   **Vertical Split:** Left part width = Prevalence (Sick), Right part width = 1-Prev (Healthy).
    *   **Horizontal Split (Left):** Top height = Sensitivity (TP), Bottom = FN.
    *   **Horizontal Split (Right):** Top height = 1-Specificity (FP), Bottom = TN.
    *   *Note:* Usually FP is drawn at the top to compare it easily with TP side-by-side.
*   **Color Coding:**
    *   **Sick ($K$):** Red base color.
    *   **Healthy ($\bar{K}$):** Green base color.
    *   **Test Positive ($T+$):** Saturated/Dark color.
    *   **Test Negative ($T-$):** Desaturated/Light color.

### C. Visualization 2: The Population Grid (Intuition View)
*   **Concept:** 1000 Dots ($25 \times 40$ grid).
*   **Logic:**
    *   Calculate number of dots for each category (round to nearest integer).
    *   Sort them for clarity (e.g., all TP top-left).
    *   **Style:**
        *   🔴 Solid Red = Sick & Detected (TP).
        *   ⭕ Hollow Red = Sick & Missed (FN).
        *   🟢 Hollow Green = Healthy & Correct (TN).
        *   🔴 Solid Green (or Red Border on Green) = Healthy but Alarm (FP).
*   **Interaction:** Hovering a group highlights the corresponding numbers.

---

## 4. Technical Implementation Details

### A. SVG Architecture
Do not use `div`s for 1000 dots (performance). Use `<svg>` with `<circle>` elements.
*   **Unit Square:** 4 `<rect>` elements inside an SVG `viewBox="0 0 100 100"`.
*   **Coordinate Calculation:** Simple percentage math.

### B. "The Aha-Moment" (Dynamic Text)
We need a text component that updates dynamically:
> "Von **1.000** Personen sind **[X]** krank.
> Der Test schlägt bei **[Y]** Personen an.
> Aber davon sind nur **[Z]** wirklich krank!"
> $\to$ **[PPV]% Wahrscheinlichkeit.**

### C. Scale Handling
*   Input `0.1%` means `0.001`.
*   Visualizing `0.001` in a grid of 1000 dots is exactly **1 dot**.
*   If Prevalence < 0.1%, show a warning: "Population zu klein für 1000-Punkte-Raster. Nutze das Einheitsquadrat."

---

## 5. ⚠️ Attention Points

1.  **Color Blindness:**
    *   Red/Green is the classic problem.
    *   **Fix:** Use High Contrast. E.g., "Sick" = Orange/Red, "Healthy" = Blue/Teal. Or use Pattern/Shape differences (Filled vs Hollow).
    *   Let's stick to **Red (Sick)** and **Teal (Healthy)** for better accessibility than pure Green.

2.  **Slider UX:**
    *   Users will try to set "100%" Specificity. This leads to Division by Zero in some Bayes formulations (Odds Ratio), though standard PPV ($TP/TP+0$) handles it fine ($PPV=100\%$). Just ensure the UI handles $100\%$ cleanly.

3.  **Layout on Mobile:**
    *   The Unit Square needs to be square. On mobile, ensure width matches height to prevent distortion.
