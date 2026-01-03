'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getGitHubClient } from '@/lib/github/client';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { ContributionHeatmap } from '@/components/dashboard/ContributionHeatmap';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { StatsCards } from '@/components/dashboard/StatsCards';

interface DashboardData {
  contributions: any;
  languages: { language: string; count: number }[];
  events: any[];
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    contributions: null,
    languages: [],
    events: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = getGitHubClient();
        const [contributions, languages, events] = await Promise.all([
          client.getContributions(),
          client.getLanguageStats(),
          client.getEvents(),
        ]);

        setData({
          contributions,
          languages,
          events,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="dashboard" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Activity Dashboard
          </h2>
          <p className="text-gray-400 text-lg">
            Real-time insights into my development activity
          </p>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards contributions={data.contributions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Contribution Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContributionHeatmap data={data.contributions} />
          </motion.div>

          {/* Language Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LanguageChart languages={data.languages} />
          </motion.div>
        </div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <ActivityFeed events={data.events} />
        </motion.div>
      </div>
    </section>
  );
}
