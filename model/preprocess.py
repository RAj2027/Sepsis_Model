import pandas as pd
import json
from utils.config import NUMERIC_MEANS_FILE, TARGET_COL, GROUP_ID
from utils.helpers import get_logger, ModelPredictionError

logger = get_logger(__name__)

class Preprocessor:
    def __init__(self):
        self.numeric_means = {}

    def fit(self, df: pd.DataFrame):
        """Fits the preprocessor on the training data by calculating column means."""
        logger.info("Fitting preprocessor...")
        numeric_cols = df.select_dtypes(include='number').columns
        self.numeric_means = df[numeric_cols].mean().to_dict()
        
        # Save means
        with open(NUMERIC_MEANS_FILE, 'w') as f:
            json.dump(self.numeric_means, f)
        logger.info("Numeric means saved successfully.")

    def load_means(self):
        """Loads fitted means for inference."""
        try:
            with open(NUMERIC_MEANS_FILE, 'r') as f:
                self.numeric_means = json.load(f)
        except Exception as e:
            logger.error(f"Error loading means from {NUMERIC_MEANS_FILE}: {e}")
            raise ModelPredictionError("Preprocessing statistics missing.")

    def transform(self, df: pd.DataFrame, training=True) -> pd.DataFrame:
        """Applies mean imputation."""
        df_copy = df.copy()
        
        # Drop Unnamed columns if present
        df_copy = df_copy.loc[:, ~df_copy.columns.str.contains('^Unnamed')]

        if not training and not self.numeric_means:
            self.load_means()

        # Apply mean imputation and append missing fields
        for col, mean_val in self.numeric_means.items():
            if col not in df_copy.columns:
                df_copy[col] = mean_val
            else:
                df_copy[col] = df_copy[col].fillna(mean_val)

        return df_copy
    
    def group_and_aggregate(self, df: pd.DataFrame) -> pd.DataFrame:
        """Groups data by Patient_ID and separates target variable if present."""
        logger.info("Grouping and aggregating data...")
        if TARGET_COL in df.columns:
            target = df.groupby(GROUP_ID)[TARGET_COL].max().reset_index()
            # Binarize SepsisLabel as in the notebook
            target[TARGET_COL] = (target[TARGET_COL] > 0).astype(int)
            
            features = df.groupby(GROUP_ID).mean().reset_index()
            features = features.drop(columns=[TARGET_COL])
            
            df_agg = features.merge(target, on=GROUP_ID)
            return df_agg
        else:
            # Inference case where target column might not exist or we just need features
            return df.groupby(GROUP_ID).mean().reset_index()

    def from_json(self, json_data: dict) -> pd.DataFrame:
        """Converts incoming JSON to pandas DataFrame."""
        try:
            # Assuming a list of dicts or single dict
            if isinstance(json_data, dict) and 'data' in json_data:
                return pd.DataFrame(json_data['data'])
            elif isinstance(json_data, list):
                return pd.DataFrame(json_data)
            return pd.DataFrame([json_data])
        except Exception as e:
            logger.error(f"Invalid JSON format for preprocessing: {e}")
            raise ModelPredictionError("Invalid input format.")
