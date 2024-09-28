'use client';

import { SnackbarProvider } from 'notistack';
import { useMemo } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enUS } from 'date-fns/locale/en-US';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import ErrorBoundary from '@fuse/utils/ErrorBoundary';
import AppContext from 'src/contexts/AppContext';

import store from '../store/store';
import MainThemeProvider from '../contexts/MainThemeProvider';

import AuthenticationProvider from '@/auth/AuthenticationProvider';

type AppProps = {
	children?: React.ReactNode;
};

/**
 * The main app component.
 */
function App(props: AppProps) {
	const { children } = props;
	const val = useMemo(() => ({}), []);

	return (
		<ErrorBoundary>
			<AppContext.Provider value={val}>
				{/* Date Picker Localization Provider */}
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={enUS}
				>
					{/* Redux Store Provider */}
					<Provider store={store}>
						{/* Authentication Provider */}
						<AuthenticationProvider>
							{/* Theme Provider */}
							<MainThemeProvider>
								{/* Notistack Notification Provider */}
								<SnackbarProvider
									maxSnack={5}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right'
									}}
									classes={{
										containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
									}}
								>
									{children}
								</SnackbarProvider>
							</MainThemeProvider>
						</AuthenticationProvider>
					</Provider>
				</LocalizationProvider>
			</AppContext.Provider>
		</ErrorBoundary>
	);
}

export default App;
