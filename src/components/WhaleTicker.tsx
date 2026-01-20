'use client';

import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { AlertTriangle } from 'lucide-react';
import { useWhaleMonitor } from '@/hooks/useBlockchainStream';

export function WhaleTicker() {
    const latestWhaleTx = useWhaleMonitor(10); // Keep 10 ETH threshold
    const [isVisible, setIsVisible] = useState(false);

    // When a new whale tx is detected, show the ticker
    useEffect(() => {
        if (latestWhaleTx) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [latestWhaleTx]);

    if (!latestWhaleTx || !isVisible) return null;

    const valueEth = Number(formatEther(latestWhaleTx.value)).toFixed(2);

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 backdrop-blur-md border border-amber-500/20 p-4 rounded-xl shadow-2xl flex items-center space-x-4 max-w-sm">
                <div className="p-3 bg-amber-500/20 rounded-full text-amber-500 animate-pulse">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h4 className="text-amber-400 font-bold flex items-center">
                        WHALE ALERT 🐋
                    </h4>
                    <p className="text-white font-mono text-sm mt-1">
                        <span className="font-bold text-lg">{valueEth} ETH</span> transferred
                    </p>
                    <a
                        href={`https://etherscan.io/tx/${latestWhaleTx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-400 hover:text-white mt-1 block truncate max-w-[200px]"
                    >
                        {latestWhaleTx.hash}
                    </a>
                </div>
            </div>
        </div>
    );
}
