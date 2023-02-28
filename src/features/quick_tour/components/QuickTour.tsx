import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectActualStep } from './quickTourSlice';

// import { quickConfig } from '../config';

import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import type { CallBackProps } from 'react-joyride';
import { useState } from 'react';
import { stepHandler } from './quickTourSlice';

import { Button } from '@mui/material';
import TooltipDialog from './ToolTipDialog';
import { quickConfig } from '../config';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour) {
	const dispatch = useAppDispatch();
	const actualStep = useAppSelector(selectActualStep);
	const [run, setRun] = useState(false);

	const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();

		setRun(true);
	};

	return (
		<>
			<Joyride
				tooltipComponent={TooltipDialog}
				// callback={handleJoyrideCallback}
				continuous
				disableOverlayClose
				hideBackButton
				// stepIndex={actualStep}
				run={run}
				debug
				styles={{
					options: {
						zIndex: 10000000,
					},
				}}
				steps={quickConfig}
			/>
			<Button
				onClick={handleClickStart}
				sx={{
					w: 200,
					bgcolor: 'red',
					height: 100,
					position: 'absolute',
					top: 0,
					zIndex: 1000000,
				}}
			>
				start
			</Button>
			{children}
		</>
	);
}
export default QuickTour;
