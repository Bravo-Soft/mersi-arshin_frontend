import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import { red } from '@mui/material/colors';

const DeleteMenuItem = styled(MenuItem)(({ theme }) => ({
	':hover': {
		backgroundColor: red[50],
		color: red[700],
		'& .MuiSvgIcon-root': {
			color: red[700],
		},
	},
}));

export default DeleteMenuItem;
