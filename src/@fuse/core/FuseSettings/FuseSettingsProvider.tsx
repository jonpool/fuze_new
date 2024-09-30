import React, { createContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { defaultSettings, getParsedQuerySettings } from '@fuse/default-settings';
import settingsConfig from 'src/configs/settingsConfig';
import themeLayoutConfigs from 'src/components/theme-layouts/themeLayoutConfigs';

// Assuming these types are already defined elsewhere in your project
import { FuseSettingsConfigType, FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';
import useUser from '@/auth/useUser';
// Define the SettingsContext type
export type FuseSettingsContextType = {
	data: FuseSettingsConfigType;
	setSettings: (newSettings: Partial<FuseSettingsConfigType>) => void;
	changeTheme: (newTheme: FuseThemesType) => void;
};

// Create the Context with a default value of undefined
export const FuseSettingsContext = createContext<FuseSettingsContextType | undefined>(undefined);

// Function to get initial settings
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
	const [data, setData] = useState<FuseSettingsConfigType>(getInitialSettings());

	// Sync data with userSettings when isGuest or userSettings change
	useEffect(() => {
		const guestSettings = getInitialSettings();
		const newSettings = isGuest ? guestSettings : _.merge({}, guestSettings, userSettings);

		// Only update if settings are different
		if (!_.isEqual(data, newSettings)) {
			setData(newSettings);
		}
	}, [isGuest, userSettings]);

	const setSettings = (newSettings: Partial<FuseSettingsConfigType>) => {
		const _settings = _.merge({}, initialSettings, newSettings);

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
