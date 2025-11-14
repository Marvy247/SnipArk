'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface ReactWalletData {
  name: string;
  address: string;
  modules: string[];
  createdAt: Date;
}

interface UseReactWalletReturn {
  hasReactWallet: boolean;
  reactWalletData: ReactWalletData | null;
  isLoading: boolean;
  createReactWallet: (data: { name: string; selectedModules: string[] }) => Promise<void>;
  refreshWalletData: () => Promise<void>;
}

// Mock storage for React Wallet data (in real app, this would be blockchain/API calls)
const REACT_WALLETS_KEY = 'react_wallets';

const getStoredWallets = (): Record<string, ReactWalletData> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(REACT_WALLETS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const storeWallet = (address: string, walletData: ReactWalletData) => {
  if (typeof window === 'undefined') return;
  
  const wallets = getStoredWallets();
  wallets[address.toLowerCase()] = walletData;
  localStorage.setItem(REACT_WALLETS_KEY, JSON.stringify(wallets));
};

export const useReactWallet = (): UseReactWalletReturn => {
  const { address, isConnected } = useAccount();
  const [hasReactWallet, setHasReactWallet] = useState(false);
  const [reactWalletData, setReactWalletData] = useState<ReactWalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkReactWallet = async (walletAddress: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const wallets = getStoredWallets();
      const walletData = wallets[walletAddress.toLowerCase()];
      
      if (walletData) {
        // Convert stored date string back to Date object
        const parsedWalletData = {
          ...walletData,
          createdAt: new Date(walletData.createdAt)
        };
        
        setHasReactWallet(true);
        setReactWalletData(parsedWalletData);
      } else {
        setHasReactWallet(false);
        setReactWalletData(null);
      }
    } catch (error) {
      console.error('Error checking React Wallet:', error);
      setHasReactWallet(false);
      setReactWalletData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createReactWallet = async (data: { name: string; selectedModules: string[] }) => {
    if (!address) throw new Error('No wallet connected');
    
    setIsLoading(true);
    
    try {
      // Simulate smart contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const walletData: ReactWalletData = {
        name: data.name,
        address: address,
        modules: data.selectedModules,
        createdAt: new Date()
      };
      
      storeWallet(address, walletData);
      
      setHasReactWallet(true);
      setReactWalletData(walletData);
    } catch (error) {
      console.error('Error creating React Wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWalletData = async () => {
    if (address) {
      await checkReactWallet(address);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      checkReactWallet(address);
    } else {
      setHasReactWallet(false);
      setReactWalletData(null);
      setIsLoading(false);
    }
  }, [address, isConnected]);

  return {
    hasReactWallet,
    reactWalletData,
    isLoading,
    createReactWallet,
    refreshWalletData
  };
};