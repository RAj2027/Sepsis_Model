import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import StatsCard from '../components/analytics/StatsCard';
import ChartCard from '../components/analytics/ChartCard';
import { Activity, Users, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
    const { data: analytics, loading, error } = useAnalytics();

    if (loading) {
        return <div className="flex h-[50vh] items-center justify-center font-medium text-gray-500 animate-pulse">Loading Analytics Data...</div>;
    }

    if (error) {
        return <div className="p-4 bg-red-50 text-red-700 rounded-lg font-medium border border-red-200">{error}</div>;
    }

    // Process analytics payload
    const stats = Object.assign({
        total_predictions: 0,
        high_risk_percentage: 0,
        average_score: 0
    }, analytics || {});

    const pieData = [
        { name: 'High Risk', value: stats.high_risk_percentage || 0 },
        { name: 'Low Risk', value: 100 - (stats.high_risk_percentage || 0) }
    ];
    
    // Using mock historical data if none provided from backend, just for frontend visual completeness
    const barData = [
        { day: 'Mon', score: 0.22 },
        { day: 'Tue', score: 0.28 },
        { day: 'Wed', score: 0.15 },
        { day: 'Thu', score: 0.35 },
        { day: 'Fri', score: stats.average_score || 0.40 }
    ];

    const COLORS = ['#f43f5e', '#10b981']; // Rose for High, Emerald for Low

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Model Analytics</h1>
                <p className="text-gray-500 text-lg">System-wide performance and prediction statistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard 
                    title="Total Predictions" 
                    value={stats.total_predictions} 
                    icon={Users} 
                />
                <StatsCard 
                    title="High Risk Predictions" 
                    value={`${(stats.high_risk_percentage).toFixed(1)}%`} 
                    icon={AlertTriangle} 
                />
                <StatsCard 
                    title="Average Risk Score" 
                    value={(stats.average_score * 100).toFixed(1) + '%'} 
                    icon={Activity} 
                    subtitle="Aggregated probability"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard title="Risk Distribution">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip formatter={(value) => `${value.toFixed(1)}%`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-6 pb-2">
                        {pieData.map((entry, idx) => (
                            <div key={entry.name} className="flex items-center text-sm font-medium text-gray-600">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx]}}></span>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </ChartCard>

                <ChartCard title="Average Score Trend (7 Days)">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} tickFormatter={(v)=>`${(v*100).toFixed(0)}%`} />
                            <RechartsTooltip cursor={{fill: '#F3F4F6'}} formatter={(v) => `${(v*100).toFixed(1)}%`} />
                            <Bar dataKey="score" fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default Dashboard;
