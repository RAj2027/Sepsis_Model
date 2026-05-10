import logging

def get_logger(name: str):
    """
    Returns a logger instance for the given name.
    """
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        sh = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        sh.setFormatter(formatter)
        logger.addHandler(sh)
    return logger

logger = get_logger(__name__)

class ModelPredictionError(Exception):
    """Exception raised for errors in the model prediction pipeline."""
    pass
