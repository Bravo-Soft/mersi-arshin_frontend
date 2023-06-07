import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

const StyledTagBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	gap: theme.spacing(3),
	padding: `0 ${theme.spacing(2)}`,
	'@media print': {
		display: 'block',
		width: '100%',
		gap: 0,
		padding: 0,
	},
}));

export default StyledTagBox;
