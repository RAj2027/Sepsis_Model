import React from 'react';
import Card from '../common/Card';
import { getRiskColor, getRiskBarColor } from '../../utils/helpers';
import { AlertCircle } from 'lucide-react';

const ResultCard = ({ result, error }) => {
    if (error) {
        return (
            <Card className="bg-red-50 border-red-200">
                <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle size={20} />
                    <span className="font-medium text-sm">{error}</span>
                </div>
            </Card>
        );
    }

    if (!result) return null;

    const { risk_score, risk_level } = result;
    const colorClass = getRiskColor(risk_level);
    const barClass = getRiskBarColor(risk_level);

    return (
        <Card className={`text-center space-y-4 border-2 ${colorClass}`}>
            <h3 className="text-lg font-semibold text-gray-800">Prediction Result</h3>
            <div className={`px-4 py-2 rounded-full inline-block font-bold text-lg bg-white border-2 border-current`}>
                Risk Level: {risk_level}
            </div>
            <div className="pt-2">
                <span className="text-sm text-gray-600 font-medium">Risk Probability Score</span>
                <div className="mt-2 h-4 w-full bg-white/50 rounded-full overflow-hidden border border-current shadow-inner">
                    <div 
                        className={`h-full ${barClass} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(Math.max(risk_score * 100, 0), 100)}%` }}
                    />
                </div>
                <p className="mt-2 text-3xl font-black">{(risk_score * 100).toFixed(1)}%</p>
            </div>
        </Card>
    );
};

export default ResultCard;
