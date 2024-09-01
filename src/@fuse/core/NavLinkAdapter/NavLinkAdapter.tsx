import { forwardRef, CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export type NavLinkAdapterPropsType = {
	activeClassName?: string;
	activeStyle?: CSSProperties;
	children?: ReactNode;
	href: string;
	className?: string;
	style?: CSSProperties;
	role?: string;
};

/**
 * The NavLinkAdapter component is a wrapper around the Next.js Link component.
 * It adds the ability to navigate programmatically using the useRouter hook.
 * The component is memoized to prevent unnecessary re-renders.
 */
const NavLinkAdapter = forwardRef<HTMLAnchorElement, NavLinkAdapterPropsType>((props, ref) => {
	const { activeClassName = 'active', activeStyle, role = 'button', href, ..._props } = props;
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push(href);
	};

	const isActive = pathname === href;

	return (
		<Link
			href={href}
			passHref
			legacyBehavior
		>
			<a
				ref={ref}
				role={role}
				onClick={handleClick}
				className={`${_props.className} ${isActive ? activeClassName : ''}`}
				style={isActive ? { ..._props.style, ...activeStyle } : _props.style}
			>
				{props.children}
			</a>
		</Link>
	);
});

export default NavLinkAdapter;
