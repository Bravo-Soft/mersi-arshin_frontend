import { useAppSelector } from 'hooks/redux';
import { selectActualStartTour, selectActualStep } from './quickTourSlice';

import TooltipDialog from './ToolTipDialog';
import { quickConfig } from '../config';
import Joyride from 'react-joyride';
import { useQuickTour } from '../hooks/useQuickTour';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour) {
	const actualStep = useAppSelector(selectActualStep);
	const run = useAppSelector(selectActualStartTour);
	const { handleJoyrideCallback } = useQuickTour();
	// setRun(false);
	// dispatch(stepHandler(0));
	// closeSidebar();

	return (
		<>
			<Joyride
				tooltipComponent={TooltipDialog}
				callback={handleJoyrideCallback}
				scrollToFirstStep={true}
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
