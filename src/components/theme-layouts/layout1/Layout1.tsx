'use client';

import { styled } from '@mui/material/styles';
import FuseMessage from '@fuse/core/FuseMessage';
import { lazy, memo, ReactNode } from 'react';
import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { Layout1ConfigDefaultsType } from 'src/components/theme-layouts/layout1/Layout1Config';
import Configurator from 'src/components/theme-layouts/components/configurator/Configurator';
import { useAppSelector } from 'src/store/hooks';
import FooterLayout1 from './components/FooterLayout1';
import LeftSideLayout1 from './components/LeftSideLayout1';
import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import RightSideLayout1 from './components/RightSideLayout1';
import ToolbarLayout1 from './components/ToolbarLayout1';

const FuseDialog = lazy(() => import('@fuse/core/FuseDialog/FuseDialog'));

const Root = styled('div')(({ config }: { config: Layout1ConfigDefaultsType }) => ({
	variants: [
		{
			props: {
				mode: 'boxed'
			},
			style: {
				clipPath: 'inset(0)',
				maxWidth: `${config.containerWidth}px`,
				margin: '0 auto',
				boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
			}
		},
		{
			props: {
				mode: 'container'
			},
			style: {
				'& .container': {
					maxWidth: `${config.containerWidth}px`,
					width: '100%',
					margin: '0 auto'
				}
			}
		}
	]
}));

type Layout1Props = {
	children?: ReactNode;
};

/**
 * The layout 1.
 */
function Layout1(props: Layout1Props) {
	const { children } = props;
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as Layout1ConfigDefaultsType;

	return (
		<Root
			id="fuse-layout"
			config={config}
			className="flex flex-auto w-full"
		>
			{config.leftSidePanel.display && <LeftSideLayout1 />}

			<div className="flex min-w-0 flex-auto">
				{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout1 />}

				<main
					id="fuse-main"
					className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
				>
					{config.toolbar.display && (
						<ToolbarLayout1 className={config.toolbar.style === 'fixed' ? 'sticky top-0' : ''} />
					)}

					<div className="sticky top-0 z-99">
						<Configurator />
					</div>

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<FuseDialog />
						{children}
					</div>

					{config.footer.display && (
						<FooterLayout1 className={config.footer.style === 'fixed' ? 'sticky bottom-0' : ''} />
					)}
				</main>

				{config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout1 />}
			</div>

			{config.rightSidePanel.display && <RightSideLayout1 />}
			<FuseMessage />
		</Root>
	);
}

export default memo(Layout1);
