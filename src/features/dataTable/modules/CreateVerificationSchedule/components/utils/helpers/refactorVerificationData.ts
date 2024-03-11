import { IFilter } from '../../../operatorsFilters';

export const refactorVerificationData = (data: IFilter[]) => {
	return data.map(({ columnFilter, ...rest }) => ({ ...rest, columnField: columnFilter }));
};
