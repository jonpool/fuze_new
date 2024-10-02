'use client';

import * as React from 'react';
import { useMemo } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import FuseTheme from '@fuse/core/FuseTheme';
import { useMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { AppRouterCacheProvider, AppRouterCacheProviderProps } from '@mui/material-nextjs/v14-appRouter';
import { useI18n } from '@/contexts/I18nProvider';

type MainThemeProviderProps = {
	children: React.ReactNode;
};

const emotionCacheOptions: Record<string, AppRouterCacheProviderProps['options']> = {
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

	const cacheOptions = useMemo(
		() => ({ ...emotionCacheOptions[langDirection], enableCssLayer: false }),
		[langDirection]
	);

	return (
		<AppRouterCacheProvider options={cacheOptions}>
			<FuseTheme
				theme={mainTheme}
				root
			>
				{children}
			</FuseTheme>
		</AppRouterCacheProvider>
	);
}

export default MainThemeProvider;
