import argparse
import json
from model.train import main as train_model
from model.predict import predict

def main():
    parser = argparse.ArgumentParser(description="Sepsis Detection ML Backend")
    parser.add_argument('--train', action='store_true', help="Run the training pipeline")
    parser.add_argument('--predict', type=str, help="JSON string data to predict on")
    
    args = parser.parse_args()
    
    if args.train:
        print("--- Starting Training Pipeline ---")
        train_model()
    elif args.predict:
        print("--- Running Prediction ---")
        try:
            data = json.loads(args.predict)
            result = predict(data)
            print(json.dumps(result, indent=2))
        except Exception as e:
            print(f"Error parsing input data or doing prediction: {e}")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
