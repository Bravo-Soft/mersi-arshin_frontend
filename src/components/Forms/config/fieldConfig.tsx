import { ColumnNames } from 'constant/columnsName';
import { IDataItem } from 'types/dataItem';

type Field = {
	label: string;
	placeholder?: string;
	component?: React.ReactNode;
};

export const fieldConfig: Record<keyof Omit<IDataItem, 'userIds' | 'id'>, Field> = {
	name: {
		label: ColumnNames.NAME,
	},
	type: {
		label: ColumnNames.TYPE,
	},
	view: {
		label: ColumnNames.VIEW,
	},
	factoryNumber: {
		label: ColumnNames.FACTORY_NUMBER,
	},
	verificationControlInStateRegister: {
		label: ColumnNames.VERIFICATION_CONTROL_STATE_REGISTER,
	},
	inventoryNumber: {
		label: ColumnNames.INVENTORY_NUMBER,
	},
	division: {
		label: ColumnNames.DIVISION,
	},
	location: {
		label: ColumnNames.LOCATION,
	},
	responsible: {
		label: ColumnNames.RESPONSIBLE,
	},
	verificationDate: {
		label: ColumnNames.VERIFICATION_DATE,
	},
	interVerificationInterval: {
		label: ColumnNames.VERIFICATION_INTERVAL,
	},
	dateOfTheNextVerification: {
		label: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
	},
	typeOfWork: {
		label: ColumnNames.TYPE_OF_WORK,
	},
	suitability: {
		label: ColumnNames.SUITABILITY,
	},
	condition: {
		label: ColumnNames.CONDITION,
	},
	stateRegister: {
		label: ColumnNames.STATE_REGISTER,
	},
	fgisUrl: {
		label: ColumnNames.FGIS_URL,
	},
	certificate: {
		label: ColumnNames.CERTIFICATE,
	},
	productionDate: {
		label: ColumnNames.PRODUCTION_DATE,
	},
	organization: {
		label: ColumnNames.ORGANIZATION,
	},
	accuracyClass: {
		label: ColumnNames.ACCURACY_CLASS,
	},
	measurementLimit: {
		label: ColumnNames.MEASUREMENT_LIMIT,
	},
	additionalData: {
		label: ColumnNames.ADDITIONAL_DATA,
	},
	size: {
		label: ColumnNames.SIZE,
	},
	methodology: {
		label: ColumnNames.METHODOLOGY,
	},
	cost: {
		label: ColumnNames.COST,
	},
	notes: {
		label: ColumnNames.NOTES,
	},
};
