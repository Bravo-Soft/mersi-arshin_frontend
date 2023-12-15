import {
	gridVisibleColumnDefinitionsSelector,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid-pro';

export const useVisibleColumns = () => {
	const apiRef = useGridApiContext();
	const columns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);

	return columns.filter(column => column.field !== '__check__').map(({ field }) => field);
};
