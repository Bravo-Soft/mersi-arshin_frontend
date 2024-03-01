import { styled, svgIconClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
	position: 'relative',
	width: 35,
	height: 35,
	border: `2px solid ${theme.palette.primary.light}`,

	[`.${svgIconClasses.root}`]: {
		fill: theme.palette.primary.main,
	},
}));
