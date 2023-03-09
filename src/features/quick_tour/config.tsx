import EighthStep from './assets/EighthStep';
import FifthStep from './assets/FifthStep';
import FirstStep from './assets/FirstStep';
import FourthStep from './assets/FourthStep';
import SecondStep from './assets/SecondStep';
import SeventhStep from './assets/SeventhStep';
import SixthStep from './assets/SixthStep';
import ThirdStep from './assets/ThirdStep';

import type { Step } from 'react-joyride';

export const quickConfig: Step[] = [
	{
		target: '#adding',
		title: 'Добавление нового СИ',
		placement: 'top',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		content: (
			<>
				<FirstStep />
			</>
		),
	},
	{
		target: '.MuiDrawer-paper',
		title: 'Заполнение карточки СИ',
		disableBeacon: true,
		placement: 'left',
		content: (
			<>
				<SecondStep />
			</>
		),
	},
	{
		target: '#context-menu',
		title: 'Работа с средством измерения',
		disableBeacon: true,
		placement: 'right',
		content: (
			<>
				<ThirdStep />
			</>
		),
	},
	{
		target: '#toolbar',
		title: 'Быстрые подборки',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<FourthStep />
			</>
		),
	},
	{
		target: '#column',
		title: 'Здесь мог быть ваш заголовок',
		disableBeacon: true,
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '#column-panel',
		title: 'Здесь мог быть ваш заголовок',
		disableBeacon: true,
		placement: 'right',
		content: (
			<>
				<FifthStep />
			</>
		),
	},
	{
		target: '#density',
		title: 'Здесь мог быть ваш заголовок',
		disableBeacon: true,
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '.MuiList-root ',
		title: 'Настройка размера строки',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<SixthStep />
			</>
		),
	},
	{
		target: '#filter',
		title: 'Здесь мог быть ваш заголовок',
		disableBeacon: true,
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},

	{
		target: '#filter-panel',
		title: 'Использование фильтров ',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<SeventhStep />
			</>
		),
	},

	{
		target: '#modules-btn',
		title: 'Здесь мог быть ваш заголовок',
		disableBeacon: true,
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '.MuiList-root ',
		title: 'Основные инструменты',
		disableBeacon: true,
		placement: 'left',
		content: (
			<>
				<EighthStep />
			</>
		),
	},
];
