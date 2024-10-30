export type ChipFilterOptions = number | 'Все' | 'Просроченные' | 'Избранное' | 'Месяц';

export interface IOption {
	title: string;
	option: ChipFilterOptions;
}

export const chipDefaultOptions: IOption[] = [
	{
		title: 'Выбрать все позиции (по умолчанию)',
		option: 'Все',
	},
	{
		title: 'Показать избранные средства измерения',
		option: 'Избранное',
	},
	{
		title: 'Выбрать просроченные по поверке позиции',
		option: 'Просроченные',
	},
];

export const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];
