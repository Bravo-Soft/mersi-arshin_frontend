/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectActualStartTour, selectActualStep, startTourHandler } from './quickTourSlice';

import TooltipDialog from './ToolTipDialog';
import { quickConfig } from '../config';
import Joyride from 'react-joyride';
import { useQuickTour } from '../hooks/useQuickTour';
import { useEffect } from 'react';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour) {
	const dispatch = useAppDispatch();
	const actualStep = useAppSelector(selectActualStep);
	const run = useAppSelector(selectActualStartTour);
	const { handleJoyrideCallback } = useQuickTour();

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(startTourHandler(true));
	// 	}, 2000);
	// }, [dispatch]);

	return (
		<>
			<Joyride
				tooltipComponent={TooltipDialog}
				callback={handleJoyrideCallback}
				// scrollToFirstStep
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
