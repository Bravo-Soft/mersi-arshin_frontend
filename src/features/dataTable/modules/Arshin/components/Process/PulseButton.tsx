import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';

const sx = {
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
	backgroundColor: 'primary.main',
	borderRadius: '50%',
	height: '100%',
	opacity: 0,
	position: 'absolute',
	width: ' 100%',
};

const circle1 = {
	animationDelay: '1s',
};
const circle2 = {
	animationDelay: '2s',
};
const circle3 = {
	animationDelay: '3s',
};

function PulseButton() {
	return (
		<>
			<FiberManualRecordIcon color='primary' sx={{ position: 'relative', zIndex: 100 }} />
			<Box sx={{ ...circle1, ...sx }} />
			<Box sx={{ ...circle2, ...sx }} />
			<Box sx={{ ...circle3, ...sx }} />
		</>
	);
}

export default PulseButton;
