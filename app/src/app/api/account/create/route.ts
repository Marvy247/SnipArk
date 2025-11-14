import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const accountFactoryABI = [
  {
    "type": "function",
    "name": "createAccount",
    "inputs": [
      {
        "name": "dev",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
];

const FACTORY_MANAGER_PRIVATE_KEY = process.env.FACTORY_MANAGER_PRIVATE_KEY!;
const PROVIDER_URL = 'https://mainnet-rpc.rnk.dev/';

export async function POST(request: Request) {
  try {
    console.log('Account creation started');
    const body = await request.json();
    const { address } = body;

    if (!address || typeof address !== 'string') {
      return NextResponse.json(
        { error: 'Valid Ethereum address is required' },
        { status: 400 }
      );
    }

    // Validate Ethereum address format
    if (!ethers.isAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address format' },
        { status: 400 }
      );
    }

    console.log('Received address:', address);

    // Create account using the factory contract
    try {
      const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      const wallet = new ethers.Wallet(FACTORY_MANAGER_PRIVATE_KEY, provider);

      // You'll need to replace this with your actual factory contract address
      const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
      const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, accountFactoryABI, wallet);

      console.log('Calling createAccount on factory contract...');
      const tx = await contract.createAccount(address);
      console.log('CreateAccount tx sent:', tx.hash);

      const receipt = await tx.wait();
      console.log('Account created successfully, tx hash:', receipt.hash);

      return NextResponse.json({
        success: true,
        message: 'Account created successfully'
      });
    } catch (err) {
      console.error('Error creating account:', err);
      throw err;
    }
  } catch (error) {
    console.error('Error creating account:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to create account', details: errorMessage },
      { status: 500 }
    );
  }
} 