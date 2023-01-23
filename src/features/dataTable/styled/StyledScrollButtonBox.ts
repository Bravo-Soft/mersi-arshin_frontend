import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

interface IScrollBtnProps {
	positionBtn: 'before' | 'after';
}

export const StyledScrollButtonBox = styled(Box, {
	shouldForwardProp: prop => prop !== 'positionBtn',
})<IScrollBtnProps>(({ theme, positionBtn }) => ({
	position: 'absolute',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	zIndex: theme.zIndex.appBar,

	...(positionBtn === 'after'
		? {
				left: '0px',
				'&::after': {
					width: 50,
					content: '""',
					height: '100%',
					background: `linear-gradient(to left, transparent, ${theme.palette.background.paper} 90%)`,
				},
		  }
		: {
				right: '0px',
				'&::before': {
					width: 50,
					content: '""',
					height: '100%',
					background: `linear-gradient(to right, transparent, ${theme.palette.background.paper} 90%)`,
				},
		  }),
}));
export default StyledScrollButtonBox;
