import { useAppSelector } from 'src/store/hooks';
import { selectFuseCurrentSettings } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import clsx from 'clsx';
import NavbarToggleButton, {
	NavbarToggleButtonProps
} from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';

type NavbarPinToggleButtonProps = NavbarToggleButtonProps & {
	className?: string;
	children?: React.ReactNode;
};

/**
 * Navbar pin toggle button.
 */
function NavbarPinToggleButton(props: NavbarPinToggleButtonProps) {
	const { ...rest } = props;
	const settings: FuseSettingsConfigType = useAppSelector(selectFuseCurrentSettings);
	const { config } = settings.layout;
	const folded = config.navbar?.folded;

	return (
		<NavbarToggleButton
			{...rest}
			className={clsx('rounded', folded ? 'opacity-50' : 'opacity-100', rest.className)}
		/>
	);
}

export default NavbarPinToggleButton;
