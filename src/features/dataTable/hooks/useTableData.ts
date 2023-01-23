import { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectedPinnedRows } from '../dataTableSlice';

import type { GridRowModel } from '@mui/x-data-grid-pro';
import type { IDataItem } from 'types/dataItem';

const useTableData = (data: IDataItem[]) => {
	const pinnedIds = useAppSelector(selectedPinnedRows);

	const { pinnedRows, rows } = useMemo(() => {
		const rowsData: GridRowModel<IDataItem>[] = [];
		const pinnedRowsData: { top: GridRowModel<IDataItem>[] } = { top: [] };

		data?.forEach(row => {
			if (pinnedIds.includes(row.id)) {
				pinnedRowsData.top.push(row);
			} else {
				rowsData.push(row);
			}
		});

		return {
			rows: rowsData,
			pinnedRows: pinnedRowsData,
		};
	}, [pinnedIds, data]);
	return { rows, pinnedRows, pinnedIds };
};

export default useTableData;
