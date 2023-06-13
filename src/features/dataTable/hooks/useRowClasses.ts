import type { GridRowClassNameParams } from '@mui/x-data-grid-pro';
import cn from 'classnames';

import type { IDataTableState } from '../dataTableSlice';


import { selectUserId } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import type { IDataItem } from 'types/dataItem';


/**
 * Хук поеределяет классы для строк, в зависимости от условия
 * @param selectedDataItem выбранный `IDataItem`
 * @returns классы для строк в таблице
 */
export const useRowClasses = (selectedDataItem: IDataTableState['selectedDataItem']) => {
	const userId = useAppSelector(selectUserId);
	return (params: GridRowClassNameParams<IDataItem>) => {
		return cn({
			selectedRow: selectedDataItem?.id === params.id,
			favoriteRow: userId && params.row.userIds.includes(userId),
			favoriteRowSelected:
				userId && params.row.userIds.includes(userId) && selectedDataItem?.id === params.id,
		});
	};
};
