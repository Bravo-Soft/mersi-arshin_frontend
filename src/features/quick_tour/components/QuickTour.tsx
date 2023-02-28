import { useAppSelector } from 'hooks/redux';
import { selectActualStep } from './quickTourSlice';

// import { quickConfig } from '../confiig';

import Joyride from 'react-joyride';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour): JSX.Element {
	const actualStep = useAppSelector(selectActualStep);

	return (
		<>
			<Joyride
				run={actualStep === 5}
				steps={[
					{
						target: '#adding',
						title: 'top',
						placement: 'top',
						content: 'This is my awesome feature!',
					},
				]}
				continuous
			/>
			{children}
		</>
	);
}
export default QuickTour;
