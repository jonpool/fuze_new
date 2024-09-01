'use client';

import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import FuseNavigation from '@fuse/core/FuseNavigation';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { usePathname } from 'next/navigation';
import DocumentationNavigation from './DocumentationNavigation';
import DocumentationPageBreadcrumb from './DocumentationPageBreadcrumb';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageCarded-header': {},
	'& .FusePageCarded-content': {
		backgroundColor: theme.palette.background.default
	},
	'& .FusePageCarded-wrapper': {},
	'& .FusePageCarded-leftSidebar': {},
	'& .description': {}
}));
type DocumentationPageLayoutProps = {
	children: React.ReactNode;
};

/**
 * Documentation Page Layout
 */
function DocumentationPageLayout(props: DocumentationPageLayoutProps) {
	const { children } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const pathname = usePathname();
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			setLeftSidebarOpen(false);
		}
	}, [pathname, isMobile]);

	return (
		<Root
			header={
				<div>
					<div className="flex items-center justify-center pt-12 px-4 md:px-12 max-w-full h-full mb-16 sm:mb-0">
						<IconButton
							onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
							aria-label="toggle left sidebar"
						>
							<FuseSvgIcon>heroicons-outline:bars-3</FuseSvgIcon>
						</IconButton>

						<DocumentationPageBreadcrumb />
					</div>
				</div>
			}
			content={
				<div className="p-16 md:p-24 min-h-full flex flex-auto flex-col">
					<div className="flex flex-col flex-1 relative pb-32">{children}</div>
				</div>
			}
			leftSidebarContent={
				<div className="px-4 py-24">
					<FuseNavigation
						className={clsx('navigation')}
						navigation={DocumentationNavigation.children}
					/>
				</div>
			}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarWidth={288}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default DocumentationPageLayout;