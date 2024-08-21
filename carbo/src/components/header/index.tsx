import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BsChevronDown } from 'react-icons/bs';
import WalletPopup from '../wallet-popup';
import { TNetworkName } from '@/types/common';
import { Link } from 'lucide-react';

const Header = () => {
    const router = useRouter();
    const [account, setAccount] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);
    const [didWalletPop, setDidWalletPop] = useState(false);
    const [network, setNetwork] = useState<TNetworkName>('testnet');

    useEffect(() => {
        const loadWalletInfo = () => {
            const storedWalletInfo = localStorage.getItem('walletInfo');
            if (storedWalletInfo) {
                const { account, isConnected, network } = JSON.parse(storedWalletInfo);
                setAccount(account);
                setIsConnected(isConnected);
                setNetwork(network);
            }
        };

        loadWalletInfo();

        window.addEventListener('storage', loadWalletInfo);

        return () => {
            window.removeEventListener('storage', loadWalletInfo);
        };
    }, []);

    const saveWalletInfo = (account: string, isConnected: boolean, network: TNetworkName) => {
        const walletInfo = { account, isConnected, network };
        localStorage.setItem('walletInfo', JSON.stringify(walletInfo));
    };

    const handleConnectWallet = async () => {
        try {
            if (!window.ethereum) {
               alert('Please install a Web3 wallet first!');
               return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const networkId = await window.ethereum.request({ method: 'net_version' });
            const newNetwork: TNetworkName = networkId === '1' ? 'mainnet' : 'testnet';

            setAccount(accounts[0]);
            setIsConnected(true);
            setNetwork(newNetwork);

            saveWalletInfo(accounts[0], true, newNetwork);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: accounts[0] }),
            });

            router.push('/dashboard');

            if (!response.ok) {
                throw new Error('Login failed');
            }

        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet. Please try again.');
        }
    };

    const handleDisconnect = () => {
        setAccount('');
        setIsConnected(false);
        setNetwork('testnet');
        setDidWalletPop(false);

        localStorage.removeItem('walletInfo');

        router.push('/');
    };

    return (
        <header className="bg-white sticky top-0 z-50 shadow-md py-4 px-8 flex justify-between items-center">
            <a href={'/'} className="text-2xl font-bold text-[#4CBB17]">CarboCredit</a>
            <div className="flex items-center">
                {isConnected ? (
                    <div
                        className="bg-gradient-to-r from-[#4CBB17] to-[#45a515] rounded-lg flex items-center px-3 cursor-pointer mr-4 py-2"
                        onClick={() => setDidWalletPop(true)}
                    >
                        <Image src={'/brandings/hedera-logomark.svg'} alt={'hedera-logomark'} width={30} height={30} />
                        <div className="bg-white/30 w-[1px] h-full mx-3" />
                        <p className="text-lg font-medium text-white">
                            {account.slice(0, 7)}...{account.slice(-5)}
                        </p>
                        <div className="text-xl ml-1 text-white">
                            <BsChevronDown />
                        </div>
                    </div>
                ) : (
                    <button
                        className="bg-[#4CBB17] text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer mr-4"
                        onClick={handleConnectWallet}
                    >
                        Connect Wallet
                    </button>
                )}
                <button className="bg-[#4CBB17] text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer">
                    Docs
                </button>
            </div>
            {didWalletPop && (
                <WalletPopup 
                    network={network} 
                    userAddress={account} 
                    setIsOpen={setDidWalletPop}
                    onDisconnect={handleDisconnect}
                />
            )}
        </header>
    );
};

export default Header;