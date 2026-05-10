from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import logging

# Import the predict function from the ML module we built earlier!
from model.predict import predict

app = FastAPI(title="SepsisNova API")

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    HR: float
    O2Sat: float
    Temp: float
    SBP: float
    MAP: float
    DBP: float
    Resp: float
    Patient_ID: int = 9999

class PredictRequest(BaseModel):
    data: List[PatientData]

@app.post("/predict")
async def get_prediction(request: PredictRequest):
    try:
        # Convert incoming Pydantic payload to dictionary format expected by our prediction module
        input_dict = {"data": [item.dict() for item in request.data]}
        
        # Invoke our pre-built ML prediction pipeline
        result = predict(input_dict)
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
            
        return result
    except Exception as e:
        logging.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics")
async def get_analytics_mock():
    # Sending mock dashboard statistics (could be connected to a DB later!)
    return {
        "total_predictions": 12450,
        "high_risk_percentage": 14.2,
        "average_score": 0.35
    }

# Reload trigger
