/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    webpack: (config) => {
        // Add fallbacks for Node.js built-in modules
        config.resolve.fallback = {
            fs: false,
            net: false,
            dns: false,
            child_process: false,
            tls: false,
        };

        return config;
    },
};

export default nextConfig;
