import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { Layout1ConfigDefaultsType } from 'src/components/theme-layouts/layout1/Layout1Config';
import NavbarToggleButton from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';
import { selectFuseNavbar } from 'src/components/theme-layouts/components/navbar/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import themeOptions from 'src/configs/themeOptions';
import _ from '@lodash';
import NotificationPanelToggleButton from 'src/app/(control-panel)/apps/notifications/NotificationPanelToggleButton';
import LightDarkModeToggle from 'src/components/LightDarkModeToggle';
import AdjustFontSize from '../../components/AdjustFontSize';
import FullScreenToggle from '../../components/FullScreenToggle';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import NavigationShortcuts from '../../components/navigation/NavigationShortcuts';
import NavigationSearch from '../../components/navigation/NavigationSearch';
import QuickPanelToggleButton from '../../components/quickPanel/QuickPanelToggleButton';

type ToolbarLayout1Props = {
	className?: string;
};

/**
 * The toolbar layout 1.
 */
function ToolbarLayout1(props: ToolbarLayout1Props) {
	const { className } = props;
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const navbar = useAppSelector(selectFuseNavbar);
	const toolbarTheme = useAppSelector(selectToolbarTheme);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx('relative z-20 flex border-b', className)}
				color="default"
				sx={(theme) => ({
					backgroundColor: 'var(--default-background-toolbarTheme-palette)',
					...theme.applyStyles('light', {
						backgroundColor: 'var(--paper-background-toolbarTheme-palette)'
					})
				})}
				position="static"
				elevation={0}
				style={{
					'--paper-background-toolbarTheme-palette': toolbarTheme.palette.background.paper,
					'--default-background-toolbarTheme-palette': toolbarTheme.palette.background.default
				}}
			>
				<Toolbar className="min-h-48 p-0 md:min-h-64">
					<div className="flex flex-1 px-8 md:px-16 space-x-8 ">
						{config.navbar.display && config.navbar.position === 'left' && (
							<>
								<Hidden lgDown>
									{(config.navbar.style === 'style-3' || config.navbar.style === 'style-3-dense') && (
										<NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
									)}

									{config.navbar.style === 'style-1' && !navbar.open && (
										<NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
									)}
								</Hidden>

								<Hidden lgUp>
									<NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
								</Hidden>
							</>
						)}

						<Hidden lgDown>
							<NavigationShortcuts />
						</Hidden>
					</div>

					<div className="flex items-center overflow-x-auto px-8 md:px-16 space-x-6">
						<LanguageSwitcher />
						<AdjustFontSize />
						<FullScreenToggle />
						<LightDarkModeToggle
							lightTheme={_.find(themeOptions, { id: 'Default' })}
							darkTheme={_.find(themeOptions, { id: 'Default Dark' })}
						/>
						<NavigationSearch />
						<QuickPanelToggleButton />
						<NotificationPanelToggleButton />
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<>
							<Hidden lgDown>
								{(config.navbar.style === 'style-3' || config.navbar.style === 'style-3-dense') && (
									<NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
								)}

								{config.navbar.style === 'style-1' && !navbar.open && (
									<NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
								)}
							</Hidden>

							<Hidden lgUp>
								<NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
							</Hidden>
						</>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout1);
