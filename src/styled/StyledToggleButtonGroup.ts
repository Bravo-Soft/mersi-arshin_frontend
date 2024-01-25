import { toggleButtonGroupClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	[`& .${toggleButtonGroupClasses.grouped}`]: {
		border: 0,
		margin: theme.spacing(0.5),
		'&.Mui-disabled': {
			border: 0,
		},
		'&:not(:first-of-type)': {
			borderRadius: theme.spacing(1),
		},
		'&:first-of-type': {
			borderRadius: theme.spacing(1),
		},
	},
}));

export default StyledToggleButtonGroup;
