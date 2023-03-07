import FifthStep from './assets/FifthStep';
import FirstStep from './assets/FirstStep';
import FourthStep from './assets/FourthStep';
import SecondStep from './assets/SecondStep';
import SeventhStep from './assets/SeventhStep';
import SixthStep from './assets/SixthStep';
import ThirdStep from './assets/ThirdStep';

export type TConfig = {
	target: string;
	title: string;
	placement: string;
	content: JSX.Element;
	styles: any;
};

export const quickConfig: any = [
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
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '#column-panel',
		title: 'Здесь мог быть ваш заголовок',
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
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '.MuiList-root ',
		title: 'Настройка размера строки',
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
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},

	{
		target: '#filter-panel',
		title: 'Использование фильтров ',
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
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '.MuiList-root ',
		title: 'Основные инструменты',
		placement: 'left/*',
		content: 'Здесь мог быть ваш контент',
	},
];
