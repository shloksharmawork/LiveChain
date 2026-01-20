import { formatDistanceToNow } from 'date-fns';
import { Box, Layers, User } from 'lucide-react';

interface BlockCardProps {
    blockNumber: bigint;
    timestamp: bigint;
    miner: string;
    txCount: number;
    gasUsed: bigint;
    gasLimit: bigint;
}

export function BlockCard({ blockNumber, timestamp, miner, txCount, gasUsed, gasLimit }: BlockCardProps) {
    const timeAgo = formatDistanceToNow(new Date(Number(timestamp) * 1000), { addSuffix: true });
    const gasPercentage = Number((gasUsed * 100n) / gasLimit);

    return (
        <div
            className="glass-panel p-4 rounded-xl mb-3 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300 transform"
        >
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <Layers size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center">
                        #{blockNumber.toString()}
                        <span className="ml-2 text-xs font-normal text-neutral-500 bg-neutral-900/50 px-2 py-0.5 rounded-full">
                            {timeAgo}
                        </span>
                    </h3>
                    <div className="flex items-center text-sm text-neutral-400 mt-1 space-x-3">
                        <span className="flex items-center" title="Miner">
                            <User size={12} className="mr-1" />
                            {miner.slice(0, 6)}...{miner.slice(-4)}
                        </span>
                        <span className="flex items-center" title="Transactions">
                            <Box size={12} className="mr-1" />
                            {txCount} txs
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end min-w-[100px]">
                <span className="text-xs text-neutral-500 mb-1">Gas Usage</span>
                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full rounded-full ${gasPercentage > 80 ? 'bg-red-500' : gasPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                        style={{ width: `${gasPercentage}%` }}
                    />
                </div>
                <span className="text-xs text-neutral-400 mt-1">{gasPercentage.toFixed(1)}%</span>
            </div>
        </div>
    );
}
