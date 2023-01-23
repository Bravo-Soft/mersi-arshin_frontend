import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import type { SpeedDialProps as MuiSpeedDialProps } from '@mui/material/SpeedDial';

import SpeedDial from '@mui/material/SpeedDial';

const StyledSpeedDial = styled(SpeedDial)<MuiSpeedDialProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.appBar + 2,
	'& .MuiSvgIcon-root': {
		color: theme.palette.action.active,
	},
	'& .MuiButtonBase-root': {
		boxShadow: 'none',
		border: `1px solid ${theme.palette.divider}`,
		backgroundColor: grey[100],
		borderRadius: `calc(${theme.shape.borderRadius}px * 3)`,

		':hover': {
			backgroundColor: theme.palette.grey[200],
		},

		':active': {
			boxShadow: 'none',
		},
	},
	'& .MuiSpeedDial-fab': {
		'& .MuiSvgIcon-root': {
			transition: theme.transitions.create('rotate', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeIn,
			}),
			...(open && {
				rotate: '45deg',
			}),
		},
	},
	'& .MuiSpeedDialAction-fab': {
		borderRadius: `calc(${theme.shape.borderRadius}px * 2)`,
	},
	'& .MuiSpeedDialAction-staticTooltipLabel': {
		boxShadow: 'none',
		border: `1px solid ${theme.palette.divider}`,
	},
}));

export default StyledSpeedDial;
