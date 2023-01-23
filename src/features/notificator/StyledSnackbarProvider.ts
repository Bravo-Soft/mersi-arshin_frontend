import { blue, green, orange, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

export const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
	'&.SnackbarItem-contentRoot': {
		boxShadow: 'none',
		borderRadius: theme.shape.borderRadius,
		fontWeight: 500,
	},

	'&.SnackbarItem-variantInfo': {
		backgroundColor: blue[50],
		color: blue[700],
		border: `1px solid ${blue[200]}`,
	},

	'&.SnackbarItem-variantSuccess': {
		backgroundColor: green[50],
		color: green[700],
		border: `1px solid ${green[200]}`,
	},

	'&.SnackbarItem-variantError': {
		backgroundColor: red[50],
		color: red[700],
		border: `1px solid ${red[200]}`,
	},

	'&.SnackbarItem-variantWarning': {
		backgroundColor: orange[50],
		color: orange[700],
		border: `1px solid ${orange[200]}`,
	},
}));
