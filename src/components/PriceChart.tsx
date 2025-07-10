// src/components/PriceChart.tsx

// Importing React and MUI theme utilities for consistent styling
import React from 'react';
import { useTheme } from '@mui/material/styles';
// Importing recharts components for chart rendering
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

// Defining the structure for a single price data point
interface PricePoint {
    time: string;
    value: number;
}

// Props for the PriceChart: expects an array of price points
interface ChartProps {
    data: PricePoint[];
}

// PriceChart: Renders a responsive line chart for price data visualization
const PriceChart: React.FC<ChartProps> = ({ data }) => {
    // Access the current theme for dynamic color usage
    const theme = useTheme();

    return (
        // ResponsiveContainer ensures the chart scales with its parent container
        <ResponsiveContainer width="100%" height="100%">
            {/* LineChart is the main chart container */}
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
                {/* CartesianGrid adds a grid with dashed lines for readability */}
                <CartesianGrid stroke={theme.palette.divider} strokeDasharray="4 4" />
                {/* XAxis: maps to 'time', styled with theme colors */}
                <XAxis
                    dataKey="time"
                    tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
                    interval="preserveStartEnd"
                />
                {/* YAxis: auto-scales to data range, styled with theme */}
                <YAxis
                    domain={['dataMin', 'dataMax']}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
                />
                {/* Tooltip: custom styled for theme consistency */}
                <Tooltip
                    wrapperStyle={{ backgroundColor: 'transparent' }}
                    contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 4,
                        boxShadow: theme.shadows[2],
                        padding: '8px 12px'
                    }}
                    labelStyle={{
                        color: theme.palette.text.secondary,
                        fontSize: 12,
                        marginBottom: 4
                    }}
                    itemStyle={{
                        color: theme.palette.text.primary,
                        fontSize: 14
                    }}
                />
                {/* Line: plots the 'value' over 'time', no dots for a cleaner look */}
                <Line
                    type="monotone"
                    dataKey="value"
                    name="Value"
                    stroke={theme.palette.primary.light}
                    dot={false}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

// Export the component for use in other parts of the application
export default PriceChart;
