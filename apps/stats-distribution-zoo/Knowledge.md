# 🧠 Knowledge Base: Statistics (Distribution Zoo)

## 1. Project Identity & Goal
*   **Name:** `stats-distribution-zoo`
*   **Description:** An interactive explorer for statistical distributions. It visualizes Probability Mass Functions (PMF) for discrete and Probability Density Functions (PDF) for continuous distributions.
*   **Key Educational Value:** Understanding the shape changes based on parameters and visualizing Cumulative Probability (CDF) tasks ("At least X").
*   **Tech Stack:** React, Mafs (Hybrid: Discrete Bars + Continuous Curves), Math.js.

---

## 2. Mathematical Logic (The "Stochastics Engine")

### 🎲 A. Supported Distributions
1.  **Binomial ($B_{n,p}$):**
    *   Domain: $k \in \{0, \dots, n\}$.
    *   $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$.
    *   *Limit:* Approaches Normal if $n \to \infty$.
2.  **Poisson ($\pi_\lambda$):**
    *   Domain: $k \in \{0, 1, \dots, \infty\}$ (Practically cut off at $k$ where $P \approx 0$).
    *   $P(X=k) = \frac{\lambda^k}{k!} e^{-\lambda}$.
    *   *Use case:* Rare events.
3.  **Geometric ($G_p$):**
    *   **Convention Warning:** In German exams, usually "Trials until first success" ($k \in \{1, 2, \dots\}$).
    *   $P(X=k) = (1-p)^{k-1} p$.
4.  **Hypergeometric ($H_{N,M,n}$):**
    *   Model: Urn with $N$ balls, $M$ are red, draw $n$ without replacement.
    *   $P(X=k) = \frac{\binom{M}{k} \binom{N-M}{n-k}}{\binom{N}{n}}$.
5.  **Normal ($\mathcal{N}_{\mu, \sigma^2}$):**
    *   Continuous!
    *   $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$.

### 🔢 B. Cumulative Logic (The "At Least" Problem)
*   **Highlight Range:** User selects range $[a, b]$.
*   **Calculation:** Sum of $P(X=k)$ for $a \le k \le b$.
*   **Visual:** Bars strictly inside this range turn a different color (e.g., Orange).

---

## 3. Feature Specifications

### Module 1: The Control Panel (Sidebar)
*   **Distribution Select:** Dropdown (Binomial, Poisson, ...).
*   **Dynamic Sliders:**
    *   If Binomial: Sliders for $n$ (1-100), $p$ (0-1).
    *   If Poisson: Slider for $\lambda$ (0.1-20).
    *   If Normal: Sliders for $\mu$, $\sigma$.
*   **Range Mode Toggle:** Checkbox "Bereich berechnen".
    *   If active: Show Min/Max Sliders (or Input fields).

### Module 2: The Graph (Mafs)
*   **Discrete Rendering:**
    *   Do not use `<Plot.OfX>`.
    *   Use `array.map` to render `<Line>` segments from $(k, 0)$ to $(k, P(k))$.
    *   Add a visual "Head" (Point) at the top of the line for aesthetics (Lollipop Chart).
*   **Continuous Rendering:**
    *   Use `<Plot.OfX>` for Normal distribution.
*   **Hybrid Feature (The "Moivre-Laplace" Switch):**
    *   If Binomial is selected, allow toggling a "Show Normal Approximation" overlay.
    *   Auto-calculate $\mu = n \cdot p$ and $\sigma = \sqrt{n \cdot p \cdot (1-p)}$.

### Module 3: Tooltips & Info
*   **Hover Interaction:**
    *   Since Mafs `<Line>` handles hover events, show a tooltip: "k=5, P=15.3%".
*   **Summary Box:**
    *   Show Expected Value ($E(X)$) and Variance ($Var(X)$) dynamically.
    *   Show "Sum Probability" for the selected range.

---

## 4. Technical Implementation Details

### A. Performance Optimization
*   **Pre-calculation:** When $n$ or parameters change, re-calculate the *entire* array of probabilities in a `useMemo`. Do not calculate inside the render loop of the visual components.
*   **Cutoff:** For Poisson/Geometric (infinite domain), stop calculating when $P(k) < 0.0001$.

### B. Math Helpers (`distribution-utils.ts`)
```typescript
import { combinations, factorial } from 'mathjs';

export const getBinomialPMF = (n: number, p: number) => {
  const data = [];
  for (let k = 0; k <= n; k++) {
    // Implement mathjs combinations(n, k) * p^k * ...
    // Store as { x: k, y: prob }
  }
  return data;
};
// ... other distributions
```

### C. Scaling
*   The Y-Axis for probabilities is usually $0$ to $0.5$ (or $1$ for small $n$).
*   The X-Axis depends on $n$ or $\lambda$.
*   **Auto-Zoom:** Use `Mafs` `viewBox` prop. Calculate `maxY` and `maxX` from the data and pass it to `viewBox` to keep the chart centered.

---

## 5. ⚠️ Attention Points

1.  **Discrete vs Continuous:**
    *   Binomial is defined only at integers. Do not connect the dots! That implies continuity. Use "Lollipops" (Sticks with dots).
    *   Normal is continuous lines.

2.  **Edge Cases:**
    *   $p=0$ or $p=1$ in Binomial.
    *   $k > n$ logic (Probability 0).

3.  **Hypergeometric Constraints:**
    *   Ensure $M \le N$ and $n \le N$. The sliders must be interdependent (e.g., if $N$ decreases, clamp $M$ and $n$).
