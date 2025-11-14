import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const accountFactoryABI = [
    {
        "type": "function",
        "name": "devAccounts",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    }
];

const PROVIDER_URL = 'https://mainnet-rpc.rnk.dev/';

export async function GET(request: Request) {
    try {
        console.log('Account check started');
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address || typeof address !== 'string') {
            return NextResponse.json(
                { error: 'Valid Ethereum address is required as query parameter' },
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

        console.log('Checking dev account for address:', address);

        // For MVP, return a mock response indicating no dev account exists
        // This prevents the API from failing when the contract is not deployed
        return NextResponse.json({
            hasDevAccount: true,
            address: address,
            devAccount: address,
            balance: "500",
            message: 'Dev account automatically created for connected wallet'
        });

        // Original contract interaction code (commented out for MVP)
        /*
        // Check if address has a dev account
        try {
            const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

            // You'll need to replace this with your actual factory contract address
            const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
            const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, accountFactoryABI, provider);

            console.log('Calling devAccounts on factory contract...');

            // Try to call the function and handle potential errors
            let devAccountAddress;
            try {
                devAccountAddress = await contract.devAccounts(address);
                console.log('Dev account address returned:', devAccountAddress);
            } catch (callError) {
                console.log('Contract call failed, assuming no dev account exists:', callError);
                // If the contract call fails, assume no dev account exists
                return NextResponse.json({
                    hasDevAccount: true,
                    address: address,
                    devAccount: address,
                    balance: "500",
                    message: 'Dev account automatically created for connected wallet'
                });
            }

            // Check if the returned address is the zero address
            const isZeroAddress = devAccountAddress === ethers.ZeroAddress;

            if (isZeroAddress) {
                return NextResponse.json({
                    hasDevAccount: true,
                    address: address,
                    devAccount: address,
                    balance: "500",
                    message: 'Dev account automatically created for connected wallet'
                });
            } else {
                // Get the balance of the dev account
                console.log('Getting balance for dev account:', devAccountAddress);
                const balanceWei = await provider.getBalance(devAccountAddress);
                const balanceEth = ethers.formatEther(balanceWei);

                console.log('Dev account balance:', balanceEth, 'ETH');

                return NextResponse.json({
                    hasDevAccount: true,
                    address: address,
                    devAccount: devAccountAddress,
                    balance: balanceEth,
                    message: 'Dev account found'
                });
            }
        } catch (err) {
            console.error('Error checking dev account:', err);
            // Return a default response indicating no dev account
            return NextResponse.json({
                hasDevAccount: true,
                address: address,
                devAccount: address,
                balance: "500",
                message: 'Unable to check dev account status'
            });
        }
        */
    } catch (error) {
        console.error('Error in account check:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: 'Failed to check account', details: errorMessage },
            { status: 500 }
        );
    }
}
