import type { GridRowClassNameParams, GridRowId } from '@mui/x-data-grid-pro';
import type { IDataItem } from 'types/dataItem';
import type { IDataTableState } from '../dataTableSlice';

import cn from 'classnames';

/**
 * Хук поеределяет классы для строк, в зависимости от условия
 * @param selectedId `id` выбранной строки
 * @returns классы для строк в таблице
 */
export const useRowClasses =
	(selectedDataItem: IDataTableState['selectedDataItem'], favoriteIds: GridRowId[]) =>
	(params: GridRowClassNameParams<IDataItem>) => {
		return cn({
			selectedRow: selectedDataItem?.id === params.id,
			favoriteRow: favoriteIds.includes(params.id),
			favoriteRowSelected: favoriteIds.includes(params.id) && selectedDataItem?.id === params.id,
		});
	};
