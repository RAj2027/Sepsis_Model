import pandas as pd
from model.model_loader import ModelLoader
from model.preprocess import Preprocessor
from model.feature_engineering import FeatureEngineer
from utils.config import GROUP_ID, TARGET_COL
from utils.helpers import get_logger, ModelPredictionError

logger = get_logger(__name__)

def predict(input_data: dict) -> dict:
    """"""
    logger.info("Initializing prediction pipeline...")
    try:
        loader = ModelLoader()
        model = loader.get_model()
        scaler = loader.get_scaler()
        threshold = loader.get_threshold()

        prep = Preprocessor()
        df = prep.from_json(input_data)
        
        # Impute missing values based on training means
        df_clean = prep.transform(df, training=False)
        
        # Group if there are multiple entries for Patient_ID
        if GROUP_ID in df_clean.columns:
            df_agg = prep.group_and_aggregate(df_clean)
        else:
            df_agg = df_clean
            
        # Drop restricted columns
        cols_to_drop = []
        if TARGET_COL in df_agg.columns:
            cols_to_drop.append(TARGET_COL)
        if GROUP_ID in df_agg.columns:
            cols_to_drop.append(GROUP_ID)
            
        X = df_agg.drop(columns=cols_to_drop, errors='ignore')
        
        # Feature Engineering: apply Diff and Rolling using training medians
        fe = FeatureEngineer()
        X = fe.transform(X, training=False)
        
        # Ensure identical column alignment as seen during training!
        if hasattr(scaler, "feature_names_in_"):
            # Reorder columns and drop any extraneous ones unseen in training
            X = X[scaler.feature_names_in_]
        
        # Standard Scaler
        X_scaled = scaler.transform(X)
        
        # Predict Probability
        probs = model.predict_proba(X_scaled)[:, 1]
        score = probs[0]
        
        return {
            "risk_score": float(score),
            "risk_level": "High" if score >= threshold else "Low"
        }
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return {"error": str(e)}
