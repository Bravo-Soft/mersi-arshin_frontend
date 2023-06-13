
import type { GridValidRowModel } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { format, parseISO } from 'date-fns';
import type { MutableRefObject } from 'react';

import { formatVariant } from 'constant/dateFormat';

export const updateData = (data: GridValidRowModel[], apiRef: MutableRefObject<GridApiPro>) => {
	const newData: GridValidRowModel[] = [];

	const columnsData = apiRef.current
		.getVisibleColumns()
		.filter(column => column.type === 'date')
		.map(column => column.field);

	data.forEach(el => {
		const dataItem = {
			...el[1],
		};
		columnsData.forEach(key => {
			dataItem[key] = format(parseISO(dataItem[key]), formatVariant);
		});
		newData.push(dataItem);
	});

	return newData;
};
