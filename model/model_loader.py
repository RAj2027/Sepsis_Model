import pickle
import json
from utils.config import MODEL_FILE, SCALER_FILE, THRESHOLD_FILE
from utils.helpers import get_logger, ModelPredictionError

logger = get_logger(__name__)

class ModelLoader:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            logger.info("Initializing ModelLoader Singleton")
            cls._instance = super(ModelLoader, cls).__new__(cls, *args, **kwargs)
            cls._instance._load_artifacts()
        return cls._instance

    def _load_artifacts(self):
        try:
            with open(MODEL_FILE, 'rb') as f:
                self.model = pickle.load(f)
            with open(SCALER_FILE, 'rb') as f:
                self.scaler = pickle.load(f)
            with open(THRESHOLD_FILE, 'r') as f:
                data = json.load(f)
                self.threshold = data.get("threshold", 0.5)
            logger.info("Model artifacts loaded successfully.")
        except Exception as e:
            logger.error(f"Error loading artifacts: {e}")
            self.model = None
            self.scaler = None
            self.threshold = 0.5
            # Usually we might raise here, but for module loading we prevent crash

    def get_model(self):
        if not self.model:
            raise ModelPredictionError("Model not loaded.")
        return self.model

    def get_scaler(self):
        if not self.scaler:
            raise ModelPredictionError("Scaler not loaded.")
        return self.scaler

    def get_threshold(self):
        return self.threshold
