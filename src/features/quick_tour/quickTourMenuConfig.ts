interface IQuickMenuTourConfig {
	title: string;
	step: number;
}

export const quickTourMenuConfig: IQuickMenuTourConfig[] = [
	{
		title: 'Добавление нового СИ',
		step: 0,
	},
	{
		title: 'Заполнение карточки СИ',
		step: 1,
	},
	{
		title: 'Работа с средством измерения',
		step: 2,
	},
	{
		title: 'Быстрые подборки',
		step: 3,
	},
	{
		title: 'Настройка столбцов',
		step: 5,
	},
	{
		title: 'Настройка размера строки',
		step: 6,
	},
	{
		title: 'Использование фильтров',
		step: 8,
	},
	{
		title: 'Основные инструменты',
		step: 10,
	},
];
