import { ColumnNames } from 'constant/columnsName';
import type { IDataItemWithDates } from 'types/dataItem';

interface ICreateInputs {
	key: keyof Omit<
		IDataItemWithDates,
		'id' | 'userIds' | 'documents' | 'verificationControlInStateRegister'
	>;
	label: ColumnNames;
}

export interface IField<T> extends Omit<ICreateInputs, 'key'> {
	key: T;
}

export type KeysOfEdit =
	| 'name'
	| 'type'
	| 'factoryNumber'
	| 'inventoryNumber'
	| 'division'
	| 'condition'
	| 'productionDate'
	| 'accuracyClass'
	| 'measurementLimit'
	| 'size'
	| 'notes'
	| 'location'
	| 'responsible'
	| 'additionalData'
	| 'methodology';

export type KeysOfVerificate =
	| 'verificationDate'
	| 'interVerificationInterval'
	| 'dateOfTheNextVerification'
	| 'typeOfWork'
	| 'stateRegister'
	| 'certificate'
	| 'organization'
	| 'suitability'
	| 'fgisUrl'
	| 'cost';

export const editFields: IField<KeysOfEdit>[] = [
	{
		key: 'name',
		label: ColumnNames.NAME,
	},
	{
		key: 'type',
		label: ColumnNames.TYPE,
	},
	{
		key: 'factoryNumber',
		label: ColumnNames.FACTORY_NUMBER,
	},
	{
		key: 'inventoryNumber',
		label: ColumnNames.INVENTORY_NUMBER,
	},
	{
		key: 'division',
		label: ColumnNames.DIVISION,
	},
	{
		key: 'condition',
		label: ColumnNames.CONDITION,
	},
	{
		key: 'productionDate',
		label: ColumnNames.PRODUCTION_DATE,
	},
	{
		key: 'accuracyClass',
		label: ColumnNames.ACCURACY_CLASS,
	},
	{
		key: 'measurementLimit',
		label: ColumnNames.MEASUREMENT_LIMIT,
	},
	{
		key: 'size',
		label: ColumnNames.SIZE,
	},
	{
		key: 'notes',
		label: ColumnNames.NOTES,
	},
	{
		key: 'location',
		label: ColumnNames.LOCATION,
	},
	{
		key: 'responsible',
		label: ColumnNames.RESPONSIBLE,
	},
	{
		key: 'additionalData',
		label: ColumnNames.ADDITIONAL_DATA,
	},
	{
		key: 'methodology',
		label: ColumnNames.METHODOLOGY,
	},
];

export const verificationFields: IField<KeysOfVerificate>[] = [
	{
		key: 'verificationDate',
		label: ColumnNames.VERIFICATION_DATE,
	},
	{
		key: 'interVerificationInterval',
		label: ColumnNames.VERIFICATION_INTERVAL,
	},
	{
		key: 'dateOfTheNextVerification',
		label: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
	},
	{
		key: 'typeOfWork',
		label: ColumnNames.TYPE_OF_WORK,
	},
	{
		key: 'stateRegister',
		label: ColumnNames.STATE_REGISTER,
	},
	{
		key: 'certificate',
		label: ColumnNames.CERTIFICATE,
	},
	{
		key: 'organization',
		label: ColumnNames.ORGANIZATION,
	},
	{
		key: 'suitability',
		label: ColumnNames.SUITABILITY,
	},
	{
		key: 'fgisUrl',
		label: ColumnNames.FGIS_URL,
	},
	{
		key: 'cost',
		label: ColumnNames.COST,
	},
];

export const allInputFields: ICreateInputs[] = [...editFields, ...verificationFields];
