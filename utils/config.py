import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_PATH = DATA_DIR / "raw" / "Dataset.csv"
ARTIFACTS_DIR = BASE_DIR / "artifacts"

# Artifact file names
MODEL_FILE = ARTIFACTS_DIR / "model.pkl"
SCALER_FILE = ARTIFACTS_DIR / "scaler.pkl"
MEDIAN_IMPUTE_FILE = ARTIFACTS_DIR / "medians.json"
THRESHOLD_FILE = ARTIFACTS_DIR / "threshold.json"
NUMERIC_MEANS_FILE = ARTIFACTS_DIR / "numeric_means.json"

# Column Setup
TARGET_COL = "SepsisLabel"
GROUP_ID = "Patient_ID"

# Columns to apply Diff and Rolling Mean (explicitly aligned with frontend inputs)
FEAT_E_COLS = ["HR", "O2Sat", "Temp", "SBP", "MAP"]

# Hyperparameter grids (example defaults based on notebook)
GB_PARAMS = {
    'n_estimators': 100,
    'learning_rate': 0.1
}

# The target variable name in the API
PREDICT_PAYLOAD_LABEL = "input_data"
