import type { Step } from 'react-joyride';
import {
	EighthStep,
	EighthStepBtn,
	FifthStepBtn,
	FirstStep,
	FourthStep,
	SecondStep,
	SeventhStep,
	SeventhStepBtn,
	SixthStep,
	SixthStepBtn,
	ThirdStep,
	FifthStep,
} from './components/stepComponents';

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
		title: 'Работа со средством измерения',
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
		title: 'Настройка столбцов',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<FifthStepBtn />
			</>
		),
	},
	{
		target: '#column-panel',
		title: 'Настройка столбцов',
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
		title: 'Настройка размера строки',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<SixthStepBtn />
			</>
		),
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
		title: 'Использование фильтров',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<SeventhStepBtn />
			</>
		),
	},

	{
		target: '#filter-panel',
		title: 'Использование фильтров',
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
		title: 'Основные инструменты',
		disableBeacon: true,
		placement: 'bottom',
		content: (
			<>
				<EighthStepBtn />
			</>
		),
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
