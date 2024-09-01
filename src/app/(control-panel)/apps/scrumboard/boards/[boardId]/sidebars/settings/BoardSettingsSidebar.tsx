import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import _ from '@lodash';
import { useDebounce, useDeepCompareEffect } from '@fuse/hooks';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PartialDeep } from 'type-fest';
import ListItemButton from '@mui/material/ListItemButton';
import { useRouter } from 'next/navigation';
import {
	ScrumboardBoard,
	useDeleteScrumboardBoardMutation,
	useUpdateScrumboardBoardMutation
} from '../../../../ScrumboardApi';
import useGetScrumboardBoard from '../../../../hooks/useGetScrumboardBoard';

type BoardSettingsSidebarProps = {
	onSetSidebarOpen: (open: boolean) => void;
};

/**
 * The board settings sidebar component.
 */
function BoardSettingsSidebar(props: BoardSettingsSidebarProps) {
	const { onSetSidebarOpen } = props;
	const router = useRouter();
	const { data: board } = useGetScrumboardBoard();
	const [updateBoard] = useUpdateScrumboardBoardMutation();
	const [deleteBoard] = useDeleteScrumboardBoardMutation();

	const { watch, control, reset } = useForm({
		mode: 'onChange',
		defaultValues: board?.settings
	});

	const boardSettingsForm = watch();

	const updateBoardData = useDebounce((data: PartialDeep<ScrumboardBoard>) => {
		updateBoard({ id: board?.id, ...data });
	}, 600);

	useDeepCompareEffect(() => {
		if (_.isEmpty(boardSettingsForm) || !board?.settings) {
			return;
		}

		if (!_.isEqual(board.settings, boardSettingsForm)) {
			updateBoardData({ settings: boardSettingsForm });
		}
	}, [board, boardSettingsForm, updateBoardData]);

	useEffect(() => {
		if (!board) {
			return;
		}

		reset(board.settings);
	}, [board, reset]);

	if (_.isEmpty(boardSettingsForm)) {
		return null;
	}

	return (
		<div>
			<Box
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? lighten(theme.palette.background.default, 0.4)
							: lighten(theme.palette.background.default, 0.02)
				}}
				className="border-b-1"
			>
				<Toolbar className="flex items-center px-4">
					<IconButton
						onClick={() => onSetSidebarOpen(false)}
						color="inherit"
						size="large"
					>
						<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
					</IconButton>
					<Typography
						className="px-4 font-medium text-15"
						color="inherit"
						variant="subtitle1"
					>
						Settings
					</Typography>
				</Toolbar>
			</Box>

			<List className="py-24">
				<ListItem>
					<ListItemIcon className="min-w-36">
						<FuseSvgIcon>heroicons-outline:photo</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Card Cover Images" />
					<ListItemSecondaryAction>
						<Controller
							name="cardCoverImages"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Switch
									onChange={(ev) => {
										onChange(ev.target.checked);
									}}
									checked={value}
								/>
							)}
						/>
					</ListItemSecondaryAction>
				</ListItem>

				<Controller
					name="subscribed"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ListItem>
							<ListItemIcon className="min-w-36">
								<FuseSvgIcon>
									{value ? 'heroicons-outline:eye' : 'heroicons-outline:eye-slash'}
								</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Subscribe" />
							<ListItemSecondaryAction>
								<Switch
									onChange={(ev) => {
										onChange(ev.target.checked);
									}}
									checked={value}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				/>

				<ListItemButton
					onClick={() => {
						deleteBoard(board?.id)
							.unwrap()
							.then(() => {
								router.push(`/apps/scrumboard/boards`);
							});
					}}
				>
					<ListItemIcon className="min-w-36">
						<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Delete Board" />
				</ListItemButton>
			</List>
		</div>
	);
}

export default BoardSettingsSidebar;
