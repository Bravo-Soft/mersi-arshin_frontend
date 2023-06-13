import type { GridColDef } from '@mui/x-data-grid-pro';

import type { IDataItem } from 'types/dataItem';

type ConvertedColumns = Record<string, boolean>;

export const convertColumnsToObjectView = (
	visibleColumns: string[],
	appColums: GridColDef<IDataItem>[]
): ConvertedColumns => {
	const result: ConvertedColumns = {};

	appColums
		.map(col => col.field)
		.filter(col => col !== 'notes' && col !== 'size')
		.forEach(key => {
			const value = visibleColumns.includes(key);
			result[key] = value;
		});
	return result;
};
