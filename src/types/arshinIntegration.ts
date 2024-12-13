import { type Dayjs } from 'dayjs';

import { type IDataItem } from './dataItem';

import { ArshinStatus } from 'constant/arshinStatus';

export interface IArshinDataItem {
	name: string;
	type: string;
	factoryNumber: string;
	organization: string;
	certificate: string;
	suitability: string;
	verificationDate: Dayjs;
	dateOfTheNextVerification: Dayjs;
}

export interface IFormFilterArshin {
	organization: boolean;
	type: boolean;
	factoryNumber: boolean;
	verificationDate: boolean;
	dateOfTheNextVerification: boolean;
	certificate: boolean;
	suitability: boolean;
	period: number;
}

export interface IConfigMainFiltersArshin {
	name: keyof Pick<IFormFilterArshin, 'verificationDate' | 'type' | 'factoryNumber'>;
	title: string;
	disabled: boolean;
}
export interface IConfigAdditionalFiltersArshin {
	name: keyof Pick<
		IFormFilterArshin,
		'organization' | 'dateOfTheNextVerification' | 'certificate' | 'suitability'
	>;
	title: string;
	disabled: boolean;
}

export interface IDataItemArshin extends Omit<IDataItem, 'suitability' | 'userIds'> {
	status: ArshinStatus;
	originId: string;
	usersArshinId: string[];
}

type KeyofDataItemArshin = keyof IFormFilterArshin;
export interface INotValidArshinItem {
	id: string;
	originId: string;
	keys: KeyofDataItemArshin[];
}
export type IResponseValidateArshin = INotValidArshinItem;

export enum ARSHIN_FILTER_TYPE {
	ALL = 'Все средства измерения',
	MY_ITEMS = 'Мои средства измерения',
	MY_COMPLETED = 'Мои готовые',
	REQUEST_ITEMS = 'Данные из запроса',
}

export enum REQUEST_STATUS {
	READY = 'Готово',
	PROCESS = 'В процессе',
	RETRY = 'Повторная обработка',
	STOP = 'Остановлен',
}

export interface IRequestItem {
	id: string;
	name: string;
	range: [string, string];
	period: 1 | 2 | 3;
	status: REQUEST_STATUS;
	sendEmail: boolean;
	dataIds: string[] | IDataItemArshin[];
	creator: string;
}

export interface IRequestItemWithDates extends Omit<IRequestItem, 'range'> {
	range: [Dayjs, Dayjs];
}
