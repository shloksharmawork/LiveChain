import { BlockFeed } from '@/components/BlockFeed';
import { TransactionFeed } from '@/components/TransactionFeed';
import { GasWidget } from '@/components/GasWidget';
import { WhaleTicker } from '@/components/WhaleTicker';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] p-8">
      <WhaleTicker />
      <div className="max-w-6xl w-full space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
              LiveChain
            </h1>
            <p className="text-lg text-neutral-400 mt-2">
              Real-Time Blockchain Activity Dashboard
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <GasWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/* Live Block Stream */}
          <div className="glass-panel p-6 rounded-2xl h-[600px] flex flex-col">
            <BlockFeed />
          </div>
          {/* Live Transaction Feed */}
          <div className="glass-panel p-6 rounded-2xl h-[600px] flex flex-col">
            <TransactionFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
