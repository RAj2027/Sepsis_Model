import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Sends patient data to the prediction endpoint.
 * @param {import('../types').PatientInput} data
 * @returns {Promise<import('../types').PredictionResponse>}
 */
export const predictSepsis = async (rows) => {
    // rows is an array of reading objects — send all together for time-series prediction
    const response = await api.post('/predict', { data: rows });
    return response.data;
};

/**
 * Fetches general analytics.
 * @returns {Promise<import('../types').AnalyticsResponse>}
 */
export const getAnalytics = async () => {
    const response = await api.get('/analytics');
    return response.data;
};
