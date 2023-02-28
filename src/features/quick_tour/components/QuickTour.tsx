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
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useSidebarAction } from 'hooks/useSidebarActions';

interface IQuickTour {
	children: JSX.Element;
}

function QuickTour({ children }: IQuickTour) {
	const dispatch = useAppDispatch();
	const actualStep = useAppSelector(selectActualStep);
	const { open } = useAppSelector(selectSidebarStateOfHomePage);
	const [run, setRun] = useState(true);

	const { openSidebarWith, closeSidebar } = useSidebarAction('home');

	// dispatch(stepHandler(index + (action === ACTIONS.PREV ? -1 : 1)));

	// const handleJoyrideCallback = (data: CallBackProps) => {
	// 	const { action, index, status, type } = data;

	// 	if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
	// 		dispatch(stepHandler(index + (action === ACTIONS.PREV ? -1 : 1)));
	// 	} else if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
	// 		setRun(false);
	// 	}
	// };

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { action, index, status, type } = data;
		console.log('index', index);
		console.log('open', open);
		if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
			setRun(false);
			dispatch(stepHandler(0));
			closeSidebar();
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
			const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
			if (open && index === 0) {
				setTimeout(() => {
					setRun(true);
				}, 800);
			} else if (index === 1 && action === ACTIONS.NEXT) {
				setRun(false);
				openSidebarWith('CreateDataItem');
				console.log('next');
				setTimeout(() => {
					setRun(true);
				}, 800);
			} else if (open && action === ACTIONS.START) {
				setRun(false);
				dispatch(stepHandler(nextStepIndex));
				console.log('1');

				setTimeout(() => {
					setRun(true);
				}, 800);
			} else if (index === 2 && action === ACTIONS.PREV) {
				setRun(false);
				closeSidebar();
				dispatch(stepHandler(nextStepIndex));
				console.log('prev');
				setTimeout(() => {
					setRun(true);
				}, 800);
			} else {
				dispatch(stepHandler(nextStepIndex));
				closeSidebar();
			}
		}
	};

	const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(stepHandler(2));
		setRun(true);
	};

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
						zIndex: 10000000,
					},
				}}
				steps={[
					{
						target: '#adding',
						title: 'Добавление нового СИ',
						placement: 'top',
						disableBeacon: true,
						content:
							'При нажатии на «плюсик» в правом нижнем углу , у Вас откроется поле для создания новой карточки СИ.',
					},
					{
						target: '.MuiDrawer-paper',
						title: 'Заполнение карточки СИ',
						placement: 'left',
						disableBeacon: true,
						content:
							'Для заполнения и выбора полей в карточке, используете колесико «мышки». После заполнения всех необходимых полей, нажмите на кнопку "Сохранить" и карточка появится в общем списке',
					},
					{
						target: '#filter',
						title: 'top',
						placement: 'top',
						content: 'This is my awesome feature!',
						disableBeacon: true,
					},
				]}
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
