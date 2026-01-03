'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { getConfig } from '@/config';

export function Footer() {
  const config = getConfig();

  const socialLinks = [
    { icon: Github, href: `https://github.com/${config.github.username}`, label: 'GitHub' },
    config.social?.linkedin && {
      icon: Linkedin,
      href: `https://linkedin.com/in/${config.social.linkedin}`,
      label: 'LinkedIn',
    },
    config.social?.twitter && {
      icon: Twitter,
      href: `https://twitter.com/${config.social.twitter}`,
      label: 'Twitter',
    },
    config.personal.email &&
      config.preferences.showEmail && {
        icon: Mail,
        href: `mailto:${config.personal.email}`,
        label: 'Email',
      },
  ].filter(Boolean);

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">
              {config.personal.name}
            </h3>
            <p className="text-gray-400">{config.personal.bio}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link: any) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {config.personal.name}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Built with <Heart className="w-4 h-4 mx-1 text-red-500" /> using
              <span className="ml-1 gradient-text font-semibold">
                World-Class Product Engine
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
