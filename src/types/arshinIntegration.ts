import { type Dayjs } from 'dayjs';
import { type IDataItem } from './dataItem';

import { ArshinStatus } from 'constant/arshinStatus';

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

export interface IDataItemArshin extends Omit<IDataItem, 'suitability'> {
	status: ArshinStatus;
	originId: string;
}

type KeyofDataItemArshin = keyof IFormFilterArshin;
export interface INotValidArshinItem {
	id: string;
	originId: string;
	keys: KeyofDataItemArshin[];
}
export type IResponseValidateArshin = INotValidArshinItem;

export interface IRequestItem {
	author: string;
	requestId: string;
	requestTitle: string;
	status: string;
	fieldsDate: string[];
	periodicity: 1 | 3 | 5;
	items: string[];
}

export interface IRequestItemWithDates extends Omit<IRequestItem, 'fieldsDate'> {
	fieldsDate: Dayjs[];
}
