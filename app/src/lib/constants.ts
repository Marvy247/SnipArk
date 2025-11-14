import { NavigationItem, ModuleData, StepData, UseCaseData, TestimonialData } from '@/types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Docs', href: '/docs', external: true }
];

export const WORKFLOW_STEPS: StepData[] = [
  {
    id: 1,
    title: 'Deploy Smart Contract',
    description: 'Deploy your automated DeFi contract on the network'
  },
  {
    id: 2,
    title: 'Configure Automation',
    description: 'Set up triggers, conditions, and execution parameters'
  },
  {
    id: 3,
    title: 'Fund Operations',
    description: 'Add funds for gas fees and transaction execution'
  },
  {
    id: 4,
    title: 'Monitor & Execute',
    description: 'System automatically executes trades and optimizations'
  }
];

export const FEATURED_MODULES: ModuleData[] = [
  {
    id: 'trade-executor',
    name: 'Trade Executor',
    description: 'Automated execution of DeFi trades based on conditions',
    icon: 'zap',
    tags: ['Trading', 'Automation']
  },
  {
    id: 'yield-optimizer',
    name: 'Yield Optimizer',
    description: 'Automatically move funds to highest yielding opportunities',
    icon: 'trending-up',
    tags: ['Yield', 'Optimization']
  },
  {
    id: 'liquidity-manager',
    name: 'Liquidity Manager',
    description: 'Maintain optimal liquidity positions across protocols',
    icon: 'droplets',
    tags: ['Liquidity', 'Management']
  },
  {
    id: 'risk-monitor',
    name: 'Risk Monitor',
    description: 'Monitor positions and execute risk mitigation strategies',
    icon: 'shield',
    tags: ['Risk', 'Security']
  }
];

export const USE_CASES: UseCaseData[] = [
  {
    id: 'yield-farming',
    title: 'Automated Yield Farming',
    description: 'Automatically compound yields and rebalance positions for maximum returns',
    examples: ['Auto-compounding rewards', 'Position rebalancing', 'Strategy optimization'],
    icon: 'trending-up'
  },
  {
    id: 'liquidity-provision',
    title: 'Dynamic Liquidity Management',
    description: 'Maintain optimal liquidity positions across multiple AMMs and protocols',
    examples: ['AMM position management', 'Impermanent loss mitigation', 'Fee optimization'],
    icon: 'droplets'
  },
  {
    id: 'trading-strategies',
    title: 'Algorithmic Trading',
    description: 'Execute complex trading strategies automatically based on market conditions',
    examples: ['Arbitrage execution', 'DCA strategies', 'Momentum trading'],
    icon: 'zap'
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    quote: 'SnipArk automated our yield farming strategy and increased our returns by 40%. The automation is flawless.',
    author: 'Sarah Chen',
    role: 'DeFi Portfolio Manager',
    type: 'founder'
  },
  {
    id: '2',
    quote: 'No more manual rebalancing. SnipArk handles our liquidity positions across multiple protocols automatically.',
    author: 'Marcus Rodriguez',
    role: 'Liquidity Provider',
    type: 'developer'
  },
  {
    id: '3',
    quote: 'The algorithmic trading features helped us capture arbitrage opportunities we would have missed otherwise.',
    author: 'Alex Kim',
    role: 'Crypto Trader',
    type: 'founder'
  },
  {
    id: '4',
    quote: 'Risk monitoring and automated position adjustments have significantly reduced our impermanent loss.',
    author: 'Jennifer Walsh',
    role: 'AMM Strategist',
    type: 'developer'
  }
];

export const SOCIAL_LINKS = [
  { name: 'Farcaster', href: 'https://farcaster.xyz/autowall', icon: 'farcaster' },
  { name: 'Twitter', href: 'https://twitter.com/autowall', icon: 'twitter' },
  { name: 'GitHub', href: 'https://github.com/autowall', icon: 'github' },
  { name: 'Discord', href: 'https://discord.gg/autowall', icon: 'discord' }
];

export const FOOTER_SECTIONS = [
  {
    title: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy', href: '/privacy' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com/autowall' },
      { label: 'API', href: '/api' }
    ]
  }
];