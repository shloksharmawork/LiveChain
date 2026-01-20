'use client';

import { useState, useEffect } from 'react';
import { TransactionRow } from './TransactionRow';
import { useLiveTransactions } from '@/hooks/useBlockchainStream';

export function TransactionFeed() {
    const transactions = useLiveTransactions();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Latest Transactions</h2>
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <span className="text-xs text-blue-400 font-mono">STREAM</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                {transactions.length === 0 ? (
                    <div className="text-center text-neutral-500 py-10">
                        Waiting for transactions...
                    </div>
                ) : (
                    transactions.map((tx) => (
                        <TransactionRow
                            key={tx.hash}
                            hash={tx.hash}
                            from={tx.from}
                            to={tx.to}
                            value={tx.value}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
