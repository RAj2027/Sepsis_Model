import { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';

export const useAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const result = await getAnalytics();
                setData(result);
            } catch (err) {
                setError(err?.response?.data?.detail || err.message || 'Failed to fetch analytics.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { data, loading, error };
};
