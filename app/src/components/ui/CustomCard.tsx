import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  footer,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600',
    bordered: 'bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500',
  };

  return (
    <Card className={cn("w-full rounded-xl", variantClasses[variant], className)}>
      {(title || description) && (
        <CardHeader className={cn("pb-4", headerClassName)}>
          {title && <CardTitle className="text-xl font-clash font-semibold text-gray-900 dark:text-white">{title}</CardTitle>}
          {description && <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", contentClassName)}>
        {children}
      </CardContent>
      {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
    </Card>
  );
};

export default CustomCard;
