import { styled } from '@mui/material';
import Box from '@mui/material/Box';

type Props = {
	transition: number;
};

export const StyledCircleAnimation = styled(Box, {
	shouldForwardProp: prop => prop !== 'transition',
})<Props>(({ theme, transition }) => ({
	animationDelay: `${transition}s`,
	'@keyframes growAndFade ': {
		'0%': {
			opacity: '.25',
			transform: 'scale(0)',
		},
		'100%': {
			opacity: '0',
			transform: 'scale(1)',
		},
	},
	animation: 'growAndFade 3s infinite ease-out',
	backgroundColor: theme.palette.primary.main,
	borderRadius: '50%',
	height: '100%',
	opacity: 0,
	position: 'absolute',
	width: ' 100%',
}));
