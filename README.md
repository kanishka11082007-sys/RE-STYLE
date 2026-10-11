# 🌿 Re:Style — Circular AI Fashion Studio & Design Engine

An AI-augmented creative atelier and circular pattern simulator transforming textile offcuts and fabric remnants into bespoke, functional goods. Built with **Google Gemini Multimodal Vision** for fiber identification, **TinyFish Real-Time Web Search** for live sustainable fashion trends, and **React + Vite + Express** for interactive zero-waste atelier blueprints.

---

## ✨ Features

- **🔍 Multimodal Fiber Vision Inspection**: Drop or upload any fabric swatch from your computer. Gemini Vision inspects weave structure, tactile texture, fiber composition, and estimated GSM weight.
- **🌐 Real-Time TinyFish Trend Research**: Queries live 2026 sustainable fashion trends tailored to the detected textile fiber (denim, silk, linen, wool, corduroy, velvet).
- **🎨 AI Zero-Waste Concept Generator**: Synthesizes 5 commercially viable clothing and accessory concepts with realistic fabric usage, production costs, and carbon/water diversion accounting.
- **✂️ Interactive Atelier Pattern Studio**: Set remnant dimensions, conditions, and color palettes to filter geometric cutting plans.
- **🚀 Single-Container Unified Production Deployment**: Express backend automatically serves built frontend assets in production for zero-config cloud deployments.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Vite
- **Backend**: Node.js, Express 5, `node-fetch`, `dotenv`
- **AI & Data Engines**:
  - Google Gemini Multimodal Vision & LLM (`gemini-3.6-flash`, `gemini-3.7-flash`, `gemini-3.5-flash`)
  - TinyFish Live Search API

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd re-style
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
PORT=5000
TINYFISH_API_KEY=your_tinyfish_api_key_here
LLM_API_KEY=your_gemini_api_key_here
```

### 3. Launch the Application
```bash
# Run both Frontend & Backend concurrently
npm run dev:all
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚢 Deployment Options (Full-Stack Unified)

The project is preconfigured so that in production, the Express backend serves the Vite production build (`dist/`) directly on `PORT`.

### Option A: 1-Click Render.com Web Service
1. Push this repository to your GitHub account.
2. In [Render.com](https://render.com), click **New + > Web Service** and connect your GitHub repository (or use the included `render.yaml` Blueprint).
3. Set the build and start commands:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
4. Add your Environment Secrets in Render's dashboard:
   - `TINYFISH_API_KEY`
   - `LLM_API_KEY`
5. Click **Deploy**. Your full-stack app will be live at `https://your-app.onrender.com`.

### Option B: Railway.app / Fly.io / Heroku
Simply connect your GitHub repo. The buildpack will run `npm run build` and launch `node server.js` automatically.

### Option C: Docker Container
```bash
docker build -t re-style .
docker run -p 5000:5000 --env-file .env re-style
```
Visit `http://localhost:5000`.

---

## 🔒 Security Note
Never commit your `.env` file containing live API keys. `.env` is included in `.gitignore` by default. Always configure API keys as environment variables in your hosting provider's dashboard.
