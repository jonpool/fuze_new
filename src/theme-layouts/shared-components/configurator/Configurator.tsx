'use client';

import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { memo, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { usePrevious } from '@fuse/hooks';
import _ from '@lodash';
import SettingsPanel from 'src/theme-layouts/shared-components/configurator/SettingsPanel';
import ThemesPanel from 'src/theme-layouts/shared-components/configurator/ThemesPanel';
import { useAppSelector } from 'src/store/hooks';
import { User } from 'src/auth/user';
import { selectUserSettings } from 'src/auth/user/store/userSlice';
import useAuth from 'src/auth/useAuth';

const Root = styled('div')(({ theme }) => ({
	position: 'absolute',
	height: 80,
	right: 0,
	top: 160,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
	padding: 0,
	borderTopLeftRadius: 6,
	borderBottomLeftRadius: 6,
	borderBottomRightRadius: 0,
	borderTopRightRadius: 0,
	zIndex: 999,
	color: theme.palette.getContrastText(red[500]),
	backgroundColor: red[400],
	'&:hover': {
		backgroundColor: red[500]
	},

	'& .settingsButton': {
		'& > span': {
			animation: 'rotating 3s linear infinite'
		}
	},

	'@keyframes rotating': {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(360deg)'
		}
	}
}));

/**
 * The settings panel.
 */
function Configurator() {
	const theme = useTheme();
	const [open, setOpen] = useState('');
	const { updateUser, authState } = useAuth();
	const { isAuthenticated, user } = authState;
	const userSettings = useAppSelector(selectUserSettings);
	const prevUserSettings = usePrevious(userSettings);

	useEffect(() => {
		if (isAuthenticated && prevUserSettings && !_.isEqual(userSettings, prevUserSettings)) {
			updateUser(_.setIn(user, 'data.settings', userSettings) as User);
		}
	}, [isAuthenticated, userSettings]);

	const handlerOptions = {
		onSwipedLeft: () => Boolean(open) && theme.direction === 'rtl' && handleClose(),
		onSwipedRight: () => Boolean(open) && theme.direction === 'ltr' && handleClose()
	};

	const settingsHandlers = useSwipeable(handlerOptions);
	const schemesHandlers = useSwipeable(handlerOptions);

	const handleOpen = (panelId: string) => {
		setOpen(panelId);
	};

	const handleClose = () => {
		setOpen('');
	};

	return (
		<>
			<Root
				id="fuse-settings-panel"
				className="buttonWrapper"
			>
				<Button
					className="settingsButton m-0 h-36 w-36 min-w-36"
					onClick={() => handleOpen('settings')}
					variant="text"
					color="inherit"
					disableRipple
					disableFocusRipple
				>
					<span>
						<FuseSvgIcon size={20}>heroicons-solid:cog-6-tooth</FuseSvgIcon>
					</span>
				</Button>

				<Button
					className="m-0 h-36 w-36 min-w-36"
					onClick={() => handleOpen('schemes')}
					variant="text"
					color="inherit"
					disableRipple
				>
					<FuseSvgIcon size={20}>heroicons-outline:swatch</FuseSvgIcon>
				</Button>
			</Root>

			<SettingsPanel
				open={Boolean(open === 'settings')}
				onClose={handleClose}
				settingsHandlers={settingsHandlers}
			/>

			<ThemesPanel
				schemesHandlers={schemesHandlers}
				onClose={handleClose}
				open={Boolean(open === 'schemes')}
			/>
		</>
	);
}

export default memo(Configurator);
