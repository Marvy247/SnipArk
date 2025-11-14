'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import CustomModal from './CustomModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  showCloseButton = true
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={title || ""}
      className={className || "relative w-full max-w-md mx-4 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"}
    >
      {children}
    </CustomModal>
  );
};

export default Modal;
