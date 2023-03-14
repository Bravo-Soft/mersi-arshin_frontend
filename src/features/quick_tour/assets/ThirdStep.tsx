import { thirdStepContent } from '../configStepsDesc';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledTourDescription from '../styled/StyledTourDescription';

function ThirdStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				При нажатии правой кнопки мыши, на выбранном СИ открывается меню возможностей:
			</StyledTourDescription>

			{thirdStepContent.map(({ title, content }) => {
				return (
					<Box marginBottom={1}>
						<Typography component='span' sx={{ fontWeight: 600, fontSize: 14 }}>
							"{title}"
						</Typography>
						<span>&#32;&#8212;&#32;</span>
						{content}
						<StyledTourDescription>{content}</StyledTourDescription>
					</Box>
				);
			})}
		</>
	);
}

export default ThirdStep;
