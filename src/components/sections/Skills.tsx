'use client';

import { motion } from 'framer-motion';
import { getConfig } from '@/config';
import { Code, Database, Cloud, Wrench, Palette, Zap } from 'lucide-react';

export function Skills() {
  const config = getConfig();

  const skillCategories = [
    {
      icon: Code,
      title: 'Languages',
      skills: config.personal.skills.slice(0, 5),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Wrench,
      title: 'Frameworks',
      skills: ['React', 'Next.js', 'Node.js', 'Express'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Database,
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Palette,
      title: 'Design',
      skills: ['Figma', 'Tailwind CSS', 'UI/UX', 'Responsive'],
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: Zap,
      title: 'Tools',
      skills: ['Git', 'VS Code', 'Postman', 'Jira'],
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 text-lg">
            Tools and technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-dark p-6 rounded-2xl relative overflow-hidden group"
              >
                {/* Animated background */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 ${category.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <Icon className={`w-10 h-10 ${category.color} mb-4`} />

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {category.title}
                  </h3>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm hover:bg-white/20 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
