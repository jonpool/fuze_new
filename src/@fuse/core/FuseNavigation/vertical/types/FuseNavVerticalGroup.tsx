import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useMemo } from 'react';
import { ListItemButton, ListItemButtonProps, ListItemText } from '@mui/material';
import { FuseNavComponentProps } from '@fuse/core/FuseNavigation';
import FuseNavItem from '../../FuseNavItem';

type Props = ListItemButtonProps & {
	itempadding: number;
};

const Root = styled(ListItemButton)<Props>(({ theme, ...props }) => ({
	minminHeight: 44,
	width: '100%',
	borderRadius: '6px',
	margin: '28px 0 0 0',
	paddingRight: 16,
	paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
	paddingTop: 10,
	paddingBottom: 10,
	color: alpha(theme.palette.text.primary, 0.7),
	fontWeight: 600,
	letterSpacing: '0.025em'
}));

function FuseNavVerticalGroup(props: FuseNavComponentProps) {
	const { item, nestedLevel, onItemClick } = props;

	const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button'
		};
	}

	return useMemo(
		() => (
			<>
				<Root
					component={component}
					itempadding={itempadding}
					className={clsx('fuse-list-subheader flex items-center  py-10', !item.url && 'cursor-default')}
					onClick={() => onItemClick && onItemClick(item)}
					sx={item.sx}
					{...itemProps}
				>
					<ListItemText
						className="fuse-list-subheader-text"
						sx={{
							margin: 0,
							'& > .MuiListItemText-primary': {
								fontSize: 12,
								color: 'secondary.light',
								fontWeight: 600,
								textTransform: 'uppercase',
								letterSpacing: '.05em',
								lineHeight: '20px'
							},

							'& > .MuiListItemText-secondary': {
								fontSize: 11,
								color: 'text.disabled',
								letterSpacing: '.06px',
								fontWeight: 500,
								lineHeight: '1.5'
							}
						}}
						primary={item.title}
						secondary={item.subtitle}
					/>
				</Root>
				{item.children && (
					<>
						{item.children.map((_item) => (
							<FuseNavItem
								key={_item.id}
								type={`vertical-${_item.type}`}
								item={_item}
								nestedLevel={nestedLevel}
								onItemClick={onItemClick}
							/>
						))}
					</>
				)}
			</>
		),
		[item, itempadding, nestedLevel, onItemClick]
	);
}

const NavVerticalGroup = FuseNavVerticalGroup;

export default NavVerticalGroup;
