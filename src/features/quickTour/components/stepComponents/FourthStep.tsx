import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { fourStepContent } from 'features/quickTour/configStepsDesc';
import StyledTourDescription from 'features/quickTour/styled/StyledTourDescription';

function FourthStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				При нажатии на стрелку в левом верхнем углу откроется меню «Быстрой подборки»:
			</StyledTourDescription>

			{fourStepContent.map(({ title, content }) => (
				<Box marginBottom={1} key={title}>
					<Typography component='span' sx={{ fontWeight: 600, fontSize: 14 }}>
						{title}
					</Typography>
					<span>&#32;&#8212;&#32;</span>
					{content && <StyledTourDescription>{content}</StyledTourDescription>}
				</Box>
			))}
		</>
	);
}

export default FourthStep;
