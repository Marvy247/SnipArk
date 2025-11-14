"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import ClientOnly from "@/components/ClientOnly";
import CustomButton from "@/components/ui/Button";

interface DashboardStats {
  balance: {
    eth: number;
    usdc: number;
    react: number;
  };
  refillsDone: number;
  deployments: number;
}

interface ActivityItem {
  id: string;
  type: "refill" | "deployment" | "topup";
  description: string;
  date: string;
}

interface DeploymentFormData {
  callbackContractAddress: string;
  reactiveContractAddress: string;
  eventSignatureHash: string;
  refillValue: string;
  refillValueToken: "ETH" | "USDC" | "REACT";
  refillThreshold: string;
  refillThresholdToken: "ETH" | "USDC" | "REACT";
}

interface AccountCheckResponse {
  hasDevAccount: boolean;
  address: string;
  devAccount: string | null;
  balance: string | null;
  message: string;
  error?: string;
}

const MOCK_STATS: DashboardStats = {
  balance: {
    eth: 2.45,
    usdc: 3000,
    react: 500,
  },
  refillsDone: 12,
  deployments: 3,
};

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "refill",
    description: "Refilled Callback Contract with 0.5 ETH",
    date: "Sept 10",
  },
  {
    id: "2",
    type: "deployment",
    description: "New Deployment: ReactiveVault created",
    date: "Sept 8",
  },
  {
    id: "3",
    type: "topup",
    description: "Balance topped up with 200 USDC",
    date: "Sept 7",
  },
];

