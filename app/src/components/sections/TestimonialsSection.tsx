import React from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import TestimonialCard from '@/components/ui/TestimonialCard';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from DeFi users who have transformed their strategies with SnipArk's intelligent automation platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-2">$2.5M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Assets Automated</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Strategies</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg. Yield Increase</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Automation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;