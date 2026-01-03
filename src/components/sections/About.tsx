'use client';

import { motion } from 'framer-motion';
import { Award, Target, Rocket, Heart } from 'lucide-react';
import { getConfig } from '@/config';

export function About() {
  const config = getConfig();

  const highlights = [
    {
      icon: Target,
      title: 'Technical Depth',
      description: 'Deep expertise in modern web technologies and best practices',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Rocket,
      title: 'Fast Execution',
      description: 'Rapid development and deployment of high-quality solutions',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Award,
      title: 'Open Source',
      description: 'Active contributor to open source projects and communities',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Heart,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and improving skills',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg">
            Get to know me better
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-dark p-8 rounded-2xl mb-12"
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hi! I'm <span className="gradient-text font-semibold">{config.personal.name}</span>,
              a passionate {config.personal.occupation.toLowerCase()} dedicated to building
              world-class products that make a difference.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {config.personal.bio}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I believe in writing clean, maintainable code and creating exceptional user
              experiences. When I'm not coding, you can find me contributing to open source,
              learning new technologies, or sharing knowledge with the developer community.
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-dark p-6 rounded-2xl relative overflow-hidden group"
                >
                  {/* Animated background */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${highlight.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <Icon className={`w-10 h-10 ${highlight.color} mb-3`} />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-400">{highlight.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
