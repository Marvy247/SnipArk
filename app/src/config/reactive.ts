import { defineChain } from 'viem';

export const lasna = defineChain({
    id: 5318007,
    name: 'Reactive Lasna',
    nativeCurrency: { name: 'REACT', symbol: 'REACT', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://lasna-rpc.rnk.dev/'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Reactscan',
        url: 'https://lasna.reactscan.net',
        apiUrl: 'https://lasna.reactscan.net/api',
      },
    },
    testnet: true,
});

export const reactive = defineChain({
    id: 1597,
    name: 'Reactive Mainnet',
    nativeCurrency: { name: 'REACT', symbol: 'REACT', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://mainnet-rpc.rnk.dev/'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Reactscan',
        url: 'https://reactscan.net/',
        apiUrl: 'https://reactscan.net//api',
      },
    },
    testnet: false,
});