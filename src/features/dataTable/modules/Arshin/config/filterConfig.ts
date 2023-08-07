import { IConfigArshin } from 'types/arshinIntegration';

const config: IConfigArshin[] = [
	{
		name: 'organization',
		title: 'Организация',
		disabled: true,
	},
	{
		name: 'type',
		title: 'Тип СИ',
		disabled: true,
	},
	{
		name: 'factoryNumber',
		title: 'Заводской номер',
		disabled: true,
	},
	{
		name: 'verificationDate',
		title: 'Дата поверки',
		disabled: false,
	},
	{
		name: 'dateOfTheNextVerification',
		title: 'Дата следующей поверки',
		disabled: false,
	},
	{
		name: 'certificate',
		title: 'Свидетельство',
		disabled: false,
	},
	{
		name: 'suitability',
		title: 'Пригодность',
		disabled: false,
	},
];

export default config;
