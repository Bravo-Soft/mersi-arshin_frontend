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

export type ItemVerification = {
	verificationDate: string;
	typeOfWork: string;
	certificate: string;
	organization: string;
	suitability: string | boolean;
	editedBy: string;
};

export type ItemRepair = {
	modificationDate: string;
	conditionDescription: string;
	editedBy: string;
};

export interface IPassportData {
	division: string[];
	organization: string;
	summaryData: ISummary;
	verifications: ItemVerification[];
	repairs: ItemRepair[];
}

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
	verifications: ItemVerification[];
	repairs: ItemRepair[];
}
