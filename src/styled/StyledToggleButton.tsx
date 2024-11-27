import { alpha, styled } from '@mui/material/styles';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';
import ToggleButton from '@mui/material/ToggleButton';

interface StyledMenuItemProps extends ToggleButtonProps {
	moduleIsActive?: boolean;
}

const StyledToggleButton = styled(ToggleButton, {
	shouldForwardProp: prop => prop !== 'moduleIsActive',
})<StyledMenuItemProps>(({ theme, moduleIsActive = true }) => ({
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
	...(moduleIsActive && {
		'&.Mui-selected,&.Mui-selected:hover': {
			color: '#fff',
			backgroundColor: '#014e5ff7',
		},
	}),
}));

export default StyledToggleButton;
