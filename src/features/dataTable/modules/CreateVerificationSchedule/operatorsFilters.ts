import type { DateRange } from '@mui/x-date-pickers-pro';

export interface IOperatorFilterOption {
	columnField: string;
	operatorValue: string;
}

export interface IFilter {
	columnField: string;
	operatorValue: string;
	value: string;
	id: number;
}

export interface IForm {
	filters: IFilter[];
	fieldsDate: DateRange<Date>;
}

export interface IOperatorFilter {
	sizesFilters: IOperatorFilterOption[];
	dateFilters: IOperatorFilterOption[];
	defaultFilters: IOperatorFilterOption[];
}

export const operatorsFilters: IOperatorFilter = {
	sizesFilters: [
		{ columnField: 'равен', operatorValue: 'is' },
		{ columnField: 'не равен', operatorValue: 'not' },
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
	],
};

export type FormFilterType = 'dateFilters' | 'sizesFilters' | 'defaultFilters';

export interface IColumnTable {
	field: string;
	headerName: string;
	type: string;
}
