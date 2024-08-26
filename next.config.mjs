/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: false,
	eslint: {
		// Only enable ESLint in development
		ignoreDuringBuilds: process.env.NODE_ENV === 'production'
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true
	}
};

export default nextConfig;
