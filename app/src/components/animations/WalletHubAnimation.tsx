"use client";

import React from "react";

const WalletHubAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Central Wallet */}
      <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
          <span className="text-3xl">👛</span>
        </div>
      </div>

      {/* Orbiting Modules */}
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "20s" }}
      >
        {/* Module 1 - AutoPay */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
          <span className="text-lg">⏰</span>
        </div>

        {/* Module 2 - DCA Bot */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-purple-200 dark:border-purple-800">
          <span className="text-lg">📈</span>
        </div>

        {/* Module 3 - Yield Aggregator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-green-200 dark:border-green-800">
          <span className="text-lg">📊</span>
        </div>

        {/* Module 4 - Custom Agent */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-orange-200 dark:border-orange-800">
          <span className="text-lg">💻</span>
        </div>
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Animated connection lines */}
        <circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          strokeDasharray="3,3"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletHubAnimation;
