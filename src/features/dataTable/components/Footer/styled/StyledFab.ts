import { styled } from '@mui/material/styles';

import Fab from '@mui/material/Fab';

const StyledFab = styled(Fab)(({ theme }) => ({
	boxShadow: 'none',
	border: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.grey[100],
	borderRadius: `calc(${theme.shape.borderRadius}px * 3)`,

	':hover': {
		backgroundColor: theme.palette.grey[200],
	},

	':active': {
		boxShadow: 'none',
	},

	'& .MuiSvgIcon-root': {
		color: theme.palette.action.active,
	},
}));

export default StyledFab;
