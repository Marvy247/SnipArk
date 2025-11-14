import { WalletBalance, Transaction, WalletAction } from '@/types/wallet';

// Mock wallet balance data
export const MOCK_WALLET_BALANCE: WalletBalance = {
  usdValue: 12540.30,
  primaryToken: {
    symbol: 'ETH',
    amount: 5.2847,
    usdValue: 12540.30
  },
  secondaryTokens: [
    {
      symbol: 'USDC',
      amount: 1250.00,
      usdValue: 1250.00
    },
    {
      symbol: 'WBTC',
      amount: 0.1234,
      usdValue: 5420.80
    }
  ]
};

// Mock transaction data
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'send',
    amount: 0.5,
    token: 'ETH',
    usdValue: 1250.00,
    counterparty: '0x1234...5678',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed'
  },
  {
    id: '2',
    type: 'receive',
    amount: 500.00,
    token: 'USDC',
    usdValue: 500.00,
    counterparty: 'AutoPay Module',
    timestamp: new Date('2024-01-14T15:45:00'),
    status: 'completed'
  },
  {
    id: '3',
    type: 'module',
    amount: 0.2,
    token: 'ETH',
    usdValue: 500.00,
    counterparty: 'DCA Bot Module',
    timestamp: new Date('2024-01-13T09:15:00'),
    status: 'completed'
  },
  {
    id: '4',
    type: 'send',
    amount: 0.05,
    token: 'WBTC',
    usdValue: 2200.00,
    counterparty: '0x9876...4321',
    timestamp: new Date('2024-01-12T14:20:00'),
    status: 'completed'
  },
  {
    id: '5',
    type: 'receive',
    amount: 0.1234,
    token: 'ETH',
    usdValue: 308.50,
    counterparty: 'Yield Aggregator',
    timestamp: new Date('2024-01-11T11:30:00'),
    status: 'completed'
  },
  {
    id: '6',
    type: 'module',
    amount: 100.00,
    token: 'USDC',
    usdValue: 100.00,
    counterparty: 'Savings Module',
    timestamp: new Date('2024-01-10T16:22:00'),
    status: 'pending'
  }
];

// Default wallet actions
export const DEFAULT_WALLET_ACTIONS: WalletAction[] = [
  {
    id: 'receive',
    label: 'Receive',
    icon: 'arrow-down',
    action: () => console.log('Receive clicked')
  },
  {
    id: 'send',
    label: 'Send',
    icon: 'arrow-up',
    action: () => console.log('Send clicked')
  },
  {
    id: 'modules',
    label: 'Modules',
    icon: 'puzzle',
    action: () => console.log('Modules clicked')
  }
];