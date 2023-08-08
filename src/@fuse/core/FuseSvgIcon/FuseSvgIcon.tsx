import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/system';
import Icon from '@mui/material/Icon';
import clsx from 'clsx';
import { forwardRef } from 'react';

type FuseSvgIconProps = BoxProps & {
	fill?: string;
	xmlns?: string;
	viewBox?: string;
	size?: number | string;
	color?: 'inherit' | 'disabled' | 'primary' | 'secondary' | 'action' | 'error' | 'info' | 'success' | 'warning';
};

const Root = styled(Box)<FuseSvgIconProps>(({ theme, size = 24, color = 'inherit' }) => ({
	width: size,
	height: size,
	minWidth: size,
	minHeight: size,
	fontSize: size,
	lineHeight: size,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	color: {
		// Use fill instead of color for SVGs
		primary: theme.palette.primary.main,
		secondary: theme.palette.secondary.main,
		info: theme.palette.info.main,
		success: theme.palette.success.main,
		warning: theme.palette.warning.main,
		action: theme.palette.action.active,
		error: theme.palette.error.main,
		disabled: theme.palette.action.disabled,
		inherit: 'currentColor'
	}[color]
}));

const FuseSvgIcon = forwardRef<SVGSVGElement, FuseSvgIconProps>((props, ref) => {
	const { children, className = '', color } = props; // Destructure fill from props

	if (typeof children !== 'string') {
		return null;
	}

	if (!children.includes(':')) {
		return (
			<Box
				component={Icon}
				ref={ref}
				{...props}
			/>
		);
	}

	const iconPath = children.replace(':', '.svg#');

	return (
		<Root
			{...props}
			component="svg"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			className={clsx('shrink-0 fill-current', className)}
			ref={ref}
			color={color}
		>
			<use xlinkHref={`assets/icons/${iconPath}`} />
		</Root>
	);
});

FuseSvgIcon.defaultProps = {
	size: 24,
	color: 'inherit'
};

export default FuseSvgIcon;
