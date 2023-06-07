import { styled } from '@mui/material/styles';
import { hideScrollbar } from 'utils/hideScrollbar';

import Box from '@mui/material/Box';

const StyledTagList = styled(Box)(({ theme }) => ({
	overflow: 'auto',
	height: '100%',
	padding: '10px 0',
	scrollbarWidth: 'none',
	...hideScrollbar(),
	'@media print': {
		display: 'block',
		clear: 'both',
		pageBreakAfter: 'auto',
		width: '100%',
		textAlign: 'left',
		overflow: 'hidden',
		boxSizing: 'border-box',
		padding: 0,
	},
}));

export default StyledTagList;
