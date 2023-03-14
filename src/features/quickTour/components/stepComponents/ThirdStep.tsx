import { thirdStepContent } from 'features/quickTour/configStepsDesc';

import StyledTourDescription from 'features/quickTour/styled/StyledTourDescription';
import StyledTourTitle from 'features/quickTour/styled/StyledTourTitle';

function ThirdStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				При нажатии правой кнопки мыши, на выбранном СИ открывается меню возможностей:
			</StyledTourDescription>

			{thirdStepContent.map(({ title, content }) => {
				return (
					<StyledTourDescription marginBottom={1} key={title}>
						<StyledTourTitle>"{title}"</StyledTourTitle>
						<span>&#32;&#8212;&#32;</span>
						{content}
						<StyledTourDescription>{content}</StyledTourDescription>
					</StyledTourDescription>
				);
			})}
		</>
	);
}

export default ThirdStep;
