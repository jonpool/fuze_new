'use client';

import { FuseLayoutProps } from '@fuse/core/FuseLayout/FuseLayout';
import FuseLayout from '@fuse/core/FuseLayout';
import merge from 'lodash/merge';
import themeLayouts from '../theme-layouts/themeLayouts';

type MainLayoutProps = Omit<FuseLayoutProps, 'layouts'> & {
	navbar?: boolean;
	toolbar?: boolean;
	footer?: boolean;
	leftSidePanel?: boolean;
	rightSidePanel?: boolean;
};

function MainLayout(props: MainLayoutProps) {
	const {
		children,
		navbar,
		toolbar,
		footer,
		leftSidePanel,
		rightSidePanel,
		settings = {}, // Default to an empty object if settings is undefined
		...rest
	} = props;

	// Shorthand settings object
	const shorthandSettings = {
		layout: {
			config: {
				navbar: {
					display: navbar
				},
				toolbar: {
					display: toolbar
				},
				footer: {
					display: footer
				},
				leftSidePanel: {
					display: leftSidePanel
				},
				rightSidePanel: {
					display: rightSidePanel
				}
			}
		}
	};

	// Merge shorthand settings with existing settings
	const mergedSettings = merge({}, settings, shorthandSettings);
	return (
		<FuseLayout
			{...rest}
			layouts={themeLayouts}
			settings={mergedSettings}
		>
			{children}
		</FuseLayout>
	);
}

export default MainLayout;
