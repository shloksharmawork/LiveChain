'use client';

import { useEstimateFeesPerGas } from 'wagmi';
import { formatGwei } from 'viem';
import { Fuel, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function GasWidget() {
    const { data: feeData, isLoading } = useEstimateFeesPerGas();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    const gasPrice = feeData?.gasPrice ? formatGwei(feeData.gasPrice) : null;
    const maxFee = feeData?.maxFeePerGas ? formatGwei(feeData.maxFeePerGas) : null;
    // Use gasPrice (base fee + priority) or maxFee as representative
    const displayGas = maxFee ? Number(maxFee).toFixed(0) : gasPrice ? Number(gasPrice).toFixed(0) : '-';

    return (
        <div className="flex items-center space-x-2 bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 animate-in fade-in duration-500">
            <div className={`p-1.5 rounded-full ${Number(displayGas) > 30 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                <Fuel size={16} />
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Gas (Gwei)</span>
                <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-white leading-none">{isLoading ? '...' : displayGas}</span>
                    {!isLoading && <TrendingUp size={12} className={Number(displayGas) > 30 ? 'text-red-500' : 'text-green-500'} />}
                </div>
            </div>
        </div>
    );
}
