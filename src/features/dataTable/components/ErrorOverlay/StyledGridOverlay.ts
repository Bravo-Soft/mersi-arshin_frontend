import { styled } from '@mui/material/styles';

const StyledGridOverlay = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	backgroundColor: theme.palette.grey[50],

	'& .MuiSvgIcon-root': {
		color: '#dce0e6',
		fontSize: 80,
	},
}));

export default StyledGridOverlay;
