import { alpha, styled } from '@mui/material/styles';

import type { MenuItemProps } from '@mui/material/MenuItem';

import MenuItem from '@mui/material/MenuItem';

interface StyledMenuItemProps extends MenuItemProps {
	moduleIsActive?: boolean;
}

const StyledMenuItem = styled(MenuItem, {
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

export default StyledMenuItem;
