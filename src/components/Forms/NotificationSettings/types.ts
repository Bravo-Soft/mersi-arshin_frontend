import type { ColumnNames } from 'features/dataTable/columns';

export interface IOperatorsFIltersOptions {
	columnField: string;
	operatorValue: string;
}
export interface IOperatorsFIlters {
	sizesFilters: IOperatorsFIltersOptions[];
	dateFilters: IOperatorsFIltersOptions[];
	defaultFilters: IOperatorsFIltersOptions[];
}

export type FormFiltersTypes = 'dateFilters' | 'sizesFilters' | 'defaultFilters';
export interface IColumnsFilters {
	field: string;
	headerName: ColumnNames;
	type: FormFiltersTypes;
}
