import { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { MutableRefObject, useEffect } from 'react';

import { useFetchSelectedTemplateQuery } from '../../Templates/templatesApiSlice';

export const useApplyTemplate = (apiRef: MutableRefObject<GridApiPro>) => {
	const { data: selectedConfig } = useFetchSelectedTemplateQuery();

	useEffect(() => {
		if (selectedConfig && apiRef) {
			const template = JSON.parse(selectedConfig.template);
			template.columns.orderedFields = template.columns.orderedFields.filter(
				(el: string) => !Object.keys(template.columns.columnVisibilityModel).includes(el)
			);
			template.columns.orderedFields.splice(2, 0, 'status', 'actions');
			// сброс моделей из шаблона
			template.sorting.sortModel = [{ field: 'status', sort: 'asc' }];
			template.filter.filterModel = { items: [] };
			template.pinnedColumns.left = [];
			template.pinnedColumns.right = [];
			apiRef.current.restoreState(template);
		}
	}, [apiRef, selectedConfig]);
};
