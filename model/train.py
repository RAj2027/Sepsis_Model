import pandas as pd
import numpy as np
import json
import pickle
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score, 
    precision_recall_curve, auc
)
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import lightgbm as lgb
from xgboost import XGBClassifier

from utils.config import RAW_DATA_PATH, MODEL_FILE, SCALER_FILE, THRESHOLD_FILE, TARGET_COL
from utils.helpers import get_logger
from model.preprocess import Preprocessor
from model.feature_engineering import FeatureEngineer

logger = get_logger(__name__)

def evaluate_model(y_true, y_probs, threshold=0.5):
    y_pred = (y_probs >= threshold).astype(int)
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    
    precisions, recalls, _ = precision_recall_curve(y_true, y_probs)
    pr_auc = auc(recalls, precisions)
    
    return acc, prec, rec, f1, pr_auc

def main():
    if not os.path.exists(RAW_DATA_PATH):
        logger.error(f"Dataset not found at {RAW_DATA_PATH}")
        return

    logger.info("Loading dataset...")
    df = pd.read_csv(RAW_DATA_PATH)
    
    logger.info("Applying Preprocessing...")
    preprocessor = Preprocessor()
    preprocessor.fit(df)
    df_clean = preprocessor.transform(df, training=True)
    
    df_agg = preprocessor.group_and_aggregate(df_clean)
    
    X = df_agg.drop(columns=[TARGET_COL])
    y = df_agg[TARGET_COL]
    
    logger.info("Applying Feature Engineering...")
    fe = FeatureEngineer()
    X = fe.transform(X, training=True)
    
    logger.info("Splitting dataset...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale positive weight
    neg = np.sum(y_train == 0)
    pos = np.sum(y_train == 1)
    scale_pos_weight = neg / pos if pos > 0 else 1
    
    # Standard Scaler (Mainly for Logistic, but we'll save it to use everywhere for consistency)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    with open(SCALER_FILE, 'wb') as f:
        pickle.dump(scaler, f)
    
    logger.info("Training Models...")
    models = {
        "LogisticRegression": LogisticRegression(max_iter=1000),
        "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42),
        "GradientBoosting": GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, random_state=42),
        "XGBoost": XGBClassifier(scale_pos_weight=scale_pos_weight, random_state=42, eval_metric='aucpr'),
        "LightGBM": lgb.LGBMClassifier(class_weight={0: 1, 1: scale_pos_weight}, random_state=42)
    }
    
    best_f1 = -1
    best_model_name = ""
    best_model = None
    best_threshold = 0.5
    
    for name, model in models.items():
        logger.info(f"Training {name}...")
        model.fit(X_train_scaled, y_train)
        y_probs = model.predict_proba(X_test_scaled)[:, 1]
        
        # Threshold tuning
        precisions, recalls, thresholds = precision_recall_curve(y_test, y_probs)
        # Avoid division by zero
        f1_scores = (2 * precisions * recalls) / (precisions + recalls + 1e-6)
        
        opt_idx = np.argmax(f1_scores)
        opt_threshold = thresholds[opt_idx] if opt_idx < len(thresholds) else 0.5
        opt_f1 = f1_scores[opt_idx]
        
        acc, prec, rec, f1, pr_auc = evaluate_model(y_test, y_probs, opt_threshold)
        logger.info(f"{name} Results -> Thresh: {opt_threshold:.3f}, F1: {f1:.3f}, PR-AUC: {pr_auc:.3f}")
        
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model = model
            best_threshold = opt_threshold

    logger.info(f"Best Model: {best_model_name} with F1-score: {best_f1:.3f} and Threshold: {best_threshold:.3f}")
    
    # Save the best model
    with open(MODEL_FILE, 'wb') as f:
        pickle.dump(best_model, f)
        
    with open(THRESHOLD_FILE, 'w') as f:
        json.dump({"threshold": float(best_threshold)}, f)
        
    logger.info("Training complete and artifacts saved.")

if __name__ == "__main__":
    main()
