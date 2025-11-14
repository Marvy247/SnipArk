export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ModuleData {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  enabled?: boolean;
}

export interface StepData {
  id: number;
  title: string;
  description: string;
}

export interface UseCaseData {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  type: 'founder' | 'developer';
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  className?: string;
}