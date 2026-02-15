# 🧠 Knowledge Base: Statistics (CLT Simulator)

## 1. Project Identity & Goal
*   **Name:** `stats-clt-simulator`
*   **Description:** A simulation tool for the Central Limit Theorem (Zentraler Grenzwertsatz). It demonstrates that the sum of independent random variables (indices of a coin/die) converges to a Normal Distribution, regardless of the underlying distribution.
*   **Tech Stack:** React, Mafs (Histogram + Overlay Curve), TypeScript (Simulation Logic).

---

## 2. Mathematical Logic (The "Magic" Engine)

### 🎲 A. The Experiment
*   **Underlying Distribution:** Discrete Uniform (Dice Roll $1..6$).
    *   $\mu_{single} = 3.5$
    *   $\sigma^2_{single} = \frac{35}{12} \approx 2.917$
*   **Process:**
    1.  User selects sample size $n$ (e.g., $n=30$ dice per trial).
    2.  System simulates one trial: Roll $n$ dice, calculate Sum $S$.
    3.  Repeat this $k$ times (e.g., $k=1000$ trials).
    4.  Store frequency of each Sum $S$.

### 📉 B. The Theory (Prediction)
According to CLT, the Sum $S_n$ approximates $\mathcal{N}(\mu_{sum}, \sigma_{sum})$.
*   **Theoretical Mean:** $\mu_{sum} = n \cdot 3.5$
*   **Theoretical SD:** $\sigma_{sum} = \sqrt{n \cdot 2.917}$
*   **Scaling:** The Normal PDF integrates to 1. Our Histogram integrates to $k$ (total trials). We must scale the PDF by $k$ to overlay it visually.

---

## 3. Feature Specifications

### Module 1: The Simulator Controls
*   **Sample Size ($n$):** Slider (1 to 100). *Note: Changing this resets the data.*
*   **Trigger Buttons:**
    *   "Throw 1x" (Animation/Step-by-step).
    *   "Throw 100x" (Fast fill).
    *   "Throw 1000x" (Instant Bell Curve).
*   **Reset:** Clear all data.

### Module 2: The Visualization (Mafs)
*   **X-Axis:** Represents the Sum values. Needs dynamic range $[\mu - 4\sigma, \mu + 4\sigma]$.
*   **Y-Axis:** Represents Frequency (Count).
*   **Histogram:**
    *   Rendered as rectangle bars centered on integers.
    *   Color: Blue (semitransparent).
*   **Overlay Curve:**
    *   Orange Line: The Theoretical Gaussian $\mathcal{N}(\mu_{sum}, \sigma_{sum})$.
    *   Equation: $y(x) = k \cdot \text{NormalPDF}(x, \mu_{sum}, \sigma_{sum})$.

### Module 3: Live Statistics
*   **Comparison:** Show "Empirical Mean vs. Theoretical Mean".
*   **Insight:** When $n=1$, the histogram is flat (Uniform). The curve looks nothing like it. When $n \ge 30$, they match perfectly.

---

## 4. Technical Implementation Details

### A. Data Structure
*   Do not store an array of all outcomes `[3, 4, 3, 10, ...]`. Memory inefficient.
*   Store a **Frequency Map**: `Record<number, number>` (Map `Sum -> Count`).
*   Example: `{ 7: 15, 8: 20, ... }`.

### B. Auto-Scaling Logic
*   Mafs requires explicit `viewBox={{ x: [min, max], y: [0, maxCount] }}`.
*   **X-Range:** Determine min/max keys from the Frequency Map. Add padding.
*   **Y-Range:** Determine max value from Map. Add padding (for the curve peak).

### C. Performance
*   Generating 1000 trials of 50 dice = 50,000 `Math.random()` calls. This is fast.
*   However, React State updates should be batched. Don't update state 1000 times inside a loop. Update once after the loop finishes.

---

## 5. ⚠️ Attention Points

1.  **The "Bar Width" Issue:**
    *   Since sums are integers, bars should have width 1.
    *   In Mafs, a bar at $x=10$ should span $[9.5, 10.5]$.
    *   Ensure the Curve is plotted over $x$, not discrete steps, for smoothness.

2.  **Reset Behavior:**
    *   Crucial: If user changes $n$ (dice count), the old sums (e.g., around 10) are invalid for the new range (e.g., around 100). **Must** auto-reset the simulation.

3.  **Visual Noise:**
    *   With low trial counts ($k < 50$), the histogram looks messy. This is part of the learning (Law of Large Numbers needed for the shape to stabilize). Don't smooth it artificially!