import { columnsFilters } from '../../NotificationSettings/data';

export const useFilterFieldActions = () => {
	const filterType = (typeFilter: string | boolean) => {
		const fondedFilter = columnsFilters.find(e => e.field === typeFilter);
		console.log('fondedFilter', fondedFilter);
		if (fondedFilter) {
			return fondedFilter.type;
		}
		return 'defaultFilters';
	};

	return { filterType };
};
