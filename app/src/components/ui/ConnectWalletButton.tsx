'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import CustomButton from './Button';

export default function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-4">
        <CustomButton variant="outline" size="sm">
          Connect Wallet
        </CustomButton>
        <CustomButton variant="primary" size="sm" href="/wallet">
          Launch App
        </CustomButton>
      </div>
    );
  }

  return <ConnectButton />;
}