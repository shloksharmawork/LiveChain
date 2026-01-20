import { useState, useEffect } from 'react';
import { usePublicClient, useWatchBlocks } from 'wagmi';
import { formatEther } from 'viem';
import type { Block, Transaction } from 'viem';

/**
 * Hook to get a stream of the latest blocks.
 * @param limit Number of blocks to keep in history (default: 10)
 */
export function useLiveBlocks(limit: number = 10) {
    const [blocks, setBlocks] = useState<Block[]>([]);

    useWatchBlocks({
        onBlock(block) {
            setBlocks((prev) => {
                if (prev.find((b) => b.number === block.number)) return prev;
                return [block, ...prev].slice(0, limit);
            });
        },
    });

    return blocks;
}

/**
 * Hook to get a stream of the latest transactions.
 * @param limit Number of transactions to keep in history (default: 20)
 */
export function useLiveTransactions(limit: number = 20) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const publicClient = usePublicClient();

    useEffect(() => {
        if (!publicClient) return;

        const unwatch = publicClient.watchBlocks({
            includeTransactions: true,
            onBlock: (block) => {
                if (block.transactions && block.transactions.length > 0) {
                    const newTxs = block.transactions as Transaction[];
                    setTransactions((prev) => {
                        // Add new txs to top, unique check not strictly needed if blocks are unique but safer
                        // Simply taking the first 10-20 to avoid flood
                        return [...newTxs, ...prev].slice(0, limit);
                    });
                }
            },
        });

        return () => unwatch();
    }, [publicClient, limit]);

    return transactions;
}

/**
 * Hook to monitor for high-value transactions.
 * @param thresholdEth Minimum value in ETH to trigger alert (default: 10)
 */
export function useWhaleMonitor(thresholdEth: number = 10) {
    const [whaleTx, setWhaleTx] = useState<Transaction | null>(null);
    const publicClient = usePublicClient();

    useEffect(() => {
        if (!publicClient) return;

        const unwatch = publicClient.watchBlocks({
            includeTransactions: true,
            onBlock: (block) => {
                if (!block.transactions) return;
                const txs = block.transactions as Transaction[];

                // Find largest tx > threshold
                const bigTx = txs.find((tx) => {
                    const val = Number(formatEther(tx.value));
                    return val >= thresholdEth;
                });

                if (bigTx) {
                    setWhaleTx(bigTx);
                }
            },
        });

        return () => unwatch();
    }, [publicClient, thresholdEth]);

    return whaleTx;
}
