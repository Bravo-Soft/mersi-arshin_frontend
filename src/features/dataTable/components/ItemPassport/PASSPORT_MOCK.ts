import { IPassportMock } from './types';

export const PASSPORT_MOCK: IPassportMock = {
	//Номер паспорта
	passportId: '12345678',
	//Наименование
	name: 'Амперметр',
	//Дата производства
	productionDate: '2024-07-08T21:00:00.000Z',
	//Инвентарный номер
	inventoryNumber: '№ 500000222222',
	//Дата ввода в эксплуатацию
	startDate: '2024-07-08T21:00:00.000Z',
	//Тип,модель,марка
	type: 'Э365',
	//Диапазон измерения
	measuringRange: '0-300 А',
	//Заводской номер
	factoryNumber: '9999999',
	//Класс,разряд,погрешность
	accuracyClass: '1,5',
	//Массив с проведенными поверками
	verifications: [
		{
			verificationDate: '2024-07-08T21:00:00.000Z',
			workType: 'Поверка',
			document: '111111',
			organization: 'ООО "ФНИИМ"',
			resolution: 'Годен',
			fio: 'Иванов И.И.',
		},
		{
			verificationDate: '2024-07-08T21:00:00.000Z',
			workType: 'Поверка',
			document: '111111',
			organization: 'ООО "ФНИИМ"',
			resolution: 'Годен',
			fio: 'Иванов И.И.',
		},
		{
			verificationDate: '2024-07-08T21:00:00.000Z',
			workType: 'Поверка',
			document: '111111',
			organization: 'ООО "ФНИИМ"',
			resolution: 'Годен',
			fio: 'Иванов И.И.',
		},
	],
	repairs: [
		{
			repareDate: '2024-07-08T21:00:00.000Z',
			repairType: 'Ремонт корпуса',
			fio: 'Иванов И.И.',
		},
		{
			repareDate: '2024-07-08T21:00:00.000Z',
			repairType: 'Ремонт корпуса',
			fio: 'Иванов И.И.',
		},
		{
			repareDate: '2024-07-08T21:00:00.000Z',
			repairType: 'Ремонт корпуса',
			fio: 'Иванов И.И.',
		},
	],
};
