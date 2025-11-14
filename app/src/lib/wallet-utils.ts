import { Transaction } from '@/types/wallet';

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format token amount with appropriate decimal places
 */
export function formatTokenAmount(amount: number, symbol: string): string {
  const decimals = getTokenDecimals(symbol);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Get appropriate decimal places for different tokens
 */
export function getTokenDecimals(symbol: string): number {
  switch (symbol.toUpperCase()) {
    case 'ETH':
    case 'WETH':
      return 4;
    case 'BTC':
    case 'WBTC':
      return 6;
    case 'USDC':
    case 'USDT':
    case 'DAI':
      return 2;
    default:
      return 4;
  }
}

/**
 * Truncate an Ethereum address for display
 */
export function truncateAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Format a date as "time ago" string
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString();
}

/**
 * Sort transactions by timestamp (newest first)
 */
export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

/**
 * Get transaction type display name
 */
export function getTransactionTypeLabel(type: Transaction['type']): string {
  switch (type) {
    case 'send':
      return 'Sent';
    case 'receive':
      return 'Received';
    case 'module':
      return 'Module';
    default:
      return 'Transaction';
  }
}

/**
 * Get status badge color classes
 */
export function getStatusBadgeClasses(status: Transaction['status']): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get transaction icon gradient classes
 */
export function getTransactionIconGradient(type: Transaction['type']): string {
  switch (type) {
    case 'send':
      return 'from-red-400 to-red-600';
    case 'receive':
      return 'from-green-400 to-green-600';
    case 'module':
      return 'from-blue-400 to-purple-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
}

/**
 * Calculate total portfolio value from balance
 */
export function calculateTotalValue(balance: { usdValue: number; secondaryTokens?: Array<{ usdValue: number }> }): number {
  let total = balance.usdValue;
  
  if (balance.secondaryTokens) {
    total += balance.secondaryTokens.reduce((sum, token) => sum + token.usdValue, 0);
  }
  
  return total;
}