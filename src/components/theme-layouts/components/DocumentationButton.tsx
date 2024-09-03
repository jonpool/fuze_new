import Button from '@mui/material/Button';
import Link from 'next/link';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type DocumentationButtonProps = {
	className?: string;
};

/**
 * The documentation button.
 */
function DocumentationButton(props: DocumentationButtonProps) {
	const { className = '' } = props;

	return (
		<Button
			component={Link}
			href="/documentation"
			role="button"
			className={className}
			variant="contained"
			color="primary"
			startIcon={<FuseSvgIcon size={16}>heroicons-outline:book-open</FuseSvgIcon>}
		>
			Documentation
		</Button>
	);
}

export default DocumentationButton;
