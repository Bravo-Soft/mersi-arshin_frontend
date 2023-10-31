import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface StyledIconButtonProps extends IconButtonProps {
	moduleIsActive?: boolean;
}

const StyledLayoutNotificationBtn = styled(IconButton, {
	shouldForwardProp: prop => prop !== 'moduleIsActive',
})<StyledIconButtonProps>(({ theme, moduleIsActive }) => ({
	...(!moduleIsActive && {
		cursor: 'help',
		color: theme.palette.text.disabled,

		// '& .MuiSvgIcon-root': {
		// 	color: theme.palette.grey[700],
		// },

		':hover': {
			color: theme.palette.warning.light,

			// '& .MuiSvgIcon-root': {
			// 	color: theme.palette.grey[500],
			// },
		},
	}),
}));

export default StyledLayoutNotificationBtn;
