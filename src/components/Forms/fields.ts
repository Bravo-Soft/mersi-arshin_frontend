import { ColumnsMaxStringLength } from 'constant/columnsMaxStringLength';
import { ColumnNames } from 'constant/columnsName';
import type { IDataItemWithDates } from 'types/dataItem';

interface ICreateInputs {
	key: keyof Omit<IDataItemWithDates, 'id' | 'userIds' | 'verificationControlInStateRegister'>;
	label: ColumnNames;
	stringLength?: number;
}

export interface IField<T> extends Omit<ICreateInputs, 'key'> {
	key: T;
	stringLength?: number;
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
// | 'view';

export type KeysOfVerificate =
	| 'verificationDate'
	| 'interVerificationInterval'
	| 'dateOfTheNextVerification'
	| 'typeOfWork'
	| 'stateRegister'
	| 'certificate'
	| 'organization'
	| 'suitability'
	// | 'fgisUrl'
	| 'cost';

export const editFields: IField<KeysOfEdit>[] = [
	{
		key: 'name',
		label: ColumnNames.NAME,
		stringLength: ColumnsMaxStringLength.MEDIUM,
	},
	{
		key: 'type',
		label: ColumnNames.TYPE,
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	// {
	// 	key: 'view',
	// 	label: ColumnNames.VIEW,
	// 	stringLength: ColumnsMaxStringLength.SMALL,
	// },
	{
		key: 'factoryNumber',
		label: ColumnNames.FACTORY_NUMBER,
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	{
		key: 'inventoryNumber',
		label: ColumnNames.INVENTORY_NUMBER,
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	{
		key: 'division',
		label: ColumnNames.DIVISION,
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	{
		key: 'responsible',
		label: ColumnNames.RESPONSIBLE,
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	{
		key: 'location',
		label: ColumnNames.LOCATION,
		stringLength: ColumnsMaxStringLength.MEDIUM,
	},
	{
		key: 'condition',
		label: ColumnNames.CONDITION,
		stringLength: ColumnsMaxStringLength.LARGE,
	},
	{
		key: 'productionDate',
		label: ColumnNames.PRODUCTION_DATE,
	},
	{
		key: 'accuracyClass',
		label: ColumnNames.ACCURACY_CLASS,
		stringLength: ColumnsMaxStringLength.LARGE,
	},
	{
		key: 'measurementLimit',
		label: ColumnNames.MEASUREMENT_LIMIT,
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	{
		key: 'size',
		label: ColumnNames.SIZE,
	},
	{
		key: 'notes',
		label: ColumnNames.NOTES,
		stringLength: ColumnsMaxStringLength.BIGGER,
	},

	{
		key: 'additionalData',
		label: ColumnNames.ADDITIONAL_DATA,
		stringLength: ColumnsMaxStringLength.BIGGER,
	},
	{
		key: 'methodology',
		label: ColumnNames.METHODOLOGY,
		stringLength: ColumnsMaxStringLength.LARGE,
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
		stringLength: ColumnsMaxStringLength.SMALL,
	},
	{
		key: 'stateRegister',
		label: ColumnNames.STATE_REGISTER,
		stringLength: ColumnsMaxStringLength.LARGE,
	},
	{
		key: 'certificate',
		label: ColumnNames.CERTIFICATE,
		stringLength: ColumnsMaxStringLength.LARGE,
	},
	{
		key: 'organization',
		label: ColumnNames.ORGANIZATION,
		stringLength: ColumnsMaxStringLength.LARGE,
	},
	{
		key: 'suitability',
		label: ColumnNames.SUITABILITY,
	},
	// {
	// 	key: 'fgisUrl',
	// 	label: ColumnNames.FGIS_URL,
	// 	stringLength: ColumnsMaxStringLength.LARGE,
	// },
	{
		key: 'cost',
		label: ColumnNames.COST,
	},
];

export const allInputFields: ICreateInputs[] = [...editFields, ...verificationFields];
