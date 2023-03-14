import { fourStepContent } from '../../configStepsDesc';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledTourDescription from '../../styled/StyledTourDescription';

function FourthStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				При нажатии на стрелку в левом верхнем углу, откроется меню “Быстрой подборки”:
			</StyledTourDescription>

			{fourStepContent.map(({ title, content }) => (
				<Box marginBottom={1}>
					<Typography component='span' sx={{ fontWeight: 600, fontSize: 14 }}>
						"{title}"
					</Typography>
					<span>&#32;&#8212;&#32;</span>
					{content && <StyledTourDescription>{content}</StyledTourDescription>}
				</Box>
			))}
		</>
	);
}

export default FourthStep;
