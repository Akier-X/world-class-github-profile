'use client';

import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, Code } from 'lucide-react';

interface StatsCardsProps {
  contributions: any;
}

export function StatsCards({ contributions }: StatsCardsProps) {
  if (!contributions) return null;

  const stats = [
    {
      icon: GitCommit,
      label: 'Total Commits',
      value: contributions.totalCommitContributions || 0,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: GitPullRequest,
      label: 'Pull Requests',
      value: contributions.totalPullRequestContributions || 0,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: GitMerge,
      label: 'Code Reviews',
      value: contributions.totalPullRequestReviewContributions || 0,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Code,
      label: 'Issues',
      value: contributions.totalIssueContributions || 0,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-dark p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
