'use client';

import { useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import {
	generateSettings,
	selectFuseCurrentSettings,
	selectFuseDefaultSettings,
	setSettings
} from '@fuse/core/FuseSettings/fuseSettingsSlice';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { themeLayoutsType } from 'src/theme-layouts/themeLayouts';
import { PartialDeep } from 'type-fest';
import { usePathname } from 'next/navigation';
import FuseLoading from '../FuseLoading';

export type FuseRouteObjectType = {
	settings?: FuseSettingsConfigType;
	auth?: string[] | [] | null | undefined;
};

export type FuseLayoutProps = {
	layouts: themeLayoutsType;
	children?: React.ReactNode;
	settings?: PartialDeep<FuseRouteObjectType['settings']>;
};

/**
 * FuseLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function FuseLayout(props: FuseLayoutProps) {
	const { layouts, children, settings } = props;
	const dispatch = useAppDispatch();
	const currentSettings = useAppSelector(selectFuseCurrentSettings);
	const defaultSettings = useAppSelector(selectFuseDefaultSettings);

	const layoutStyle = currentSettings.layout.style;
	const pathname = usePathname();

	const newSettings = useRef<PartialDeep<FuseSettingsConfigType>>(currentSettings);

	const shouldAwaitRender = useCallback(() => {
		let _newSettings: FuseSettingsConfigType;

		/**
		 * On Path changed
		 */
		if (settings) {
			/**
			 * if matched route has settings
			 */

			_newSettings = generateSettings(defaultSettings, settings);
		} else if (!_.isEqual(newSettings.current, defaultSettings)) {
			/**
			 * Reset to default settings on the new path
			 */
			_newSettings = _.merge({}, defaultSettings);
		} else {
			_newSettings = newSettings.current as FuseSettingsConfigType;
		}

		if (!_.isEqual(newSettings.current, _newSettings)) {
			newSettings.current = _newSettings;
		}
	}, [defaultSettings, settings]);

	shouldAwaitRender();

	const expectedSettings = useMemo(() => newSettings.current, [newSettings.current]);

	useDeepCompareEffect(() => {
		if (!_.isEqual(expectedSettings, currentSettings)) {
			dispatch(setSettings(expectedSettings as FuseSettingsConfigType));
		}
	}, [dispatch, expectedSettings, currentSettings]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return useMemo(() => {
		if (!_.isEqual(expectedSettings, currentSettings)) {
			return <FuseLoading />;
		}

		return Object.entries(layouts).map(([key, Layout]) => {
			if (key === layoutStyle) {
				return (
					<React.Fragment key={key}>
						<Layout>{children}</Layout>
					</React.Fragment>
				);
			}

			return null;
		});
	}, [layouts, layoutStyle, children, expectedSettings, currentSettings]);
}

export default FuseLayout;
