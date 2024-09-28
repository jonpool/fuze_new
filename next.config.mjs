import aliases from './aliases.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental:
		process.env.NODE_ENV === 'production'
			? {}
			: {
					turbo: {
						caching: false, // Disable caching on build
						parallel: true, // Keep parallel builds enabled
						resolveAlias: { ...aliases }
					}
				},
	reactStrictMode: false,
	swcMinify: true,
	eslint: {
		// Only enable ESLint in development
		ignoreDuringBuilds: process.env.NODE_ENV === 'production'
	},
	typescript: {
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: true
	},
	webpack: (config) => {
		if (config.module && config.module.rules) {
			config.module.rules.push({
				test: /\.(json|js|ts|tsx|jsx)$/,
				resourceQuery: /raw/,
				use: 'raw-loader'
			});
		}

		return config;
	}
};

export default nextConfig;
