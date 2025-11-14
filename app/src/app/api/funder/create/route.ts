import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const funderFactoryABI = [
    {
      "type": "function",
      "name": "latestDeployed",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "createFunder",
      "inputs": [
        {
          "name": "dev",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "callbackContract",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "reactiveContract",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "refillValue",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "refillthreshold",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    }
]

const reactiveContractABI = [
    {
        "type": "function",
        "name": "createReactive",
        "inputs": [
          {
            "name": "callbackHandler",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "callbackContract",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "eventTopic",
            "type": "uint256",
            "internalType": "uint256"
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
    const { address, callbackAddress, reactiveContract, refillValue, refillthreshold, eventTopic } = body;

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
      const FUNDER_FACTORY_CONTRACT_ADDRESS = process.env.FUNDER_FACTORY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
      const funderFactory = new ethers.Contract(FUNDER_FACTORY_CONTRACT_ADDRESS, funderFactoryABI, wallet);

      console.log('Calling createAccount on factory contract...');
      const funderTX = await funderFactory.createFunder(address, callbackAddress, reactiveContract, refillValue, refillthreshold);
      console.log('CreateAccount tx sent:', funderTX.hash);
      const receipt = await funderTX.wait();
      console.log('Funder created successfully, tx hash:', receipt.hash);

      const funderAddress = await funderFactory.latestDeployed();

      const REACTIVE_FACTORY_CONTRACT_ADDRESS = process.env.REACTIVE_FACTORY_CONTRACT_ADDRESS!;
      const reactiveFactory = new ethers.Contract(REACTIVE_FACTORY_CONTRACT_ADDRESS, reactiveContractABI, wallet);

      console.log('Calling createAccount on factory contract...');
      const reactiveTX = await reactiveFactory.createReactive(funderAddress, callbackAddress, eventTopic);
      console.log('CreateAccount tx sent:', reactiveTX.hash);
      const txreceipt = await reactiveTX.wait();
      console.log('Reactive contract created successfully, tx hash:', txreceipt.hash);

      return NextResponse.json({
        success: true,
        message: 'funder created successfully'
      });
    } catch (err) {
      console.error('Error creating account:', err);
      throw err;
    }
  } catch (error) {
    console.error('Error creating reactive:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to create recative', details: errorMessage },
      { status: 500 }
    );
  }
} 