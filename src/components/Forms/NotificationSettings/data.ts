import type { IColumnsFilters, IOperatorsFIlters } from './types';

import { ColumnNames } from 'features/dataTable/columns';


export const operatorsFilters: IOperatorsFIlters = {
	sizesFilters: [
		{ columnField: 'равен', operatorValue: 'is' },
		{ columnField: 'не равен', operatorValue: 'not' },
		{ columnField: 'любой из', operatorValue: 'isAnyOf' },
	],
	dateFilters: [
		{ columnField: 'равен', operatorValue: 'is' },
		{ columnField: 'не равен', operatorValue: 'not' },
		{ columnField: 'больше чем', operatorValue: 'after' },
		{ columnField: 'больше или равно', operatorValue: 'onOrAfter' },
		{ columnField: 'меньше чем', operatorValue: 'before' },
		{ columnField: 'меньше или равно', operatorValue: 'onOrBefore' },
		{ columnField: 'пустой', operatorValue: 'isEmpty' },
		{ columnField: 'не пустой', operatorValue: 'isNotEmpty' },
	],
	defaultFilters: [
		{ columnField: 'содержит', operatorValue: 'contains' },
		{ columnField: 'равен', operatorValue: 'equals' },
		{ columnField: 'начинается с', operatorValue: 'startsWith' },
		{ columnField: 'заканчивается на', operatorValue: 'endsWith' },
		{ columnField: 'пустой', operatorValue: 'isEmpty' },
		{ columnField: 'не пустой', operatorValue: 'isNotEmpty' },
		{ columnField: 'любой из', operatorValue: 'isAnyOf' },
	],
};

export const linkOperators: Record<string, string>[] = [
	{
		linkValue: 'or',
		linkTitle: 'ИЛИ',
	},
	{
		linkValue: 'and',
		linkTitle: 'И',
	},
];

export const columnsFilters: IColumnsFilters[] = [
	{
		field: 'name',
		headerName: ColumnNames.NAME,
		type: 'defaultFilters',
	},
	{
		field: 'type',
		headerName: ColumnNames.TYPE,
		type: 'defaultFilters',
	},
	{
		field: 'factoryNumber',
		headerName: ColumnNames.FACTORY_NUMBER,
		type: 'defaultFilters',
	},
	{
		field: 'inventoryNumber',
		headerName: ColumnNames.INVENTORY_NUMBER,
		type: 'defaultFilters',
	},
	{
		field: 'division',
		headerName: ColumnNames.DIVISION,
		type: 'defaultFilters',
	},
	{
		field: 'verificationDate',
		headerName: ColumnNames.VERIFICATION_DATE,
		type: 'dateFilters',
	},
	{
		field: 'dateOfTheNextVerification',
		headerName: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
		type: 'dateFilters',
	},
	{
		field: 'typeOfWork',
		headerName: ColumnNames.TYPE_OF_WORK,
		type: 'defaultFilters',
	},
	{
		field: 'condition',
		headerName: ColumnNames.CONDITION,
		type: 'defaultFilters',
	},
	{
		field: 'stateRegister',
		headerName: ColumnNames.STATE_REGISTER,
		type: 'defaultFilters',
	},
	{
		field: 'certificate',
		headerName: ColumnNames.CERTIFICATE,
		type: 'defaultFilters',
	},
	{
		field: 'productionDate',
		headerName: ColumnNames.PRODUCTION_DATE,
		type: 'dateFilters',
	},
	{
		field: 'organization',
		headerName: ColumnNames.ORGANIZATION,
		type: 'defaultFilters',
	},
	{
		field: 'accuracyClass',
		headerName: ColumnNames.ACCURACY_CLASS,
		type: 'defaultFilters',
	},
	{
		field: 'measurementLimit',
		headerName: ColumnNames.MEASUREMENT_LIMIT,
		type: 'defaultFilters',
	},
	{
		field: 'size',
		headerName: ColumnNames.SIZE,
		type: 'sizesFilters',
	},
	{
		field: 'notes',
		headerName: ColumnNames.NOTES,
		type: 'defaultFilters',
	},
];
