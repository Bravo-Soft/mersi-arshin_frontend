import { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { MutableRefObject, useEffect } from 'react';

import { useFetchSelectedTemplateQuery } from '../../Templates/templatesApiSlice';

import { arshinFilterStatusDone } from 'constant/arshinStatus';

export const useApplyTemplate = (apiRef: MutableRefObject<GridApiPro>) => {
	const { data: selectedConfig } = useFetchSelectedTemplateQuery();

	const localeStorageArshinState = Boolean(localStorage.getItem('Arshin-filter'));

	useEffect(() => {
		if (selectedConfig && apiRef) {
			const template = JSON.parse(selectedConfig.template);
			template.columns.orderedFields = template.columns.orderedFields.filter(
				(el: string) => !Object.keys(template.columns.columnVisibilityModel).includes(el)
			);
			template.columns.orderedFields.splice(2, 0, 'status');
			// сброс моделей из шаблона
			template.sorting.sortModel = [{ field: 'status', sort: 'asc' }];
			template.filter.filterModel = {
				items: localeStorageArshinState ? [arshinFilterStatusDone] : [],
			};
			template.pinnedColumns.left = [];
			template.pinnedColumns.right = [];
			apiRef.current.restoreState(template);
		}
	}, [apiRef, localeStorageArshinState, selectedConfig]);
};
