import React from 'react';
import { StepData } from '@/types';
import { cn } from '@/lib/utils';
import CustomCard from './CustomCard';

interface StepCardProps {
  step: StepData;
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, className }) => {
  return (
    <CustomCard
      className={cn(
        'relative hover:shadow-xl transition-all duration-300',
        className
      )}
      variant="elevated"
    >
      {/* Step Number */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {step.id}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
        {step.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
        {step.description}
      </p>
    </CustomCard>
  );
};

export default StepCard;