function DashboardContent() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS);
  const [activities, setActivities] = useState<ActivityItem[]>(MOCK_ACTIVITIES);
  const [selectedToken, setSelectedToken] = useState<"ETH" | "USDC" | "REACT">(
    "ETH"
  );
  const [topUpAmount, setTopUpAmount] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);
  const [deploymentForm, setDeploymentForm] = useState<DeploymentFormData>({
    callbackContractAddress: "",
    reactiveContractAddress: "",
    eventSignatureHash: "",
    refillValue: "",
    refillValueToken: "ETH",
    refillThreshold: "",
    refillThresholdToken: "ETH",
  });

  // Account check states
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);
  const [hasDevAccount, setHasDevAccount] = useState(false);
  const [deploymentLoading, setDeploymentLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for dev account when wallet is connected
  useEffect(() => {
    const checkDevAccount = async () => {
      if (!mounted || !isConnected || !address) {
        setAccountCheckLoading(false);
        return;
      }

      try {
        setAccountCheckLoading(true);
        const response = await fetch(`/api/account/check?address=${address}`);
        const data: AccountCheckResponse = await response.json();

        if (response.ok) {
          setHasDevAccount(data.hasDevAccount);
          if (!data.hasDevAccount) {
            router.push("/create-account");
          } else if (data.balance) {
            // Update the stats with real balance data
            setStats((prev) => ({
              ...prev,
              balance: {
                ...prev.balance,
                react: parseFloat(data.balance || "0") || 0,
              },
            }));
          }
        } else {
          console.error("Failed to check account:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error checking dev account:", error);
      } finally {
        setAccountCheckLoading(false);
      }
    };

    checkDevAccount();
  }, [mounted, isConnected, address]);

  const handleTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) return;

    console.log(`Top up ${topUpAmount} ${selectedToken}`);
    // In a real app: call API to process top-up

    // Add to activity
    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      type: "topup",
      description: `Balance topped up with ${topUpAmount} ${selectedToken}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };

    setActivities((prev) => [newActivity, ...prev]);
    setTopUpAmount("");
  };

  const handleDeploymentSubmit = async () => {
    // Validate form
    if (
      !deploymentForm.callbackContractAddress ||
      !deploymentForm.reactiveContractAddress ||
      !deploymentForm.eventSignatureHash ||
      !deploymentForm.refillValue ||
      !deploymentForm.refillThreshold
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setDeploymentLoading(true);

      // Validate event signature hash format
      if (
        !deploymentForm.eventSignatureHash.startsWith("0x") ||
        deploymentForm.eventSignatureHash.length !== 66
      ) {
        alert(
          "Event signature hash must be a valid 32-byte hex string starting with 0x"
        );
        setDeploymentLoading(false);
        return;
      }

      // Convert values to wei (assuming 18 decimals)
      const refillValueWei = (
        parseFloat(deploymentForm.refillValue) * Math.pow(10, 18)
      ).toString();
      const refillThresholdWei = (
        parseFloat(deploymentForm.refillThreshold) * Math.pow(10, 18)
      ).toString();

      console.log("Creating funder with:", {
        address,
        callbackAddress: deploymentForm.callbackContractAddress,
        reactiveContract: deploymentForm.reactiveContractAddress,
        refillValue: refillValueWei,
        refillthreshold: refillThresholdWei,
        eventTopic: deploymentForm.eventSignatureHash,
      });

      // Call the API endpoint
      const response = await fetch("/api/funder/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          callbackAddress: deploymentForm.callbackContractAddress,
          reactiveContract: deploymentForm.reactiveContractAddress,
          refillValue: refillValueWei,
          refillthreshold: refillThresholdWei,
          eventTopic: deploymentForm.eventSignatureHash,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add to activity
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: "deployment",
          description: `New Monitor deployed for ${deploymentForm.reactiveContractAddress.slice(
            0,
            8
          )}...`,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        };

        setActivities((prev) => [newActivity, ...prev]);
        setStats((prev) => ({ ...prev, deployments: prev.deployments + 1 }));

        // Reset form and close modal
        setDeploymentForm({
          callbackContractAddress: "",
          reactiveContractAddress: "",
          eventSignatureHash: "",
          refillValue: "",
          refillValueToken: "ETH",
          refillThreshold: "",
          refillThresholdToken: "ETH",
        });
        setShowDeploymentModal(false);

        alert("Monitor deployed successfully!");
      } else {
        alert(`Failed to deploy monitor: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deploying monitor:", error);
      alert(
        `Failed to deploy monitor: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setDeploymentLoading(false);
    }
  };

  const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <span className="text-gray-400 hover:text-gray-600 cursor-help">ℹ️</span>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show loading while checking account
  if (accountCheckLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show wallet connection prompt if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-16" />
        <div className="max-w-4xl mx-auto px-4 pt-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Please connect your wallet to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      {/* Navigation spacing */}
      <div className="pt-16" />

      {hasDevAccount ? (
        <>
          {/* Header / Hero Section */}
          <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                SnipArk Dashboard
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                Monitor and optimize your automated DeFi strategies.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Welcome back, User 👋
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Balance Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Balance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      ETH
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stats.balance.eth}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      USDC
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${stats.balance.usdc.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      REACT
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stats.balance.react}
                    </span>
                  </div>
                </div>
              </div>

              {/* Refills Done Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Refills Done
                </h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.refillsDone}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Successful auto-refills
                </p>
              </div>

              {/* Deployments Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Deployments
                </h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.deployments}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
                  Connected contracts
                </p>
                      <CustomButton
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowDeploymentModal(true)}
                      >
                        Configure Strategy
                      </CustomButton>
              </div>
            </div>
          </div>

          {/* Top-Up Section */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Fund Your Automation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Add funds to power your automated DeFi strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-end">
                {/* Token Selector */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Funding Token
                  </label>
                  <select
                    value={selectedToken}
                    onChange={(e) =>
                      setSelectedToken(
                        e.target.value as "ETH" | "USDC" | "REACT"
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="REACT">REACT</option>
                  </select>
                </div>

                {/* Amount Input */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Top Up Button */}
                <CustomButton
                  variant="primary"
                  size="lg"
                  onClick={handleTopUp}
                  disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                >
                  Fund Automation
                </CustomButton>
              </div>
            </div>
          </div>

          {/* Activity / History Section */}
          <div className="max-w-6xl mx-auto px-4 pb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Automation Activity
              </h2>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.type === "refill"
                            ? "bg-blue-500"
                            : activity.type === "deployment"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {activity.description}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deployment Modal */}
          {showDeploymentModal && hasDevAccount && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Configure Automation
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Set up automated strategies for your DeFi operations.
                      </p>
                    </div>
                      <CustomButton
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDeploymentModal(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </CustomButton>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Callback Contract Address */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Callback Contract Address
                      <InfoTooltip text="This is the contract that emits the callback event you want to monitor." />
                    </label>
                    <input
                      type="text"
                      value={deploymentForm.callbackContractAddress}
                      onChange={(e) =>
                        setDeploymentForm((prev) => ({
                          ...prev,
                          callbackContractAddress: e.target.value,
                        }))
                      }
                      placeholder="0x..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Reactive Contract Address */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reactive Contract Address
                      <InfoTooltip text="This is the contract whose balance will be refilled when low." />
                    </label>
                    <input
                      type="text"
                      value={deploymentForm.reactiveContractAddress}
                      onChange={(e) =>
                        setDeploymentForm((prev) => ({
                          ...prev,
                          reactiveContractAddress: e.target.value,
                        }))
                      }
                      placeholder="0x..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Callback Event Signature Hash */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Callback Event Signature Hash
                      <InfoTooltip text="Enter the keccak256 hash (topic_0) of the event you want to monitor." />
                    </label>
                    <input
                      type="text"
                      value={deploymentForm.eventSignatureHash}
                      onChange={(e) =>
                        setDeploymentForm((prev) => ({
                          ...prev,
                          eventSignatureHash: e.target.value,
                        }))
                      }
                      placeholder="0x1234abcd..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Refill Value */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Refill Value
                      <InfoTooltip text="This is the amount that will be sent to the contract each time a refill occurs." />
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        value={deploymentForm.refillValue}
                        onChange={(e) =>
                          setDeploymentForm((prev) => ({
                            ...prev,
                            refillValue: e.target.value,
                          }))
                        }
                        placeholder="0.1"
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={deploymentForm.refillValueToken}
                        onChange={(e) =>
                          setDeploymentForm((prev) => ({
                            ...prev,
                            refillValueToken: e.target.value as
                              | "ETH"
                              | "USDC"
                              | "REACT",
                          }))
                        }
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                        <option value="REACT">REACT</option>
                      </select>
                    </div>
                  </div>

                  {/* Refill Threshold */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Refill Threshold
                      <InfoTooltip text="If the contract balance goes below this value, a refill will be triggered." />
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        value={deploymentForm.refillThreshold}
                        onChange={(e) =>
                          setDeploymentForm((prev) => ({
                            ...prev,
                            refillThreshold: e.target.value,
                          }))
                        }
                        placeholder="0.05"
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={deploymentForm.refillThresholdToken}
                        onChange={(e) =>
                          setDeploymentForm((prev) => ({
                            ...prev,
                            refillThresholdToken: e.target.value as
                              | "ETH"
                              | "USDC"
                              | "REACT",
                          }))
                        }
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                        <option value="REACT">REACT</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Need help? See our docs on{" "}
                      <a
                        href="/docs/deployment"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Deployment Setup
                      </a>
                      .
                    </p>
                    <div className="flex gap-3">
                      <CustomButton
                        variant="outline"
                        onClick={() => setShowDeploymentModal(false)}
                      >
                        Cancel
                      </CustomButton>
                      <CustomButton
                        variant="primary"
                        onClick={handleDeploymentSubmit}
                        disabled={deploymentLoading}
                      >
                        {deploymentLoading && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        )}
                        {deploymentLoading ? "Configuring..." : "Configure Strategy"}
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-4xl mx-auto px-4 pt-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Setting up your account...
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Please wait while we redirect you to create your developer account.
          </p>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ClientOnly>
      <DashboardContent />
    </ClientOnly>
  );
}
