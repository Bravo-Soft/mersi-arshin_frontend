import { styled } from '@mui/material/styles';
import { GridToolbarQuickFilter } from '@mui/x-data-grid-pro';

import { generateBootstrapShadow } from 'utils/generateBootstapShadow';

const StyledGridToolbarQuickFilter = styled(GridToolbarQuickFilter)(({ theme }) => ({
	minWidth: 350,
	maxWidth: 350,
	flexGrow: 1,
	paddingRight: 3,

	'& .MuiOutlinedInput-root': {
		backgroundColor: theme.palette.grey[100],
		borderRadius: typeof theme.shape.borderRadius === 'number' && theme.shape.borderRadius * 2.5,

		'& .MuiSvgIcon-root': {
			fill: theme.palette.text.disabled,
		},

		'& fieldset': {
			borderColor: theme.palette.divider,
			transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow']),
		},

		'&:hover fieldset': {
			borderColor: theme.palette.divider,
			backgroundColor: theme.palette.action.hover,
		},

		'&.Mui-focused fieldset': {
			borderColor: theme.palette.primary.main,
			borderWidth: 1,
			boxShadow: generateBootstrapShadow(theme, 'primary', 0.5),
		},
	},
}));

export default StyledGridToolbarQuickFilter;
