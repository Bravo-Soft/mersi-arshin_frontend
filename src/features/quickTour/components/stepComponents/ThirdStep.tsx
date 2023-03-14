import { thirdStepContent } from '../../configStepsDesc';

import StyledTourDescription from '../../styled/StyledTourDescription';
import StyledTourTitle from '../../styled/StyledTourTitle';

function ThirdStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				При нажатии правой кнопки мыши, на выбранном СИ открывается меню возможностей:
			</StyledTourDescription>

			{thirdStepContent.map(({ title, content }) => {
				return (
					<StyledTourDescription marginBottom={1}>
						<StyledTourTitle>"{title}"</StyledTourTitle>
						<span>&#32;&#8212;&#32;</span>
						{content}
					</StyledTourDescription>
				);
			})}
		</>
	);
}

export default ThirdStep;
