import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { lasna, reactive } from './reactive';

export const config = getDefaultConfig({
  appName: 'ReactWallet',
  projectId: '6979d82a9d32fcb28f5dd9d2c593d63a',
  chains: [reactive],
});