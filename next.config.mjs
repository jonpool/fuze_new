/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: false,
	compiler: {
		styledComponents: {
			ssr: true
			// displayName: true,
		}
	},
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
