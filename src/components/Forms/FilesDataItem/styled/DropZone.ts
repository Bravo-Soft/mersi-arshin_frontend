import { styled } from '@mui/material/styles';

import { generateBootstrapShadow } from 'utils/generateBootstapShadow';
import { hideScrollbar } from 'utils/hideScrollbar';

interface IDropZoneProps {
	isReject: boolean;
	isRejectedShadow: boolean;
}

const properties: PropertyKey[] = ['isReject', 'isRejectedShadow'];

const DropZone = styled('div', {
	shouldForwardProp: prop => !properties.includes(prop),
})<IDropZoneProps>(({ theme, isReject, isRejectedShadow }) => ({
	height: 220,
	display: 'flex',
	overflowY: 'scroll',
	justifyContent: 'center',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.grey[50],
	border: `1px solid ${theme.palette.divider}`,
	transition: theme.transitions.create(['box-shadow', 'border-color', 'background-color']),

	...((isReject || isRejectedShadow) && {
		boxShadow: generateBootstrapShadow(theme, 'error', 0.4),
	}),

	...hideScrollbar(),
}));

export default DropZone;
