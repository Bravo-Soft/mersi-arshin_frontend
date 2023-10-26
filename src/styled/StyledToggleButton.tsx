import { alpha, styled } from '@mui/material/styles';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';
import ToggleButton from '@mui/material/ToggleButton';

interface StyledMenuItemProps extends ToggleButtonProps {
	moduleIsActive?: boolean;
}

const StyledToggleButton = styled(ToggleButton, {
	shouldForwardProp: prop => prop !== 'moduleIsActive',
})<StyledMenuItemProps>(({ theme, moduleIsActive }) => ({
	...(!moduleIsActive && {
		cursor: 'help',
		color: theme.palette.text.disabled,

		'& .MuiSvgIcon-root': {
			color: theme.palette.text.disabled,
		},

		':hover': {
			backgroundColor: alpha(theme.palette.warning.main, 0.1),
			color: theme.palette.warning.light,

			'& .MuiSvgIcon-root': {
				color: theme.palette.warning.light,
			},
		},
	}),
}));

export default StyledToggleButton;
