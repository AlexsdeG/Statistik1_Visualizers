# Statistik 1 Visualizers

A collection of interactive web applications designed to help students understand core concepts of **Statistik 1** (Introduction to Statistics). These tools provide visual and hands-on ways to explore complex statistical theories and experiments.

## 🚀 Available Apps

The project currently features 5 interactive visualizers:

| App | Description | Link |
| :--- | :--- | :--- |
| **Bayes Trainer** | Master Bayes' Theorem with step-by-step interactive scenarios. | [View App](apps/bayes-trainer/README.md) |
| **CLT Simulator** | Visualize the Central Limit Theorem and how distributions converge to normality. | [View App](apps/stats-clt-simulator/README.md) |
| **Correlation Guesser** | Improve your intuition about Pearson correlation coefficients ($r$) through a game. | [View App](apps/stats-correlation-guesser/README.md) |
| **Distribution Zoo** | Explore various probability distributions and their parameters in real-time. | [View App](apps/stats-distribution-zoo/README.md) |
| **Lorenz Constructor** | Build Lorenz curves and calculate the Gini coefficient to understand inequality. | [View App](apps/stats-lorenz-constructor/README.md) |

## 🛠 Project Structure

This is a monorepo containing multiple independent React applications. Each app is located in the `apps/` directory and has its own `package.json` and configuration.

```text
Statistik1_Visualizers/
├── apps/
│   ├── bayes-trainer/
│   ├── stats-clt-simulator/
│   ├── stats-correlation-guesser/
│   ├── stats-distribution-zoo/
│   └── stats-lorenz-constructor/
└── README.md (you are here)
```

## 💻 Local Development

Each app can be run independently. Navigate to any app directory and follow the instructions in its specific README.

### General Steps (using pnpm)

1. **Navigate to an app**:
   ```bash
   cd apps/stats-distribution-zoo
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Run in development mode**:
   ```bash
   pnpm dev
   ```

## 📦 Tech Stack

Most apps in this repository share a modern web stack:

- **React** for the user interface.
- **TypeScript** for type safety.
- **Vite** for fast builds and development.
- **Tailwind CSS** for responsive design.
- **Recharts** for data visualization and plotting.

---
Created for educational purposes at University.
