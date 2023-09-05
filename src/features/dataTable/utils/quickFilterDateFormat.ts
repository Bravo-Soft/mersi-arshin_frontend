import type { GridCellParams, GridFilterItem } from '@mui/x-data-grid-pro';
import dayjs from 'dayjs';

import { dayjsFormatVariant } from 'constant/dateFormat';

export const quickFilterDateFormat = (filterItem: GridFilterItem) => (params: GridCellParams) =>
	params.value
		? dayjs(params.value)
				.format(dayjsFormatVariant)
				.toString()
				.includes(filterItem.toString().trim().toLowerCase())
		: false;
