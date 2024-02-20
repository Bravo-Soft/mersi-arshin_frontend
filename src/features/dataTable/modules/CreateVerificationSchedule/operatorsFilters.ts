import type { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';

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
	fieldsDate: DateRange<Dayjs>;
}

export interface IOperatorFilter {
	sizesFilters: IOperatorFilterOption[];
	dateFilters: IOperatorFilterOption[];
	defaultFilters: IOperatorFilterOption[];
	interVerificationInterval: IOperatorFilterOption[];
	suitability: IOperatorFilterOption[];
	cost: IOperatorFilterOption[];
}

export const operatorsFilters: IOperatorFilter = {
	sizesFilters: [
		{ columnField: 'равен', operatorValue: 'is' },
		{ columnField: 'не равен', operatorValue: 'not' },
	],
	suitability: [
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
	],
	interVerificationInterval: [
		{ columnField: 'равен', operatorValue: 'is' },
		{ columnField: 'не равен', operatorValue: 'not' },
		{ columnField: 'больше чем', operatorValue: 'after' },
		{ columnField: 'больше или равно', operatorValue: 'onOrAfter' },
		{ columnField: 'меньше чем', operatorValue: 'before' },
		{ columnField: 'меньше или равно', operatorValue: 'onOrBefore' },
		{ columnField: 'пустой', operatorValue: 'isEmpty' },
		{ columnField: 'не пустой', operatorValue: 'isNotEmpty' },
	],
	cost: [
		{ columnField: 'равен', operatorValue: 'is' },
		{ columnField: 'не равен', operatorValue: 'not' },
		{ columnField: 'больше чем', operatorValue: 'after' },
		{ columnField: 'больше или равно', operatorValue: 'onOrAfter' },
		{ columnField: 'меньше чем', operatorValue: 'before' },
		{ columnField: 'меньше или равно', operatorValue: 'onOrBefore' },
		{ columnField: 'пустой', operatorValue: 'isEmpty' },
		{ columnField: 'не пустой', operatorValue: 'isNotEmpty' },
	],
};

export type FormFilterType =
	| 'dateFilters'
	| 'sizesFilters'
	| 'defaultFilters'
	| 'interVerificationInterval'
	| 'suitability'
	| 'cost';

export interface IColumnTable {
	field: string;
	headerName: string;
	type: string;
}
