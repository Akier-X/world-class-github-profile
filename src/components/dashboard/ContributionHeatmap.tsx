'use client';

import { motion } from 'framer-motion';

interface ContributionHeatmapProps {
  data: any;
}

export function ContributionHeatmap({ data }: ContributionHeatmapProps) {
  if (!data?.contributionCalendar) return null;

  const { weeks } = data.contributionCalendar;
  const maxContributions = Math.max(
    ...weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => day.contributionCount)
    )
  );

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    const intensity = (count / maxContributions) * 100;
    if (intensity < 25) return 'bg-green-900';
    if (intensity < 50) return 'bg-green-700';
    if (intensity < 75) return 'bg-green-500';
    return 'bg-green-400';
  };

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Mon', 'Wed', 'Fri'];

  return (
    <div className="glass-dark p-6 rounded-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">Contribution Activity</h3>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2 text-xs text-gray-400">
            {monthLabels.map((month) => (
              <div key={month} className="flex-1 text-center">
                {month}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-xs text-gray-400 pr-2">
              <div className="h-3" />
              {dayLabels.map((day) => (
                <div key={day} className="h-3 flex items-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution boxes */}
            <div className="flex gap-1 flex-1">
              {weeks.slice(0, 53).map((week: any, weekIndex: number) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day: any, dayIndex: number) => (
                    <motion.div
                      key={day.date}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      className={`w-3 h-3 rounded-sm ${getColor(day.contributionCount)} cursor-pointer`}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: weekIndex * 0.01 + dayIndex * 0.002 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-800 rounded-sm" />
              <div className="w-3 h-3 bg-green-900 rounded-sm" />
              <div className="w-3 h-3 bg-green-700 rounded-sm" />
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <div className="w-3 h-3 bg-green-400 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
