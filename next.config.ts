import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['wagmi', '@rainbow-me/rainbowkit', 'viem'],
};

export default nextConfig;
