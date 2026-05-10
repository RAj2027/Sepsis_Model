/**
 * @typedef {Object} PatientInput
 * @property {number} HR - Heart rate
 * @property {number} O2Sat - Oxygen saturation
 * @property {number} Temp - Temperature
 * @property {number} SBP - Systolic BP
 * @property {number} MAP - Mean arterial pressure
 * @property {number} DBP - Diastolic BP
 * @property {number} Resp - Respiration rate
 */

/**
 * @typedef {Object} PredictionResponse
 * @property {number} risk_score
 * @property {string} risk_level
 */

/**
 * @typedef {Object} AnalyticsResponse
 * @property {number} total_predictions
 * @property {number} high_risk_percentage
 * @property {number} average_score
 */
