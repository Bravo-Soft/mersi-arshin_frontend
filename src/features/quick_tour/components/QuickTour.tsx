/* eslint-disable @typescript-eslint/no-unused-vars */
import { quickConfig } from '../config';
import { useQuickTour } from '../hooks/useQuickTour';
import { useAppSelector } from 'hooks/redux';
import { selectActualStartTour, selectActualStep } from './quickTourSlice';

import Joyride from 'react-joyride';
import TooltipDialog from './ToolTipDialog';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour) {
	const actualStep = useAppSelector(selectActualStep);
	const run = useAppSelector(selectActualStartTour);
	const handleJoyrideCallback = useQuickTour();

	return (
		<>
			<Joyride
				tooltipComponent={TooltipDialog}
				callback={handleJoyrideCallback}
				continuous
				disableOverlayClose
				hideBackButton
				stepIndex={actualStep}
				run={run}
				debug
				styles={{
					options: {
						zIndex: 10000000000,
					},
				}}
				steps={quickConfig}
			/>
			{children}
		</>
	);
}
export default QuickTour;
