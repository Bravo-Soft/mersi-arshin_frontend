import { IDataItem } from './dataItem';

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

export interface IConfigArshin {
	name: keyof Omit<IFormFilterArshin, 'period'>;
	title: string;
	disabled: boolean;
}

export interface IDataItemArshin extends IDataItem {
	status: ArshinStatus;
}
