
# 🧠 Knowledge Base: Statistics (Correlation Guesser)

## 1. Project Identity & Goal
*   **Name:** `stats-correlation-guesser`
*   **Description:** A dual-mode app. "Game Mode" trains visual intuition for Pearson's correlation coefficient ($r$). "Sandbox Mode" allows users to place points and see how outliers or patterns (like parabolas) affect the linear regression line and $r$.
*   **Tech Stack:** React, Mafs (Scatterplot), Custom Math (Least Squares).

---

## 2. Mathematical Logic

### 📉 A. Linear Regression (Least Squares)
Given $n$ points $(x_i, y_i)$:
1.  **Means:** $\bar{x}, \bar{y}$.
2.  **Variances ($s^2$):** $s_x^2 = \frac{1}{n-1}\sum (x_i - \bar{x})^2$.
3.  **Covariance ($s_{xy}$):** $s_{xy} = \frac{1}{n-1}\sum (x_i - \bar{x})(y_i - \bar{y})$.
4.  **Correlation ($r$):**
    $$r = \frac{s_{xy}}{s_x \cdot s_y}$$
    Range: $[-1, 1]$.
5.  **Regression Line ($y = a + bx$):**
    *   Slope $b = s_{xy} / s_x^2 = r \cdot (s_y / s_x)$.
    *   Intercept $a = \bar{y} - b\bar{x}$.

### 🎲 B. Generating Correlated Data
To generate $(X, Y)$ with target correlation $\rho$:
1.  Generate random $X \sim \mathcal{N}(0, 1)$.
2.  Generate random noise $Z \sim \mathcal{N}(0, 1)$.
3.  Construct $Y = \rho X + \sqrt{1-\rho^2}Z$.
4.  Scale and shift to fit the visual graph (e.g., mean 5, range 0-10).

---

## 3. Feature Specifications

### Mode 1: The Game (Guess R)
*   **Flow:**
    1.  App generates 50-100 random points with a random target $r \in [-1, 1]$.
    2.  User sees the cloud (no line).
    3.  User guesses $r$ via a Slider (-1 to 1) or specific Buttons.
    4.  **Reveal:** Show the actual $r$ and the Regression Line.
    5.  **Score:** $|Guess - Actual|$. Smaller diff = Higher score.

### Mode 2: The Sandbox (Interactive)
*   **Interaction:**
    *   Click anywhere on the grid $\to$ Add point.
    *   Right-click point $\to$ Remove point (or "Undo" button).
    *   "Clear" button.
*   **Live Feedback:**
    *   Display $r$ (Big).
    *   Draw the Regression Line immediately.
    *   Display equation $y = ax + b$.
*   **Educational Challenges (Presets):**
    *   "Click the Outlier": Loads a perfect line ($r=1$), user adds one point far away, $r$ drops to $0.5$.
    *   "The Parabola": Loads a U-shape, $r \approx 0$. Shows that $r=0$ does not mean "no relationship", just "no *linear* relationship".

---

## 4. Technical Implementation Details

### A. Coordinate System
*   Fix the domain for simplicity: $x \in [0, 10], y \in [0, 10]$.
*   Mafs `viewBox={{ x: [-1, 11], y: [-1, 11] }}`.

### B. Click Interaction (The Transparent Layer)
*   Mafs doesn't expose a simple "OnCoordinateClick".
*   **Strategy:** Wrap `<Mafs>` in a `div` with `relative`. Place an absolute, transparent `div` on top with `onClick`.
*   **Coordinate Math:**
    *   Get `rect = e.currentTarget.getBoundingClientRect()`.
    *   `x_pixel = e.clientX - rect.left`.
    *   Map pixel range $[0, width]$ to coordinate range $[-1, 11]$.

### C. Math Hook (`useRegression.ts`)
```typescript
// Inputs: Point[]
// Outputs:
{
  r: number;       // The correlation
  m: number;       // Slope
  b: number;       // Intercept
  predict: (x) => y; // Helper for plotting line
}
```
*   Handle edge cases: $n < 2$ (return null), $s_x = 0$ (vertical line, infinite slope).

---

## 5. ⚠️ Attention Points

1.  **Game Difficulty:**
    *   Estimating $r$ is hard. $r=0.7$ often looks like $r=0.4$ to beginners.
    *   **UX:** Give feedback like "Close!" or "Way off!". Show the "Error" visually on the slider.

2.  **Visual Overlap:**
    *   In Sandbox mode, if points are too close, they overlap.
    *   Use semi-transparent colors for points (`fillOpacity={0.6}`) so clusters appear darker.

3.  **Performance:**
    *   Recalculating regression on every mouse click is fine (for $N < 1000$). No WebWorkers needed.
