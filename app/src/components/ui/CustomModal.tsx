"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import Button from './Button';
import { cn } from '@/lib/utils';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(sizeClasses[size], "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700", className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="text-xl font-clash font-semibold text-gray-900 dark:text-white">{title}</DialogTitle>}
            {description && <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className="py-4">
          {children}
        </div>
        {footer && <DialogFooter className="pt-4">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
