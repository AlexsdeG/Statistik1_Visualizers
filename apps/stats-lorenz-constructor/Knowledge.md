# 🧠 Knowledge Base: Statistics (Lorenz & Gini)

## 1. Project Identity & Goal
*   **Name:** `stats-lorenz-constructor`
*   **Description:** An interactive playground to construct Lorenz curves. Users manipulate the income of individuals and see how inequality manifests geometrically as the "Gini Gap" (Area A).
*   **Tech Stack:** React, Mafs (Curve), Framer Motion (Sorting Animation), Radix UI (Sliders).

---

## 2. Mathematical Logic (The "Gini Engine")

### 📊 A. Data Preparation
*   **Input:** Vector $X = [x_1, x_2, \dots, x_n]$ (Incomes).
*   **Step 1: Sorting.** $x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$. (Essential! The curve must be convex).
*   **Step 2: Cumulative Sums.**
    *   Total Income: $S = \sum x_i$.
    *   Cumulated Income: $Y_j = \sum_{i=1}^j x_{(i)}$.
    *   Relative Share (y-axis): $v_j = Y_j / S$. (Start at $v_0 = 0$).
*   **Step 3: Population Share.**
    *   Relative Pop (x-axis): $u_j = j / n$. (Start at $u_0 = 0$).

### 📉 B. The Lorenz Curve
*   **Points:** Plot $(u_j, v_j)$ for $j=0 \dots n$.
*   **Diagonal:** Line from $(0,0)$ to $(1,1)$. Represents Perfect Equality ($v_j = u_j$).
*   **Area A:** The area *between* the Diagonal and the Lorenz Curve.
*   **Area B:** The area *under* the Lorenz Curve.

### 📐 C. Gini Coefficient
*   **Definition:** $G = \frac{\text{Area A}}{\text{Area Triangle}}$. Since the triangle area is 0.5, $G = 2 \cdot A$.
*   **Calculation (Trapezoidal Rule):**
    We calculate Area B first (sum of trapezoids):
    $$B = \sum_{i=1}^n \frac{(v_{i-1} + v_i) \cdot (u_i - u_{i-1})}{2}$$
    Since equidistributed population ($u_i - u_{i-1} = 1/n$):
    $$B = \frac{1}{2n} \sum_{i=1}^n (v_{i-1} + v_i)$$
    Then $G = 1 - 2B$.

---

## 3. Feature Specifications

### Module 1: The Input Deck (5 Citizens)
*   **UI:** 5 Vertical Sliders side-by-side.
*   **Interaction:** Dragging a slider changes that "citizen's" income.
*   **Visual Aid:** Display the raw value on top of the slider.
*   **Constraint:** Values $\ge 0$.

### Module 2: The Sorting Machine (Animation)
*   **Concept:** Lorenz curves *require* sorted data.
*   **Visual:**
    *   Left side: "Your Input" (Unsorted, matching sliders).
    *   Right side: "Sorted for Lorenz" (Ascending bars).
    *   **Animation:** When user drags a slider, the "Sorted" bars visually reorder themselves using `framer-motion`. This emphasizes the sorting step.

### Module 3: The Lorenz Plot (Mafs)
*   **Axes:** $u$ (Population, 0 to 1) and $v$ (Income Share, 0 to 1).
*   **Elements:**
    *   **Dashed Line:** Diagonal (Perfect Equality).
    *   **Solid Line:** Lorenz Curve connecting points $(u_i, v_i)$.
    *   **Polygon (Red):** Area A (Vertices: $(0,0) \to (1,1) \to$ points reversed $\to (0,0)$).
    *   **Points:** Highlights at each $u_i$.

### Module 4: Live Metrics
*   **Gini Index:** Big number display ($0.00$ to $1.00$).
*   **Interpretation:** Text feedback (e.g., "0.45 - Strong Inequality").

---

## 4. Technical Implementation Details

### A. State Management
*   Use a simple array `const [incomes, setIncomes] = useState([10, 10, 10, 10, 10]);`.
*   **Important:** The slider index corresponds to the *unsorted* array index.

### B. Math Helpers
```typescript
export const calculateLorenzPoints = (data: number[]) => {
  const sorted = [...data].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  if (sum === 0) return []; // Avoid division by zero

  let currentSum = 0;
  const points = [{ u: 0, v: 0 }];

  sorted.forEach((val, index) => {
    currentSum += val;
    points.push({
      u: (index + 1) / sorted.length,
      v: currentSum / sum
    });
  });
  return points;
};
```

---

## 5. ⚠️ Attention Points

1.  **The "Zero Sum" Edge Case:**
    *   If all incomes are 0, division by zero occurs ($v_i = 0/0$).
    *   **Fix:** Ensure at least one income is $>0$, or handle Gini as $0$ (undefined actually, but 0 is safe UI wise) if Sum is 0.

2.  **Visual Scaling:**
    *   If one citizen has 1.000.000€ and others 10€, the small bars become invisible.
    *   **Fix:** Use a logarithmic scale for the *visual height* of bars, OR just accept linear and let the user see how "invisible" the poor become (educational). **Decision:** Keep linear. The invisibility of the poor is part of the lesson.

3.  **Responsiveness:**
    *   5 Sliders need width. On mobile, maybe stack them or use horizontal sliders.
