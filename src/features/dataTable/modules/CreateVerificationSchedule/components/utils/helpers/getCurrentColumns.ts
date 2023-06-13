import type { IColumnTable } from '../../../operatorsFilters';

export const getCurrentColumns = (columnsFilters: IColumnTable[]) => {
	return columnsFilters.filter(column => column.field !== 'dateOfTheNextVerification');
};
