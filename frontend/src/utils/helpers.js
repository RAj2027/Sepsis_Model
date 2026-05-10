/**
 * Returns Tailwind classes for color based on risk level.
 * @param {string} level 
 * @returns {string} Tailwind classes
 */
export const getRiskColor = (level) => {
    if (level === 'High') return 'text-rose-600 bg-rose-50 border-rose-200';
    if (level === 'Medium') return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
};

export const getRiskBarColor = (level) => {
    if (level === 'High') return 'bg-rose-500';
    if (level === 'Medium') return 'bg-amber-500';
    return 'bg-emerald-500';
}
