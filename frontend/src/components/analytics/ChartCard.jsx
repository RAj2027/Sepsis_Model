import React from 'react';
import Card from '../common/Card';

const ChartCard = ({ title, children }) => {
    return (
        <Card className="h-full flex flex-col pt-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 px-1">{title}</h3>
            <div className="flex-1 w-full min-h-[300px]">
                {children}
            </div>
        </Card>
    );
};

export default ChartCard;
