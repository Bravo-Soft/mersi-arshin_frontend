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
];
