import { forwardRef, CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

export type NavLinkAdapterPropsType = {
	activeClassName?: string;
	activeStyle?: CSSProperties;
	children?: ReactNode;
	href: string;
	className?: string;
	style?: CSSProperties;
	role?: string;
	exact?: boolean;
};

/**
 * The NavLinkAdapter component is a wrapper around the Next.js Link component.
 * It adds the ability to navigate programmatically using the useRouter hook.
 * The component is memoized to prevent unnecessary re-renders.
 */
const NavLinkAdapter = forwardRef<HTMLAnchorElement, NavLinkAdapterPropsType>((props, ref) => {
	const { activeClassName = 'active', activeStyle, role = 'button', href, exact = false, ..._props } = props;
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push(href);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			router.push(href);
		}
	};

	const isActive = exact ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			href={href}
			passHref
			legacyBehavior
		>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/no-static-element-interactions */}
			<a
				ref={ref}
				role={role}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={clsx(
					_props.className,
					isActive ? activeClassName : '',
					pathname === href && 'pointer-events-none'
				)}
				style={isActive ? { ..._props.style, ...activeStyle } : _props.style}
			>
				{props.children}
			</a>
		</Link>
	);
});

export default NavLinkAdapter;
