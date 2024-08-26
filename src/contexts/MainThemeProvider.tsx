'use client';

import * as React from 'react';
import { useMemo } from 'react';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { useSelector } from 'react-redux';
import { selectMainTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import FuseTheme from '@fuse/core/FuseTheme';
import { selectCurrentLanguageDirection } from 'src/store/i18nSlice';
import { useAppSelector } from 'src/store/hooks';

type MainThemeProviderProps = {
	children: React.ReactNode;
};

const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		prepend: true
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		prepend: true
	}
};

function MainThemeProvider({ children }: MainThemeProviderProps) {
	const mainTheme = useSelector(selectMainTheme);
	const langDirection = useAppSelector(selectCurrentLanguageDirection);
	const cacheProviderValue = useMemo(
		() => createCache(emotionCacheOptions[langDirection] as Options),
		[langDirection]
	);

	return (
		<CacheProvider value={cacheProviderValue}>
			<FuseTheme
				theme={mainTheme}
				root
			>
				{children}
			</FuseTheme>
		</CacheProvider>
	);
}

export default MainThemeProvider;
