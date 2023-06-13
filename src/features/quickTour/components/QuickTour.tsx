/* eslint-disable @typescript-eslint/no-unused-vars */
import Joyride from 'react-joyride';

import { quickConfig } from '../config';
import { useQuickTour } from '../hooks/useQuickTour';

import { selectActualStartTour, selectActualStep } from './quickTourSlice';
import TooltipDialog from './ToolTipDialog';

import { useAppSelector } from 'hooks/redux';

interface IQuickTour {
	children: JSX.Element;
}

//компонент тура

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
