import FuseScrollbars from '@fuse/core/FuseScrollbars';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import FuseThemeSelector from '@fuse/core/FuseThemeSelector/FuseThemeSelector';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { SwipeableHandlers } from 'react-swipeable';
import themeOptions from 'src/configs/themeOptions';
import { FuseThemeOption } from '@fuse/core/FuseThemeSelector/ThemePreview';
import useUser from '@auth/useUser';
import useFuseSettings from '@fuse/core/FuseSettings/hooks/useFuseSettings';

import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { useAppDispatch } from '@/store/hooks';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

type TransitionProps = {
	children?: React.ReactElement;
};

const Transition = forwardRef((props: TransitionProps, ref) => {
	const { children, ...other } = props;

	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
});

type ThemesPanelProps = {
	schemesHandlers: SwipeableHandlers;
	onClose: () => void;
	open: boolean;
};

function ThemesPanel(props: ThemesPanelProps) {
	const { schemesHandlers, onClose, open } = props;
	const { setSettings } = useFuseSettings();
	const { isGuest, updateUserSettings } = useUser();
	const dispatch = useAppDispatch();

	async function handleThemeSelect(_theme: FuseThemeOption) {
		const _newSettings = setSettings({ theme: { ..._theme?.section } } as Partial<FuseSettingsConfigType>);

		if (!isGuest) {
			const updatedUserData = await updateUserSettings(_newSettings);

			if (updatedUserData) {
				dispatch(showMessage({ message: 'User settings saved.' }));
			}
		}
	}

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="schemes-panel"
			aria-describedby="schemes"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...schemesHandlers}
		>
			<FuseScrollbars className="p-16 sm:p-24">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
				</IconButton>

				<Typography
					className="mb-32"
					variant="h6"
				>
					Theme Color Options
				</Typography>

				<Typography
					className="mb-24 text-justify text-md italic"
					color="text.secondary"
				>
					* Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also
					create your own theme options and color schemes.
				</Typography>

				<FuseThemeSelector
					options={themeOptions}
					onSelect={handleThemeSelect}
				/>
			</FuseScrollbars>
		</StyledDialog>
	);
}

export default ThemesPanel;
