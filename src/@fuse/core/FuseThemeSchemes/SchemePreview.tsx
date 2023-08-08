import { Theme } from '@mui/material/styles/createTheme';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { FuseThemeType } from '@fuse/core/FuseSettings/FuseSettings';

type Props = {
	id: string;
	className?: string;
	onSelect: (T: FuseThemeType) => void;
	theme: FuseThemeType;
};

function SchemePreview(props: Props) {
	const { theme, className, id, onSelect = () => {} } = props;

	const _theme = useTheme();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const primaryColor: string = theme.palette.primary[500] ? theme.palette.primary[500] : theme.palette.primary.main;
	const primaryColorContrast = theme.palette.primary.contrastText || _theme.palette.getContrastText(primaryColor);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const secondaryColor: string = theme.palette.secondary[500]
		? theme.palette.secondary[500]
		: theme.palette.secondary.main;
	const secondaryColorContrast =
		theme.palette.secondary.contrastText || _theme.palette.getContrastText(secondaryColor);
	const backgroundColor = theme.palette.background.default;
	const backgroundColorContrast = _theme.palette.getContrastText(theme.palette.background.default);
	const paperColor = theme.palette.background.paper;
	const paperColorContrast = _theme.palette.getContrastText(theme.palette.background.paper);

	return (
		<div className={clsx(className, 'mb-8')}>
			<button
				className={clsx(
					'w-full text-left rounded-6 relative font-500 shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden'
				)}
				style={{
					backgroundColor,
					color: backgroundColorContrast
				}}
				onClick={() => onSelect(theme)}
				type="button"
			>
				<div
					className="w-full h-56 px-8 pt-8 relative"
					style={{
						backgroundColor: primaryColor,
						color: primaryColorContrast
					}}
				>
					<span className="text-12 opacity-75">Header (Primary)</span>

					<div
						className="flex items-center justify-center w-20 h-20 rounded-full absolute bottom-0 right-0 -mb-10 shadow text-10 mr-4"
						style={{
							backgroundColor: secondaryColor,
							color: secondaryColorContrast
						}}
					>
						<span className="opacity-75">S</span>
					</div>
				</div>
				<div className="pl-8 pr-28 -mt-24 w-full">
					<div
						className="w-full h-96 rounded-4 relative shadow p-8"
						style={{
							backgroundColor: paperColor,
							color: paperColorContrast
						}}
					>
						<span className="text-12 opacity-75">Paper</span>
					</div>
				</div>

				<div className="px-8 py-8 w-full">
					<span className="text-12 opacity-75">Background</span>
				</div>
			</button>
			<Typography className="font-semibold w-full text-center mt-12">{id}</Typography>
		</div>
	);
}

export default SchemePreview;
