# European Roulette Simulator & Prediction Web Application

A sophisticated European Roulette simulator and statistical analysis web application that runs large-scale simulations (10K, 150K, 350K, 500K, and 1M spins) to generate comprehensive statistics and provide "next number" predictions based on historical patterns.

## 🚀 Live Demo

**[Try it now on Railway](https://roulettesimulatorim2525-production.up.railway.app/)** 🎰

> Fully responsive • Works on mobile, tablet, and desktop

## Features

### 🎰 Simulation Engine
- Multiple simulation scales: 10K, 150K, 350K, 500K, and 1M spins
- Cryptographically secure random number generation
- Real-time progress tracking with animated progress bars
- Web Workers for background processing (prevents UI blocking)

### 📊 Statistical Analysis
- **Color Distribution**: Red, Black, and Green (0) frequency analysis
- **Number Range Statistics**: Low/High, Odd/Even distribution
- **Dozen Statistics**: Analysis of 1st, 2nd, and 3rd dozens
- **Column Statistics**: Frequency analysis for all three columns
- **Sector Analysis**: Voisins du Zéro, Tiers du Cylindre, Orphelins, Zero Game
- **Streak Analysis**: Longest streaks for colors, odds/evens, and dozens
- **Number Heatmap**: Visual frequency distribution of all 37 numbers

### 🔮 Prediction System
- Most probable next number prediction with confidence scores
- Hot numbers (most frequently appearing)
- Cold numbers (least frequently appearing)
- Neighbor analysis (physically adjacent numbers on the wheel)
- Top 5 predictions with reasoning

### 🎨 Modern UI/UX
- Dark theme with gold/green accents (casino aesthetic)
- Glassmorphism effects for cards and panels
- Smooth animations using Framer Motion
- Interactive 3D roulette wheel
- Fully responsive design (mobile-first)

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State Management**: React Hooks
- **Web Workers**: For heavy simulations

## Getting Started

### Prerequisites
- Node.js 20+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
roulette-simulator/
├── src/
│   ├── components/
│   │   ├── RouletteWheel.tsx
│   │   ├── NumberInput.tsx
│   │   ├── SimulationControls.tsx
│   │   ├── PredictionPanel.tsx
│   │   ├── charts/
│   │   ├── analytics/
│   │   └── layout/
│   ├── hooks/
│   │   ├── useSimulation.ts
│   │   ├── useStatistics.ts
│   │   └── usePrediction.ts
│   ├── utils/
│   │   ├── rouletteEngine.ts
│   │   ├── statisticsCalculator.ts
│   │   ├── predictionAlgorithm.ts
│   │   └── constants.ts
│   ├── workers/
│   │   └── simulationWorker.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Deployment to Railway

This project is configured to deploy automatically using Docker:

1. **Connect Repository**: Link your GitHub repository to Railway
2. **Automatic Detection**: Railway will detect the `Dockerfile` automatically
3. **Build & Deploy**: The app builds in two stages:
   - Stage 1: Node.js builds the React app
   - Stage 2: Nginx serves the static files
4. **Generate Domain**: Set target port to `8080` and generate a public domain
5. **Done!** Your app will be live in ~3-5 minutes

### Configuration

- **Port**: 8080 (configured in Dockerfile and nginx.conf)
- **Build**: Multi-stage Docker build (Node → Nginx)
- **Nginx**: Optimized for SPA routing with gzip compression
- **No environment variables required** for basic functionality

## Usage

1. **Run a Simulation**: Click one of the simulation size buttons (10K, 150K, 350K, 500K, or 1M)
2. **Enter Numbers**: Use the number input field or click numbers on the roulette wheel
3. **View Statistics**: Statistics are automatically calculated and displayed
4. **Get Predictions**: Predictions are generated based on the simulation results and input numbers
5. **Explore Analytics**: Switch to the "Advanced Analytics" tab for detailed sector and streak analysis

## Performance

- Initial Load: < 2 seconds
- Time to Interactive: < 3 seconds
- Simulation Speed: 10K spins in < 1 second
- Large simulations (1M+) use Web Workers to prevent UI blocking

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for educational and entertainment purposes only.

## Disclaimer

This application is designed for educational and entertainment purposes. Roulette outcomes are random, and past results do not influence future outcomes. Gambling should be done responsibly and legally.
