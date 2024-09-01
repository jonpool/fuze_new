'use client';

import Breadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from 'src/store/hooks';

import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import withSlices from 'src/store/withSlices';
import {
	navigationSlice,
	selectNavigation
} from 'src/theme-layouts/shared-components/navigation/store/navigationSlice';

type PageBreadcrumbProps = BreadcrumbsProps & {
	className?: string;
};

// Function to get the navigation item based on URL
function getNavigationItem(url: string, navigationItems: FuseNavItemType[]): FuseNavItemType {
	for (let i = 0; i < navigationItems.length; i += 1) {
		const item = navigationItems[i];

		if (item.url === url) {
			return item;
		}

		if (item.children) {
			const childItem = getNavigationItem(url, item.children);

			if (childItem) {
				return childItem;
			}
		}
	}
	return null;
}

function PageBreadcrumb(props: PageBreadcrumbProps) {
	const { className, ...rest } = props;
	const pathname = usePathname();
	const navigation = useAppSelector(selectNavigation);

	const crumbs = pathname
		.split('/')
		.filter(Boolean)
		.reduce(
			(acc: { title: string; url: string }[], part, index, array) => {
				const url = `/${array.slice(0, index + 1).join('/')}`;
				const navItem = getNavigationItem(url, navigation);
				const title = navItem?.title || part;

				acc.push({ title, url });
				return acc;
			},
			[{ title: 'Home', url: '/' }]
		);

	return (
		<Breadcrumbs
			className={clsx('flex w-full', className)}
			aria-label="breadcrumb"
			color="primary"
			{...rest}
		>
			{crumbs.map((item, index) => (
				<Typography
					component={item.url ? Link : 'span'}
					href={item.url}
					key={index}
					className="block font-medium tracking-tight capitalize max-w-128 truncate"
					role="button"
				>
					{item.title}
				</Typography>
			))}
		</Breadcrumbs>
	);
}

const PageBreadcrumbWithNavigationSlices = withSlices<PageBreadcrumbProps>([navigationSlice])(PageBreadcrumb);

export default PageBreadcrumbWithNavigationSlices;
