import { IDataItem } from 'types/dataItem';

export interface ISummary
	extends Pick<
		IDataItem,
		| 'name'
		| 'productionDate'
		| 'inventoryNumber'
		| 'type'
		| 'factoryNumber'
		| 'accuracyClass'
		| 'measurementLimit'
		| 'typeOfWork'
		| 'interVerificationInterval'
	> {
	passportId: string;
	startDate: string;
}

export type itemVerification = {
	verificationDate: string;
	workType: string;
	document: string;
	organization: string;
	resolution: string;
	fio: string;
};

export interface IPassportMock {
	passportId: string;
	name: string;
	productionDate: string;
	inventoryNumber: string;
	startDate: string;
	type: string;
	measuringRange: string;
	factoryNumber: string;
	accuracyClass: string;
	verifications: itemVerification[];
	repairs: any[];
}
