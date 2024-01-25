import type { GridStateColDef } from '@mui/x-data-grid-pro';
import { gridVisibleColumnDefinitionsSelector, useGridSelector } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

import type { IColumn } from 'utils/excel';

/**
 *	Хук, преобразующий колонки к необходимому типу для дальнейшей передачи в функцию генерации книги
 * @param {React.MutableRefObject<GridApiPro>} apiRef ref-ссылка, получаемая из `useGridApiContext`
 * @returns массив колонок преобразованных в типу `IColumn`
 */
export const useConvertColumns = (apiRef: React.MutableRefObject<GridApiPro>) => {
	const columns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);

	/* Убираем из массива видимых колонок чекбоксы */
	const columnsWithoutCheckbox = columns.filter(
		(column: GridStateColDef) => column.field !== '__check__'
	);

	return columnsWithoutCheckbox.map(
		(column: GridStateColDef): IColumn => ({
			key: column.field,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			header: column.headerName!,
		})
	);
};
