import { red } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const DeleteMenuItem = styled(MenuItem)({
	':hover': {
		backgroundColor: red[50],
		color: red[700],
		'& .MuiSvgIcon-root': {
			color: red[700],
		},
	},
});

export default DeleteMenuItem;
