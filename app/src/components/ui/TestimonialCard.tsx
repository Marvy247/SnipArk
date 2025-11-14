
import React from 'react';
import { TestimonialData } from '@/types';
import { cn } from '@/lib/utils';
import CustomCard from './CustomCard';

interface TestimonialCardProps {
  testimonial: TestimonialData;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  return (
    <CustomCard
      className={cn(
        'relative rounded-2xl hover:shadow-xl transition-all duration-300',
        testimonial.type === 'developer' ? 'border-l-4 border-l-purple-500' : 'border-l-4 border-l-blue-500',
        className
      )}
      variant="elevated"
    >
      {/* Chat bubble tail */}
      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>

      {/* Quote */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Author info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            {testimonial.author}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {testimonial.role}
          </div>
        </div>

        {/* Type badge */}
        <div className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          testimonial.type === 'developer'
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        )}>
          {testimonial.type === 'developer' ? '👨‍💻 Dev' : '👤 founder'}
        </div>
      </div>
    </CustomCard>
  );
};

export default TestimonialCard;
