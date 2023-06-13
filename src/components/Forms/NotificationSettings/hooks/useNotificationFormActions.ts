import { columnsFilters } from '../data';

export const useNotificationFormActions = () => {
	const filterType = (typeFilter: string | boolean) => {
		const fondedFilter = columnsFilters.find(e => e.field === typeFilter);
		if (fondedFilter) {
			return fondedFilter.type;
		}
		return 'defaultFilters';
	};

	return { filterType };
};
