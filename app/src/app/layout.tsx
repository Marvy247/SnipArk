import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Web3Provider } from "@/providers/Web3Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnipArk - Smart Contract Automation Platform",
  description:
    "SnipArk revolutionizes DeFi with intelligent smart contract automation. Optimize yields, manage liquidity, and execute trades automatically across multiple protocols.",
  keywords:
    "DeFi automation, yield farming, algorithmic trading, smart contract automation, liquidity management, automated trading, DeFi strategies",
  openGraph: {
    title: "SnipArk - DeFi Automation Platform",
    description:
      "Intelligent automation for DeFi operations. Optimize yields, manage liquidity, and execute strategies automatically across protocols.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnipArk - DeFi Automation Made Simple",
    description:
      "Transform your DeFi strategy with intelligent automation. Maximize yields and minimize risk with automated smart contracts.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`font-clash antialiased`}
      >
        <Toaster position="top-right"/>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
