import { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import type { CallBackProps } from 'react-joyride';

import { menuStartTour, startTourHandler, stepHandler } from '../components/quickTourSlice';

import { useAppDispatch } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

/*

Хук переключения шагов тура :
	startTourHandler -  состояние старта тура
	stepHandle - активный шаг тура
	menuStartTour - старт тура из меню (ключ для контроля таймаутов)
*/
export const useQuickTour = () => {
	const dispatch = useAppDispatch();
	const { closeSidebar } = useSidebarAction('home');

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { action, index, status, type } = data;

		const ifValue = ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status);

		if (ifValue) {
			dispatch(startTourHandler(false));
			dispatch(stepHandler(0));
			dispatch(menuStartTour(false));
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
			const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
			if (action === ACTIONS.NEXT) {
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
				setTimeout(() => {
					dispatch(startTourHandler(true));
					closeSidebar();
				}, 700);
			} else {
				closeSidebar();
				dispatch(menuStartTour(false));
				dispatch(startTourHandler(false));
				dispatch(stepHandler(nextStepIndex));
			}
		}
	};
	return handleJoyrideCallback;
};
