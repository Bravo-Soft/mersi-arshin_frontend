export type TConfig = {
	target: string;
	title: string;
	placement: string;
	content: string;
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
		content:
			'При нажатии на «плюсик» в правом нижнем углу , у Вас откроется поле для создания новой карточки СИ.',
	},
	{
		target: '.MuiDrawer-paper',
		title: 'Заполнение карточки СИ',
		placement: 'left',
		content:
			'Для заполнения и выбора полей в карточке, используете колесико «мышки». После заполнения всех необходимых полей, нажмите на кнопку "Сохранить" и карточка появится в общем списке',
	},
	{
		target: '#filter',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},

	{
		target: '#filter-panel',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
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
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '#context-menu',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '#density',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '.MuiList-root ',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '#modules-btn',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '.MuiList-root ',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
	{
		target: '#toolbar',
		title: 'Здесь мог быть ваш заголовок',
		placement: 'bottom',
		content: 'Здесь мог быть ваш контент',
	},
];
