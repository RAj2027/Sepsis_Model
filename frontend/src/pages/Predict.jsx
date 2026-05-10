import React from 'react';
import InputForm from '../components/prediction/InputForm';
import ResultCard from '../components/prediction/ResultCard';
import { usePrediction } from '../hooks/usePrediction';
import Card from '../components/common/Card';

const Predict = () => {
    const { submitPrediction, loading, error, result } = usePrediction();

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Patient Sepsis Prediction</h1>
                <p className="text-gray-500 text-lg">Enter one or more vital sign readings for a patient over time. Adding multiple readings (showing a trend) significantly improves prediction accuracy.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100">Vital Signs Input</h2>
                        <InputForm onSubmit={submitPrediction} loading={loading} />
                    </Card>
                </div>
                
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <ResultCard result={result} error={error} />
                        {!result && !error && (
                            <Card className="text-center bg-gray-50 border-dashed border-2 border-gray-200">
                                <p className="text-gray-400 font-medium py-8 px-4">Submit patient data to see risk probability here.</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Predict;
