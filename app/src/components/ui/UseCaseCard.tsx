import React from 'react';
import { UseCaseData } from '@/types';
import { cn } from '@/lib/utils';
import CustomCard from './CustomCard';

interface UseCaseCardProps {
  useCase: UseCaseData;
  className?: string;
}

const iconMap: Record<string, string> = {
  repeat: '🔄',
  'trending-up': '📈',
  users: '👥',
  bot: '🤖'
};

const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, className }) => {
  return (
    <CustomCard
      className={cn(
        'hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600',
        className
      )}
      variant="elevated"
    >
      {/* Icon */}
      <div className="text-3xl mb-4">
        {iconMap[useCase.icon] || '⚡'}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {useCase.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
        {useCase.description}
      </p>

      {/* Examples */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Examples:</h4>
        <ul className="space-y-1">
          {useCase.examples.map((example, index) => (
            <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </CustomCard>
  );
};

export default UseCaseCard;
