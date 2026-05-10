import React from 'react';
import Card from '../common/Card';

const StatsCard = ({ title, value, subtitle, icon: Icon }) => {
    return (
        <Card className="flex items-center space-x-4 transition-transform hover:scale-[1.02]">
            {Icon && (
                <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">
                    <Icon size={24} />
                </div>
            )}
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
                {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
            </div>
        </Card>
    );
};

export default StatsCard;
