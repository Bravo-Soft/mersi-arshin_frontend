import type { GridCellParams, GridFilterItem } from '@mui/x-data-grid-pro';
import { formatVariant } from 'constant/dateFormat';
import { format } from 'date-fns';

export const quickFilterDateFormat = (filterItem: GridFilterItem) => (params: GridCellParams) =>
	params.value
		? format(Number(params.value), formatVariant)
				.toString()
				.includes(filterItem.toString().trim().toLowerCase())
		: false;
