import { ColumnNames } from 'features/dataTable/columns';

import type { IDataItemWithDates } from 'types/dataItem';

interface ICreateInputs {
	key: keyof Omit<IDataItemWithDates, 'id'>;
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
	| 'notes';

export type KeysOfVerificate =
	| 'verificationDate'
	| 'dateOfTheNextVerification'
	| 'typeOfWork'
	| 'stateRegister'
	| 'certificate'
	| 'organization';

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
];

export const verificationFields: IField<KeysOfVerificate>[] = [
	{
		key: 'verificationDate',
		label: ColumnNames.VERIFICATION_DATE,
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
];

export const allInputFields: ICreateInputs[] = [...editFields, ...verificationFields];
