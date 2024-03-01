import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { circleConfig } from './processConfig';
import { StyledCircleAnimation } from './StyledCircleAnimation';

function PulseButton() {
	return (
		<>
			<FiberManualRecordIcon color='primary' sx={{ position: 'relative', zIndex: 100 }} />
			{circleConfig.map(e => (
				<StyledCircleAnimation transition={e} />
			))}
		</>
	);
}

export default PulseButton;
