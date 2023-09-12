import { alpha, iconButtonClasses } from '@mui/material';
import { blue, green, orange, red, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { MaterialDesignContent } from 'notistack';

export const StyledSnackbarProvider = styled(MaterialDesignContent)(({ theme }) => ({
	'&.notistack-MuiContent': {
		boxShadow: 'none',
		borderRadius: theme.shape.borderRadius,
		fontWeight: 500,
		svg: {
			color: theme.palette.common.white,
		},
		':hover': {
			[`& .${iconButtonClasses.root}`]: {
				backgroundColor: alpha(theme.palette.common.white, theme.palette.action.hoverOpacity),
			},
		},
	},

	'&.notistack-MuiContent-info': {
		backgroundColor: blue[50],
		color: blue[700],
		border: `1px solid ${blue[200]}`,
		svg: {
			color: blue[700],
		},
		':hover': {
			[`& .${iconButtonClasses.root}`]: {
				backgroundColor: alpha(blue[700], theme.palette.action.hoverOpacity),
			},
		},
	},

	'&.notistack-MuiContent-success': {
		backgroundColor: green[50],
		color: green[700],
		border: `1px solid ${green[200]}`,
		svg: {
			color: green[700],
		},
		':hover': {
			[`& .${iconButtonClasses.root}`]: {
				backgroundColor: alpha(green[700], theme.palette.action.hoverOpacity),
			},
		},
	},

	'&.notistack-MuiContent-error': {
		backgroundColor: red[50],
		color: red[700],
		border: `1px solid ${red[200]}`,
		svg: {
			color: red[700],
		},
		':hover': {
			[`& .${iconButtonClasses.root}`]: {
				backgroundColor: alpha(red[700], theme.palette.action.hoverOpacity),
			},
		},
	},

	'&.notistack-MuiContent-warning': {
		backgroundColor: orange[50],
		color: orange[700],
		border: `1px solid ${orange[200]}`,
	},
	svg: {
		color: orange[700],
	},
	':hover': {
		[`& .${iconButtonClasses.root}`]: {
			backgroundColor: alpha(orange[700], theme.palette.action.hoverOpacity),
		},
	},
}));
