import Box from '@mui/material/Box';

import { eighthStepContent } from 'features/quickTour/configStepsDesc';
import StyledTourDescription from 'features/quickTour/styled/StyledTourDescription';
import StyledTourTitle from 'features/quickTour/styled/StyledTourTitle';

function EighthStep() {
	return (
		<>
			{eighthStepContent.map(({ title, content }) => (
				<Box marginBottom={1} key={title}>
					<StyledTourTitle>{title}</StyledTourTitle>
					<span>&#32;&#8212;&#32;</span>
					<StyledTourDescription>{content}</StyledTourDescription>
				</Box>
			))}
		</>
	);
}

export default EighthStep;
