'use client';

import * as React from 'react';
import { useMemo } from 'react';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import FuseTheme from '@fuse/core/FuseTheme';
import { useMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { useI18n } from '@/contexts/I18nProvider';

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
	const mainTheme = useMainTheme();
	const { langDirection } = useI18n();
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
