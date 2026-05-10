# Early Sepsis Detection System

A full-stack Early Sepsis Detection application with a modular Python ML backend and a React + Vite frontend.

---

## Project Structure

```
Sepsis_Model/
├── model/                      # ML pipeline
│   ├── train.py                # Training entry point
│   ├── predict.py              # Inference pipeline
│   ├── preprocess.py           # Imputation & patient aggregation
│   ├── feature_engineering.py  # Diff & rolling mean features
│   └── model_loader.py         # Singleton artifact loader
├── utils/
│   ├── config.py               # Paths and constants
│   └── helpers.py              # Logger, custom exceptions
├── artifacts/                  # Auto-generated after training
│   ├── model.pkl
│   ├── scaler.pkl
│   ├── threshold.json
│   ├── medians.json
│   └── numeric_means.json
├── data/
│   └── raw/Dataset.csv         # Place your dataset here
├── notebooks/original.ipynb    # Source Jupyter notebook
├── frontend/                   # React + Vite frontend
├── main.py                     # CLI entry point
├── api.py                      # FastAPI server
├── sample_input.json           # Example prediction payload
└── requirements.txt
```

---

## Prerequisites

- Python 3.9+
- Node.js 18+ and npm

---

## Backend Setup

### 1. Create and activate a virtual environment

```bash
python -m venv .venv
```

**Windows:**
```bash
.venv\Scripts\activate
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

### 2. Install Python dependencies

```bash
pip install -r requirements.txt
```

> Also install the API server dependencies if not already present:
> ```bash
> pip install fastapi uvicorn pydantic
> ```

---

## Train the ML Model

Ensure the dataset is placed at `data/raw/Dataset.csv`, then run:

```bash
python main.py --train
```

This will:
- Preprocess and feature-engineer the dataset
- Train 5 models (Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM)
- Select the best model by F1-score with optimal threshold tuning
- Save all artifacts to `artifacts/`

---

## Run the Backend API

```bash
uvicorn api:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`

### Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/predict` | Predict sepsis risk for a patient |
| `GET` | `/analytics` | Get dashboard statistics |

### Example Prediction Request

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d @sample_input.json
```

Or via CLI:

```bash
python main.py --predict "{\"data\": [{\"Patient_ID\": 101, \"HR\": 85, \"O2Sat\": 98, \"Temp\": 36.5, \"SBP\": 120, \"MAP\": 70, \"DBP\": 65, \"Resp\": 18}]}"
```

**Response:**
```json
{
  "risk_score": 0.42,
  "risk_level": "Low"
}
```

---

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: `http://localhost:5173`

> Make sure the backend API is running on port `8000` before using the frontend.

---

## Full Stack — Quick Start

Run these in separate terminals (with the virtual environment activated):

**Terminal 1 — Backend:**
```bash
uvicorn api:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.
