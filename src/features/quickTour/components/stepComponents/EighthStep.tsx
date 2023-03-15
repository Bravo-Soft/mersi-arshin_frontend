import { eighthStepContent } from 'features/quickTour/configStepsDesc';

import Box from '@mui/material/Box';
import StyledTourTitle from 'features/quickTour/styled/StyledTourTitle';
import StyledTourDescription from 'features/quickTour/styled/StyledTourDescription';

function EighthStep() {
	return (
		<>
			{eighthStepContent.map(({ title, content }) => (
				<Box marginBottom={1} key={title}>
					<StyledTourDescription>Кнопка</StyledTourDescription>
					<span>&#32;</span>
					<StyledTourTitle>"{title}"</StyledTourTitle>
					<span>&#32;&#8212;&#32;</span>
					<StyledTourDescription>{content}</StyledTourDescription>
				</Box>
			))}
		</>
	);
}

export default EighthStep;