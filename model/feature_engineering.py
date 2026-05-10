import pandas as pd
import json
from utils.config import MEDIAN_IMPUTE_FILE, FEAT_E_COLS
from utils.helpers import get_logger, ModelPredictionError

logger = get_logger(__name__)

class FeatureEngineer:
    def __init__(self):
        self.medians = {}
        
    def fit(self, X: pd.DataFrame):
        """Fits feature engineer by finding medians of feature-engineered columns."""
        logger.info("Fitting feature engineer...")
        self.medians = X.median().to_dict()
        with open(MEDIAN_IMPUTE_FILE, 'w') as f:
            json.dump(self.medians, f)
            
    def load_medians(self):
        """Loads fitted medians for test/inference."""
        try:
            with open(MEDIAN_IMPUTE_FILE, 'r') as f:
                self.medians = json.load(f)
        except Exception as e:
            logger.error(f"Error loading medians: {e}")
            raise ModelPredictionError("Feature engineer needs medians but they are missing.")

    def transform(self, X: pd.DataFrame, training: bool = True) -> pd.DataFrame:
        """
        Applies difference and rolling mean features.
        During inference, single rows won't properly compute diff/rolling,
        so they will fall back to using fillna(0) or backfill logic safely.
        """
        X_copy = X.copy()
        
        # Take explicitly defined columns that map meaningfully to the frontend inputs
        selected_cols = [col for col in FEAT_E_COLS if col in X_copy.columns]
        
        # In reality, if it's inference and we get a single row, 
        # diff() will be NaN, and we fillna(0) 
        # rolling(window=3) will be NaN, and bfill() will just leave it NaN if it's length 1.
        
        for col in selected_cols:
            X_copy[f"{col}_diff"] = X_copy[col].diff().fillna(0)
            
        for col in selected_cols:
            # if length is shorter than window, rolling mean gives NaN.
            # bfill fills up if there are subsequent valid rows. For single row, we will have to use median.
            roll = X_copy[col].rolling(window=3).mean()
            if not roll.empty:
                # bfill handles start of sequences
                roll = roll.bfill()
            X_copy[f"{col}_rolling_mean"] = roll
            
        if not training and not self.medians:
            self.load_medians()
            
        if training:
            # Median fill for the computed NaNs
            self.fit(X_copy)
            
        # Impute missing, and ensure any completely missing expected columns are created
        for col, med in self.medians.items():
            if col not in X_copy.columns:
                X_copy[col] = med
            else:
                X_copy[col] = X_copy[col].fillna(med)
                
        # Fill strictly remaining NaNs just in case (e.g. inference with missing median cols)
        X_copy = X_copy.fillna(0)
        
        return X_copy
