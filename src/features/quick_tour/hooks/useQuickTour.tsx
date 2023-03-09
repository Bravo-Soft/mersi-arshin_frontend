/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import {
	selectActualStep,
	selectTestMenuActions,
	startTourHandler,
	stepHandler,
} from '../components/quickTourSlice';
import { ACTIONS, EVENTS, STATUS, LIFECYCLE } from 'react-joyride';

import type { CallBackProps } from 'react-joyride';

export const useQuickTour = () => {
	const dispatch = useAppDispatch();
	const { openSidebarWith, closeSidebar } = useSidebarAction('home');
	const { open } = useAppSelector(selectSidebarStateOfHomePage);

	const actualStep = useAppSelector(selectActualStep);
	const test = useAppSelector(selectTestMenuActions);
	const handleJoyrideCallback = (data: CallBackProps) => {
		const { action, index, status, type } = data;

		const ifValue = ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status);
		console.log('actualStep@@', actualStep);
		if (ifValue) {
			dispatch(startTourHandler(false));
			dispatch(stepHandler(0));
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
			const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (action === ACTIONS.NEXT && index !== 11) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				if (index === 0) {
					openSidebarWith('CreateDataItem');
				} else {
					closeSidebar();
				}
				setTimeout(() => {
					dispatch(startTourHandler(true));
				}, 700);
			} else {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
			}

			// if (open && index === 0) {
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 200);
			// } else if (index === 0 && ) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	openSidebarWith('CreateDataItem');
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 600);
			// } else if (index === 1 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	closeSidebar();

			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 600);
			// } else if (open && index === 1) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	closeSidebar();
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 400);
			// } else if (index === 2 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	closeSidebar();

			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 400);
			// } else if (index === 3 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 900);
			// } else if (index === 4 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 300);
			// } else if (index === 5 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 700);
			// } else if (index === 6) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 500);
			// } else if (index === 7 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 500);
			// } else if (index === 8 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 500);
			// } else if (index === 9 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 600);
			// } else if (index === 10 && action === ACTIONS.NEXT) {
			// 	dispatch(startTourHandler(false));
			// 	dispatch(stepHandler(nextStepIndex));
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 600);
			// } else if (index === 3) {
			// 	dispatch(startTourHandler(false));

			// 	console.log('y TYT');
			// 	setTimeout(() => {
			// 		dispatch(startTourHandler(true));
			// 	}, 500);
			// }
		}
	};
	const handleQuickTourStart = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(stepHandler(actualStep === 0 ? 1 : actualStep));
		dispatch(startTourHandler(true));
	};
	return { handleJoyrideCallback, handleQuickTourStart };
};
