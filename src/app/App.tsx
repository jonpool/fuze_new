'use client';

import { SnackbarProvider } from 'notistack';
import MockApiProvider from '@mock-api/MockApiProvider';
import AuthenticationProvider from 'src/auth/AuthenticationProvider';
import { useMemo } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enUS } from 'date-fns/locale/en-US';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import ErrorBoundary from '@fuse/utils/ErrorBoundary';
import AppContext from 'src/contexts/AppContext';

import AWSAuthProvider from 'src/auth/services/aws/AWSAuthProvider';
import FirebaseAuthProvider from 'src/auth/services/firebase/FirebaseAuthProvider';
import JwtAuthProvider from 'src/auth/services/jwt/JwtAuthProvider';
import { setDefaultSettings, setInitialSettings } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import store from '../store/store';
import MainThemeProvider from '../contexts/MainThemeProvider';

type AppProps = {
	children?: React.ReactNode;
};

/**
 * The Authentication providers.
 */
const authProviders = [
	{
		name: 'jwt',
		Provider: JwtAuthProvider
	},
	{
		name: 'aws',
		Provider: AWSAuthProvider
	},
	{
		name: 'firebase',
		Provider: FirebaseAuthProvider
	}
];

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
						{/* Mock API Provider */}
						<MockApiProvider>
							{/* Theme Provider */}
							<MainThemeProvider>
								{/* Authentication Provider */}
								<AuthenticationProvider
									providers={authProviders}
									onAuthStateChanged={(authState) => {
										if (authState.authStatus === 'configuring') {
											return;
										}

										// Set the default settings when the user settings are set
										if (authState.user?.data?.settings) {
											store.dispatch(setDefaultSettings(authState.user?.data?.settings));
										}

										// Set the initial settings when the user is not authenticated
										if (!authState.isAuthenticated) {
											store.dispatch(setInitialSettings());
										}
									}}
								>
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
								</AuthenticationProvider>
							</MainThemeProvider>
						</MockApiProvider>
					</Provider>
				</LocalizationProvider>
			</AppContext.Provider>
		</ErrorBoundary>
	);
}

export default App;
