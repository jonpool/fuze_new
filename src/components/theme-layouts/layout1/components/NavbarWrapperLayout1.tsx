import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { selectFuseCurrentLayoutConfig, selectNavbarTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { Layout1ConfigDefaultsType } from 'src/components/theme-layouts/layout1/Layout1Config';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { navbarCloseMobile, selectFuseNavbar } from 'src/components/theme-layouts/components/navbar/navbarSlice';
import { usePathname } from 'next/navigation';
import NavbarToggleFabLayout1 from './NavbarToggleFabLayout1';
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';
import NavbarStyle2 from './navbar/style-2/NavbarStyle2';
import NavbarStyle3 from './navbar/style-3/NavbarStyle3';

/**
 * The navbar wrapper layout 1.
 */
function NavbarWrapperLayout1() {
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const navbar = useAppSelector(selectFuseNavbar);
	const pathname = usePathname();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}, [pathname, isMobile]);

	const navbarTheme = useAppSelector(selectNavbarTheme);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<>
					{config.navbar.style === 'style-1' && <NavbarStyle1 />}
					{config.navbar.style === 'style-2' && <NavbarStyle2 />}
					{config.navbar.style === 'style-3' && <NavbarStyle3 />}
					{config.navbar.style === 'style-3-dense' && <NavbarStyle3 dense />}
				</>
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFabLayout1 />}
		</>
	);
}

export default NavbarWrapperLayout1;
