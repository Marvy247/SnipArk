import React from 'react';
import Link from 'next/link';
import { FOOTER_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';

const socialIconMap: Record<string, string> = {
  farcaster: '🟣',
  twitter: '🐦',
  github: '🐙',
  discord: '💬'
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SnipArk
              </span>
            </div>
          </div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="text-lg">{socialIconMap[social.icon] || '🔗'}</span>
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SnipArk. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;