'use client';

import { useState, useEffect } from 'react';
import { BlockCard } from './BlockCard';
import { useLiveBlocks } from '@/hooks/useBlockchainStream';

export function BlockFeed() {
    const blocks = useLiveBlocks();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Live Blocks</h2>
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-400 font-mono">LIVE</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                {blocks.length === 0 ? (
                    <div className="text-center text-neutral-500 py-10">
                        Waiting for next block...
                    </div>
                ) : (
                    blocks.map((block) => (
                        <BlockCard
                            key={block.hash}
                            blockNumber={block.number || 0n}
                            timestamp={block.timestamp || 0n}
                            miner={block.miner || '0x0'}
                            txCount={block.transactions.length}
                            gasUsed={block.gasUsed || 0n}
                            gasLimit={block.gasLimit || 1n}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
