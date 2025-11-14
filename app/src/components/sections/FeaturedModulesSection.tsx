"use client";
import React from 'react';
import { FEATURED_MODULES } from '@/lib/constants';
import ModuleCard from '@/components/ui/ModuleCard';
import CustomButton from '@/components/ui/Button';

const FeaturedModulesSection: React.FC = () => {
  return (
    <section id="modules" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Automation Modules
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful automation modules to optimize your DeFi operations. From trade execution to risk management, automate complex strategies with confidence.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {/* Browse All Modules CTA */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Need custom automation for your strategy? We offer advanced features with priority execution, custom triggers, and comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton variant="primary" size="lg">
                Explore Features
              </CustomButton>
              <CustomButton variant="outline" size="lg">
                View All Modules
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModulesSection;