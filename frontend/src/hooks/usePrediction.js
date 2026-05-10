import { useState } from 'react';
import { predictSepsis } from '../services/api';

export const usePrediction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const submitPrediction = async (rows) => {
        setLoading(true);
        setError(null);
        try {
            const data = await predictSepsis(rows);
            setResult(data);
        } catch (err) {
            setError(err?.response?.data?.detail || err.message || 'An error occurred during prediction.');
        } finally {
            setLoading(false);
        }
    };

    return { submitPrediction, loading, error, result };
};
