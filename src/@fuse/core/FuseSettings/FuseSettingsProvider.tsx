import React, { createContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { defaultSettings, getParsedQuerySettings } from '@fuse/default-settings';
import settingsConfig from 'src/configs/settingsConfig';
import themeLayoutConfigs from 'src/components/theme-layouts/themeLayoutConfigs';
import { FuseSettingsConfigType, FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';
import useUser from '@auth/useUser';

// FuseSettingsContext type
export type FuseSettingsContextType = {
	data: FuseSettingsConfigType;
	setSettings: (newSettings: Partial<FuseSettingsConfigType>) => void;
	changeTheme: (newTheme: FuseThemesType) => void;
};

// Context with a default value of undefined
export const FuseSettingsContext = createContext<FuseSettingsContextType | undefined>(undefined);

// Get initial settings
const getInitialSettings = (): FuseSettingsConfigType => {
	const defaultLayoutStyle = settingsConfig.layout?.style || 'layout1';
	const layout = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle]?.defaults
	};
	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
};

const initialSettings = getInitialSettings();

// FuseSettingsProvider component
export function FuseSettingsProvider({ children }: { children: ReactNode }) {
	const { data: user, isGuest } = useUser();

	const userSettings = useMemo(() => user?.settings || {}, [user]);

	const calculateSettings = useCallback(() => {
		const defaultSettings = _.merge({}, initialSettings);
		return isGuest ? defaultSettings : _.merge({}, defaultSettings, userSettings);
	}, [isGuest, userSettings]);

	const [data, setData] = useState<FuseSettingsConfigType>(calculateSettings());

	// Sync data with userSettings when isGuest or userSettings change
	useEffect(() => {
		const newSettings = calculateSettings();

		// Only update if settings are different
		if (!_.isEqual(data, newSettings)) {
			setData(newSettings);
		}
	}, [calculateSettings]);

	const setSettings = (newSettings: Partial<FuseSettingsConfigType>) => {
		const _settings = _.merge({}, data, newSettings);

		if (!_.isEqual(_settings, data)) {
			setData(_.merge({}, _settings));
		}
	};

	const changeTheme = useCallback(
		(newTheme: FuseThemesType) => {
			const { navbar, footer, toolbar, main } = newTheme;

			const newSettings: FuseSettingsConfigType = {
				...data,
				theme: {
					main,
					navbar,
					toolbar,
					footer
				}
			};

			setSettings(newSettings);
		},
		[data, setSettings]
	);

	return (
		<FuseSettingsContext.Provider
			value={useMemo(
				() => ({
					data,
					setSettings,
					changeTheme
				}),
				[data, setSettings]
			)}
		>
			{children}
		</FuseSettingsContext.Provider>
	);
}

export default FuseSettingsProvider;
