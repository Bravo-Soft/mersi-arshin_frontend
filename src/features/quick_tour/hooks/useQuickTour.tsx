import { useAppDispatch } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { startTourHandler, stepHandler } from '../components/quickTourSlice';
import { ACTIONS, EVENTS, STATUS } from 'react-joyride';

import type { CallBackProps } from 'react-joyride';

export const useQuickTour = () => {
	const dispatch = useAppDispatch();
	const { closeSidebar } = useSidebarAction('home');

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { action, index, status, type } = data;

		const ifValue = ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status);

		if (ifValue) {
			dispatch(startTourHandler(false));
			dispatch(stepHandler(0));
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
			const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
			if (action === ACTIONS.NEXT && index !== 11) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				setTimeout(() => {
					dispatch(startTourHandler(true));
					closeSidebar();
				}, 700);
			} else {
				closeSidebar();
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
			}
		}
	};
	return handleJoyrideCallback;
};
