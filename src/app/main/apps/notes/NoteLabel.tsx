import Chip from '@mui/material/Chip';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { darken } from '@mui/material/styles';
import { MouseEvent } from 'react';
import _ from '@lodash';
import { useGetNotesLabelsQuery } from './NotesApi';

type NoteLabelProps = {
	id: string;
	linkable?: boolean;
	onDelete?: () => void;
	className?: string;
	classes?: {
		root?: string;
		label?: string;
		deleteIcon?: string;
	};
};

/**
 * The note label.
 */
function NoteLabel(props: NoteLabelProps) {
	const { id, linkable, onDelete, className, classes } = props;
	const { data: labels } = useGetNotesLabelsQuery();

	if (!labels) {
		return null;
	}

	const label = _.find(labels, { id });

	if (!label) {
		return null;
	}

	const linkProps = linkable
		? {
				element: Link,
				onClick: (ev: MouseEvent) => {
					ev.stopPropagation();
				},
				to: `/apps/notes/labels/${label.id}`
			}
		: {};

	return (
		<Chip
			{...linkProps}
			label={label.title}
			classes={{
				root: clsx('h-24 border-0', className),
				label: 'px-12 py-4 text-11 font-medium leading-none',
				deleteIcon: 'w-16',
				...classes
			}}
			sx={{
				color: 'text.secondary',
				backgroundColor: (theme) => darken(theme.palette.background.default, 0.03)
			}}
			variant="outlined"
			onDelete={onDelete}
		/>
	);
}

export default NoteLabel;
