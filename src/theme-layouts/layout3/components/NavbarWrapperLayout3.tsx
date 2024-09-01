import Hidden from '@mui/material/Hidden';
import { styled, ThemeProvider } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectFuseCurrentLayoutConfig, selectNavbarTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { Layout3ConfigDefaultsType } from 'src/theme-layouts/layout3/Layout3Config';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import {
	navbarCloseMobile,
	navbarSlice,
	selectFuseNavbar
} from 'src/theme-layouts/shared-components/navbar/navbarSlice';
import NavbarToggleFab from 'src/theme-layouts/shared-components/navbar/NavbarToggleFab';
import withSlices from 'src/store/withSlices';
import { usePathname } from 'next/navigation';
import NavbarLayout3 from './NavbarLayout3';
import NavbarMobileLayout3 from './NavbarMobileLayout3';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
	'& > .MuiDrawer-paper': {
		height: '100%',
		flexDirection: 'column',
		flex: '1 1 auto',
		width: 280,
		minWidth: 280,
		transition: theme.transitions.create(['width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		})
	}
}));

type NavbarWrapperLayout3Props = {
	className?: string;
};

/**
 * The navbar wrapper layout 3.
 */
function NavbarWrapperLayout3(props: NavbarWrapperLayout3Props) {
	const { className = '' } = props;

	const dispatch = useAppDispatch();
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as Layout3ConfigDefaultsType;
	const navbarTheme = useAppSelector(selectNavbarTheme);
	const navbar = useAppSelector(selectFuseNavbar);
	const pathname = usePathname();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}, [pathname, isMobile]);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<Hidden lgDown>
					<NavbarLayout3 className={className} />
				</Hidden>

				<Hidden lgUp>
					<StyledSwipeableDrawer
						anchor="left"
						variant="temporary"
						open={navbar.mobileOpen}
						onClose={() => dispatch(navbarCloseMobile())}
						onOpen={() => {}}
						disableSwipeToOpen
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						<NavbarMobileLayout3 />
					</StyledSwipeableDrawer>
				</Hidden>
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && (
				<Hidden lgUp>
					<NavbarToggleFab />
				</Hidden>
			)}
		</>
	);
}

const NavbarWithSlices = withSlices<NavbarWrapperLayout3Props>([navbarSlice])(memo(NavbarWrapperLayout3));

export default NavbarWithSlices;