'use client';

import { motion } from 'framer-motion';
import {
  GitCommit,
  GitPullRequest,
  Star,
  GitFork,
  MessageCircle,
  GitBranch,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  events: any[];
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'PushEvent':
      return GitCommit;
    case 'PullRequestEvent':
      return GitPullRequest;
    case 'WatchEvent':
      return Star;
    case 'ForkEvent':
      return GitFork;
    case 'IssueCommentEvent':
      return MessageCircle;
    case 'CreateEvent':
      return GitBranch;
    default:
      return GitCommit;
  }
};

const getEventDescription = (event: any) => {
  switch (event.type) {
    case 'PushEvent':
      const commitCount = event.payload.commits?.length || 1;
      return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${event.repo.name}`;
    case 'PullRequestEvent':
      return `${event.payload.action} a pull request in ${event.repo.name}`;
    case 'WatchEvent':
      return `Starred ${event.repo.name}`;
    case 'ForkEvent':
      return `Forked ${event.repo.name}`;
    case 'IssueCommentEvent':
      return `Commented on an issue in ${event.repo.name}`;
    case 'CreateEvent':
      return `Created ${event.payload.ref_type} in ${event.repo.name}`;
    default:
      return `Activity in ${event.repo.name}`;
  }
};

export function ActivityFeed({ events }: ActivityFeedProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="glass-dark p-6 rounded-2xl">
      <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {events.slice(0, 10).map((event, index) => {
          const Icon = getEventIcon(event.type);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="p-2 rounded-full bg-blue-500/10">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-200 text-sm">{getEventDescription(event)}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
