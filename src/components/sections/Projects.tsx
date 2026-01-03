'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink, Star, GitFork, Code } from 'lucide-react';
import { getGitHubClient } from '@/lib/github/client';
import { getConfig } from '@/config';

export function Projects() {
  const config = getConfig();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const client = getGitHubClient();
        let repositories = await client.getRepositories();

        // Filter out excluded repos
        if (config.preferences.excludeRepos) {
          repositories = repositories.filter(
            (repo) => !config.preferences.excludeRepos?.includes(repo.name)
          );
        }

        // Prioritize pinned repos
        if (config.preferences.pinnedRepos && config.preferences.pinnedRepos.length > 0) {
          const pinned = repositories.filter((repo) =>
            config.preferences.pinnedRepos?.includes(repo.name)
          );
          const others = repositories
            .filter((repo) => !config.preferences.pinnedRepos?.includes(repo.name))
            .slice(0, 6 - pinned.length);
          setRepos([...pinned, ...others]);
        } else {
          // Auto-select top repos by stars
          setRepos(
            repositories
              .filter((repo) => !repo.fork)
              .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
              .slice(0, 6)
          );
        }
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Showcase of my best work and open source contributions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-dark p-6 rounded-2xl relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Code className="w-8 h-8 text-blue-400" />
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-white" />
                  </a>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-white mb-2">{repo.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>

                {/* Language */}
                {repo.language && (
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs mb-4">
                    {repo.language}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stargazers_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks_count || 0}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/${config.github.username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 glass-dark hover:bg-white/20 text-white rounded-full font-semibold transition-colors"
          >
            View All Projects →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
