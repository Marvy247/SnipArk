export interface WalletBalance {
  usdValue: number;
  primaryToken: {
    symbol: string;
    amount: number;
    usdValue: number;
  };
  secondaryTokens: Array<{
    symbol: string;
    amount: number;
    usdValue: number;
  }>;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'module';
  amount: number;
  token: string;
  usdValue: number;
  counterparty: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface WalletAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

export interface WalletState {
  balance: WalletBalance | null;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}