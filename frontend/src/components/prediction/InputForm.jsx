import React, { useState } from 'react';
import Button from '../common/Button';
import { Trash2, PlusCircle } from 'lucide-react';

const VITAL_FIELDS = ['HR', 'O2Sat', 'Temp', 'SBP', 'MAP', 'DBP', 'Resp'];

const VITAL_LABELS = {
    HR: 'Heart Rate (bpm)',
    O2Sat: 'O₂ Saturation (%)',
    Temp: 'Temperature (°C)',
    SBP: 'Systolic BP (mmHg)',
    MAP: 'Mean Art. Pressure',
    DBP: 'Diastolic BP (mmHg)',
    Resp: 'Resp. Rate (bpm)',
};

const emptyRow = () =>
    VITAL_FIELDS.reduce((acc, k) => ({ ...acc, [k]: '' }), {});

const PATIENT_ID = Math.floor(Math.random() * 900000) + 100000;

const InputForm = ({ onSubmit, loading }) => {
    const [readings, setReadings] = useState([emptyRow()]);

    const handleChange = (rowIdx, field, value) => {
        setReadings(prev =>
            prev.map((row, i) => (i === rowIdx ? { ...row, [field]: value } : row))
        );
    };

    const addReading = () => setReadings(prev => [...prev, emptyRow()]);

    const removeReading = (idx) => {
        if (readings.length === 1) return;
        setReadings(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rows = readings.map(row => {
            const parsed = { Patient_ID: PATIENT_ID };
            VITAL_FIELDS.forEach(k => {
                parsed[k] = row[k] === '' ? 0 : parseFloat(row[k]);
            });
            return parsed;
        });
        onSubmit(rows);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {readings.map((row, idx) => (
                <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative"
                >
                    {/* Row header */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Reading {idx + 1}{idx === 0 ? ' (earliest)' : idx === readings.length - 1 && readings.length > 1 ? ' (latest)' : ''}
                        </span>
                        {readings.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeReading(idx)}
                                className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                                title="Remove this reading"
                            >
                                <Trash2 size={15} />
                            </button>
                        )}
                    </div>

                    {/* Vitals grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {VITAL_FIELDS.map(field => (
                            <div key={field} className="flex flex-col">
                                <label className="text-xs font-medium text-gray-500 mb-1">
                                    {VITAL_LABELS[field]}
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    value={row[field]}
                                    onChange={e => handleChange(idx, field, e.target.value)}
                                    className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none bg-white"
                                    placeholder={field}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Add reading button */}
            <button
                type="button"
                onClick={addReading}
                className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-rose-400 hover:text-rose-500 transition-colors bg-transparent"
            >
                <PlusCircle size={16} />
                Add Reading
            </button>

            <div className="pt-2">
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Analyzing Vitals...' : `Predict Sepsis Risk (${readings.length} reading${readings.length > 1 ? 's' : ''})`}
                </Button>
            </div>
        </form>
    );
};

export default InputForm;
