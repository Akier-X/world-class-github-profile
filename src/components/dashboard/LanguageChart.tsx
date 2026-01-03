'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface LanguageChartProps {
  languages: Array<{ language: string; count: number }>;
}

const COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#10B981', // Green
  '#F59E0B', // Orange
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
];

export function LanguageChart({ languages }: LanguageChartProps) {
  if (!languages || languages.length === 0) return null;

  const chartData = languages.slice(0, 8).map((lang) => ({
    name: lang.language,
    value: lang.count,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-dark p-3 rounded-lg border border-gray-700">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-gray-400 text-sm">{payload[0].value} repositories</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-dark p-6 rounded-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Language Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Language List */}
      <div className="mt-6 space-y-2">
        {languages.slice(0, 5).map((lang, index) => (
          <motion.div
            key={lang.language}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-gray-300">{lang.language}</span>
            </div>
            <span className="text-gray-400 text-sm">{lang.count} repos</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
