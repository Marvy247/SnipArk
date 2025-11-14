'use client';

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import CustomButton from "./Button";

const WalletConnectedButton: React.FC = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const pendingNavigation = useRef(false);

  const handleGetStarted = () => {
    if (isConnected) {
      // Wallet is connected, navigate to wallet page
      router.push("/dashboard");
    } else {
      // Wallet not connected, open connect modal and set flag for navigation
      pendingNavigation.current = true;
      if (openConnectModal) {
        openConnectModal();
      }
    }
  };

  // Navigate to wallet page after successful connection
  useEffect(() => {
    if (isConnected && pendingNavigation.current) {
      pendingNavigation.current = false;
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <CustomButton
      variant="primary"
      size="lg"
      className="text-lg px-8 py-4"
      onClick={handleGetStarted}
    >
      Get Started
    </CustomButton>
  );
};

export default WalletConnectedButton;