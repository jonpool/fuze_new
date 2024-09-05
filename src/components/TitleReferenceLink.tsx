'use client';

import { Box, Tooltip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type TitleReferenceLinkProps = {
	id: string;
	children?: React.ReactNode;
};

function TitleReferenceLink(props: TitleReferenceLinkProps) {
	const { children = '#', id = '' } = props;
	const pathname = usePathname();
	const href = `${window.location.origin}${pathname}#${id}`;
	const [open, setOpen] = useState(false);

	function handleCopy() {
		navigator.clipboard.writeText(href);
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 800);
	}

	return (
		<Tooltip
			title="Copied!"
			open={open}
			slotProps={{ popper: { placement: 'top' } }}
			arrow
		>
			<Box
				component={Link}
				id={id}
				href={href}
				className="opacity-30 italic"
				sx={{ color: 'inherit!important', textDecoration: 'none!important' }}
				onClick={handleCopy}
			>
				{children}
			</Box>
		</Tooltip>
	);
}

export default TitleReferenceLink;
