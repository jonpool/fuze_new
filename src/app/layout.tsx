import { Inter } from 'next/font/google';
import clsx from 'clsx';
import generateMetadata from '../utils/generateMetadata';
import App from './App';
import 'src/styles/splash-screen.css';
import 'src/styles/app-base.css';
import 'src/styles/app-components.css';
import 'src/styles/app-utilities.css';

const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = await generateMetadata({
	title: 'Fuse React - Next',
	description: 'Fuse React - Next by FuseTech',
	cardImage: '/card.png',
	robots: 'follow, index',
	favicon: '/favicon.ico',
	url: 'https://react-material.fusetheme.com'
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta
					name="theme-color"
					content="#000000"
				/>
				<link
					href="/assets/tailwind-base.css"
					rel="stylesheet"
				/>

				{/*
			  manifest.json provides metadata used when your web app is added to the
			  homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
			*/}
				<link
					rel="manifest"
					href="/manifest.json"
				/>
				<link
					rel="shortcut icon"
					href="/favicon.ico"
				/>

				<link
					href="/assets/fonts/material-design-icons/MaterialIconsOutlined.css"
					rel="stylesheet"
				/>
				<link
					href="/assets/fonts/inter/inter.css"
					rel="stylesheet"
				/>
				<link
					href="/assets/fonts/meteocons/style.css"
					rel="stylesheet"
				/>
			</head>
			<body
				id="__next"
				className={clsx('loading', inter.className)}
			>
				<App>{children}</App>
			</body>
		</html>
	);
}
