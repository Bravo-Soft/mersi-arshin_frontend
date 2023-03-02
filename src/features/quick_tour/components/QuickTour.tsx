import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectActualStartTour, selectActualStep, startTourHandler } from './quickTourSlice';

import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import type { CallBackProps } from 'react-joyride';
import { stepHandler } from './quickTourSlice';

import { Button } from '@mui/material';
import TooltipDialog from './ToolTipDialog';
import { quickConfig } from '../config';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useSidebarAction } from 'hooks/useSidebarActions';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour) {
	const dispatch = useAppDispatch();
	const actualStep = useAppSelector(selectActualStep);
	const { open } = useAppSelector(selectSidebarStateOfHomePage);
	const run = useAppSelector(selectActualStartTour);

	const { openSidebarWith, closeSidebar } = useSidebarAction('home');

	// setRun(false);
	// dispatch(stepHandler(0));
	// closeSidebar();

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { action, index, status, type } = data;
		if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
			dispatch(startTourHandler(false));
			dispatch(stepHandler(0));
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
			const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (open && index === 0) {
				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 200);
			} else if (index === 0 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				openSidebarWith('CreateDataItem');
				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 600);
			} else if (index === 1 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				closeSidebar();
				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 600);
			} else if (open && index === 1) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				closeSidebar();
				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 400);
			} else if (index === 2 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				closeSidebar();

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 400);
			} else if (index === 3 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 900);
			} else if (index === 4 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 300);
			} else if (index === 5 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 700);
			} else if (index === 6) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 500);
			} else if (index === 7 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 500);
			} else if (index === 8 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 500);
			} else if (index === 9 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 600);
			} else if (index === 10 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 600);
			} else if (index === 11 && action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));

				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 600);
			} else {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
			}
		}
	};

	const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(stepHandler(actualStep === 0 ? 1 : actualStep));
		dispatch(startTourHandler(true));
	};

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
