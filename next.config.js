/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Image optimization configuration
    images: {
        domains: [],
        unoptimized: false,
    },

    // Trailing slash configuration for better URL handling
    trailingSlash: false,

    // Ensure proper output for Netlify deployment
    // The @netlify/plugin-nextjs handles the output automatically
    // but we can specify additional options here if needed

    // Disable x-powered-by header for security
    poweredByHeader: false,

    // Compression is handled by Netlify
    compress: true,
};

module.exports = nextConfig;
