import { columnsFilters } from '../data';

export const useNotificationFormActions = () => {
	const filterType = (typeFilter: string | boolean) =>
		columnsFilters!.find(e => e.field === typeFilter)!.type || 'defaultFilters';

	return { filterType };
};
