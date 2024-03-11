import type { ColumnNames } from 'constant/columnsName';

export interface IOperatorsFIltersOptions {
	columnField: string;
	operatorValue: string;
}
export interface IOperatorsFIlters {
	sizesFilters: IOperatorsFIltersOptions[];
	dateFilters: IOperatorsFIltersOptions[];
	defaultFilters: IOperatorsFIltersOptions[];
	interVerificationInterval: IOperatorsFIltersOptions[];
	suitability: IOperatorsFIltersOptions[];
	cost: IOperatorsFIltersOptions[];
}

export type FormFiltersTypes =
	| 'dateFilters'
	| 'sizesFilters'
	| 'defaultFilters'
	| 'interVerificationInterval'
	| 'suitability'
	| 'cost';
export interface IColumnsFilters {
	field: string;
	headerName: ColumnNames;
	type: FormFiltersTypes;
}
