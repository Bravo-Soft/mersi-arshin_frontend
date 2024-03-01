import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { StyledCircleAnimation } from './StyledCircleAnimation';

function PulseButton() {
	return (
		<>
			<FiberManualRecordIcon color='primary' sx={{ position: 'relative', zIndex: 100 }} />
			{[1, 2, 3].map(e => (
				<StyledCircleAnimation key={e} delay={e} />
			))}
		</>
	);
}

export default PulseButton;
