import { ArrowRight, ExternalLink } from 'lucide-react';
import { formatEther } from 'viem';

interface TransactionRowProps {
    hash: string;
    from: string;
    to: string | null;
    value: bigint;
}

export function TransactionRow({ hash, from, to, value }: TransactionRowProps) {
    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    const valueEth = Number(formatEther(value)).toFixed(4);

    return (
        <div className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-0 animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-neutral-800 rounded-lg">
                    <div className="bg-green-500/20 p-1 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <a
                        href={`https://etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center"
                    >
                        {formatAddress(hash)}
                        <ExternalLink size={10} className="ml-1" />
                    </a>
                    <div className="flex items-center text-xs text-neutral-400 mt-1">
                        <span>{formatAddress(from)}</span>
                        <ArrowRight size={12} className="mx-1 text-neutral-600" />
                        <span>{to ? formatAddress(to) : 'Contract Creation'}</span>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <div className="text-sm font-bold text-white">
                    {valueEth} ETH
                </div>
                <div className="text-xs text-neutral-500">
                    Value
                </div>
            </div>
        </div>
    );
}
